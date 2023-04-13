import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Button } from "react-native";
import Header from '../components/ProfileScreen/Header';
import image1 from '../assets/default_user.jpg';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { Octicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { AuthContext } from "../components/context";
import { loginContext } from "../components/context1";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function ProfileScreen({ route }) {
    const [image, setImage] = useState(null);
    const { signOut } = useContext(loginContext);
    const { usersType } = useContext(AuthContext);
    const [currentUserData, setCurrentUserData] = useState( route.params.currentUserData );
    const [loading, setLoading] = useState(false);
    const [saving,setSaving] = useState(false);
    // Userdata states
    const [name,setName] = useState(currentUserData[0].name);
    const [contact,setContact] = useState(currentUserData[0].contact);
    const [email,setEmail] = useState(currentUserData[0].email_id);
    const [address, setAddress] = useState(currentUserData[0].address);
    const [profession, setProfession] = useState( currentUserData[0].type);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    async function getData() {
        setLoading(true);
        let userData = await AsyncStorage.getItem("currentUserData");
        console.log("In a profile:" + userData);
        let data = JSON.parse(userData);
        setCurrentUserData(data);
        setName(data[0].name);
        setEmail(data[0].email_id);
        setContact(data[0].contact+"");
        setAddress(data[0].address);
        setProfession(data[0].type);
        setLoading(false);
    }
    function handleVerification() {
        Alert.alert("Verification", "Please verify your email...", [
            {
                text: "Ok",
                onPress: () => {
                    console.log("Ok clicked...");
                }
            },
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => {
                    console.log("Cancel clicked...");
                }
            }

        ]);
    }
    // async function updateUser(){
    //     let newData = { ...currentUserData, name: name, email_id: email };
    //     const response = await axios.post("https://lawbud-backend.onrender.com/user/updateUser", newData);
    // }
    function handleChangeText( data, type ){
        switch(type)
        {
            case "name":
                setName(data);
                break;
            case "contact":
                setContact(data);
                break;
            case "email":
                setEmail(data);
                break;
            case "address":
                setAddress(data);
                break;
            case "profession":
                setProfession(data);
                break;
        }
    }
    async function updateUser(){
        let new_data = {...currentUserData, name: name, email_id: email, contact: contact, address: address, profession: profession };
        let data1 = await axios.post("https://lawbud-backend.onrender.com/user/updateUser", JSON.stringify(new_data));
        console.log(data1);
    }
    function checkIfEdited(){
        if(name!=currentUserData[0]?.name || email!=currentUserData[0]?.email_id || contact!=currentUserData[0]?.contact || address!=currentUserData[0]?.address || profession!= currentUserData[0]?.type)
        {
            return true;
        }
        return false;
    }
    useEffect(() => {
        // getData();
        console.log(currentUserData[0].name);
        console.log(usersType === "user");
    }, []);
    return (
        <View style={styles.container}>
            { currentUserData && <Header headerText={"My Account"} type={currentUserData[0]?.type} /> }
            <View style={{ width: 100, height: 100, backgroundColor: COLORS.grey, borderRadius: 50, marginTop: 10, alignSelf: 'center', flexDirection: 'row', alignSelf: 'center', }} >
                <View style={{ width: '100%', height: '100%', borderRadius: 50, overflow: 'hidden' }}  >
                    {image != null ? <Image
                        source={{ uri: currentUserData[0].profile_image || image }}
                        style={styles.imageStyle}
                    /> : <Image
                        source={image1}
                        style={styles.imageStyle}
                    />}
                </View>
                <TouchableOpacity style={styles.badgeStyle} onPress={pickImage}>
                    <View>
                        <MaterialIcons name="edit" size={24} color={COLORS.white} />
                    </View>
                </TouchableOpacity>

            </View>
            {currentUserData && <ScrollView>
                {/* Name */}
                <View style={styles.fieldContainer}>
                    <Text>Name</Text>
                    <TextInput
                        style={styles.inputStyle}
                        cursorColor={COLORS.gray}
                        value={name || "hi"}
                        onChangeText={(data)=>{
                            handleChangeText(data, "name");
                        }}
                    />
                </View>
                {/* Phone */}
                <View style={styles.fieldContainer}>
                    <Text>Contact</Text>
                    <TextInput
                        style={styles.inputStyle}
                        cursorColor={COLORS.gray}
                        value={contact+"" || "hi"}
                        editable={false}
                        onChangeText={(data)=>{
                            handleChangeText(data, "contact");
                        }}
                    />
                </View>
                {/* Email */}
                <Text style={{ paddingHorizontal: 15, marginTop: 10 }} >Email</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10 }} >
                    <TextInput
                        style={{ ...styles.inputStyle, width: '90%' }}
                        cursorColor={COLORS.gray}
                        value={email}
                        editable={false}
                        onChangeText={(data)=>{
                            handleChangeText(data, "email");
                        }}
                    />
                    <TouchableOpacity style={{ backgroundColor: COLORS.lightGray, marginLeft: 5, padding: 2, borderRadius: 50 }} onPress={handleVerification}>
                        <Octicons name="unverified" size={21} color={COLORS.yellow} style={{ alignSelf: 'flex-end' }} />
                    </TouchableOpacity>
                </View>
                {/* Address */}

                {
                    usersType === "user" ?
                        <View style={styles.fieldContainer}>
                            <Text>Home Address</Text>
                            <TextInput
                                style={styles.inputStyle}
                                cursorColor={COLORS.gray}
                                value={address || "hi"}
                                onChangeText={(data)=>{
                                    handleChangeText(data, "address");
                                }}
                            />
                        </View>
                        : 
                        <View style={styles.fieldContainer}>
                            <Text>Office Address</Text>
                            <TextInput
                                style={styles.inputStyle}
                                cursorColor={COLORS.gray}
                                value={address || "hi"}
                                onChangeText={(data)=>{
                                    handleChangeText(data, "address");
                                }}
                            />
                        </View>
                }
                {/* Profession */}
                <View style={styles.fieldContainer}>
                            <Text>Profession</Text>
                            <TextInput
                                style={styles.inputStyle}
                                cursorColor={COLORS.gray}
                                value={ profession || "hi"}
                                editable={false}
                                onChangeText={(data)=>{
                                    handleChangeText(data, "profession");
                                }}
                            />
                        </View>
            </ScrollView>
            }
            {
                loading &&
                <ActivityIndicator size={"small"} color={COLORS.black} />

            }
            {
                currentUserData ?
                    checkIfEdited() == true ? <Button title="Save" onPress={ updateUser } /> : null
                : <ActivityIndicator size={"large"} color={COLORS.black} />
                
            }
            {
                checkIfEdited() !== true ?  <Logout_Button signOut={signOut} /> : null
            }
        </View>
    );
}
function Field({ name, value }) {
    return (
        <View style={styles.fieldContainer}>
            <Text>{name}</Text>
            <TextInput
                style={styles.inputStyle}
                cursorColor={COLORS.gray}
                value={value || "hi"}
            />
        </View>
    );
}

function Logout_Button({ signOut }) {
    return (
        <TouchableOpacity style={styles.report_btn} onPress={() => {
            signOut();
        }} >
            <Text> Logout </Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    imgStyle: {
        width: 120,
        height: 120,
        borderRadius: 100,
        marginTop: 10

    },
    badgeStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },
    inputStyle: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 4,
        paddingLeft: 5
    },
    fieldContainer: {
        paddingHorizontal: 15,
        marginTop: 10
    },
    report_btn: {
        marginTop: 10,
        paddingVertical: 10,
        width: '90%',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: "#f8fafc",
        borderColor: COLORS.red,
        borderWidth: 1,
        borderRadius: 5,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
});
export default ProfileScreen;