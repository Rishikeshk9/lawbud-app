import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useEffect, useState, useContext } from "react";
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { getLawyersCategories } from "../Services/requests";
import { AuthContext } from "../components/context";
function SkillScreen({ route }) {

    const navigation = useNavigation();
    // console.log(lawyersCategoriesData[0]);
    const { newUserData, updateUser } = useContext(AuthContext);
    let [itemsArray, setItemsArray] = useState([]);
    var itemsArray1 = [];
    const [lawyersCategoriesData, setCategoriesLawyersData] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getLawyersCategoriesData1() {
        if (loading) {
            return;
        }
        const lawyersCategories = await getLawyersCategories();
        console.log("Category:" + JSON.stringify(lawyersCategories.data));
        setCategoriesLawyersData(lawyersCategories.data);
        setLoading(false);
    }
    useEffect(() => {
        getLawyersCategoriesData1();
    }, []);
    useEffect(()=>{
        console.log("In a Skills Screen: "+ JSON.stringify(newUserData));
    },[newUserData]);
    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
            <RegistrationProgress userType={route.params.userType} />
            <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
                <Text style={{ color: COLORS.gray }}>Select Your Specialization</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                   { !loading ? 
                     <SearchableDropDown
                        items={lawyersCategoriesData}
                        onItemSelect={(item) => {
                            updateUser(( prev )=> ( { ...prev, specialisation:{
                                default:{
                                    id: { id: item.specialisation_id },
                                    category: { category: item.name }
                                }
                            }}));
                            setItemsArray((prev) => [...prev, { name: item.name }]);
                        }}
                        containerStyle={{
                            width: '90%',
                        }}
                        itemStyle={{
                            padding: 10,
                            marginTop: 2,
                            backgroundColor: COLORS.lightGray,
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            borderRadius: 5
                        }}
                        itemTextStyle={{
                            color: COLORS.black
                        }}
                        resetValue={false}
                        placeholder={"Search for lawyers in your area..."}
                        placeholderTextColor={COLORS.gray}
                        listProps={
                            {
                                nestedScrollEnabled: true,
                            }
                        }
                        // nestedScrollEnabled={true}
                        textInputProps={{
                            underlineColorAndroid: 'transparent',
                            style: {
                                paddingLeft: 5,
                                borderWidth: 1.5,
                                borderColor: COLORS.lightGray,
                                borderRadius: 5,
                                backgroundColor: COLORS.lightGray,
                                color: COLORS.black,
                            }
                        }}
                    />
                : <ActivityIndicator size={"small"} color={COLORS.black} />
                }
                </View>
                <View style={{ flexDirection: 'row', marginTop: 4, height: 200 }} >
                    <FlatList
                        data={itemsArray}
                        renderItem={({ item, index }) => (
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity style={{ backgroundColor: COLORS.black, alignSelf: 'flex-start', borderRadius: 5, marginTop: 2, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} >
                                    <Text style={{ color: COLORS.white }}>{item.name}</Text>
                                </TouchableOpacity>
                            </View>

                        )}
                        keyExtractor={(item, index) => index}
                    />
                    {/* <TouchableOpacity style={{backgroundColor: COLORS.black, borderRadius: 5, marginLeft: 4, paddingVertical: 2, paddingHorizontal: 5, height: 25 }} ><Text style={{color: COLORS.white}}>Robbery</Text></TouchableOpacity> */}

                </View>

                <View style={{ backgroundColor: COLORS.black, marginTop: 10, borderRadius: 4 }} >
                    <TouchableOpacity><Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} onPress={() => {
                        navigation.navigate("Documents", {
                            userType: route.params.userType,

                        })
                    }} >Next</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
function RegistrationProgress({ userType }) {
    const progressStepsStyle = {
        activeStepIconBorderColor: '#686868',
        activeLabelColor: '#686868',
        activeStepNumColor: 'white',
        activeStepIconColor: '#686868',
        completedStepIconColor: '#686868',
        completedProgressBarColor: '#686868',
        completedCheckColor: '#4bb543'
    };
    return (

        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5 }} >
            {
                userType === "lawyer" ?
                <View style={{flexDirection: 'row', width: '100%' }} >

                    <ProgressSteps {...progressStepsStyle} activeStep={2}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="SkillSets" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Documents" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                </View>
                    :
                    <ProgressSteps {...progressStepsStyle} activeStep={2}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                    
            }
        </View>
    );
}
function InputComponent({ title }) {
    return (
        <View style={{ marginTop: 10 }} >
            <Text style={{ color: COLORS.gray }}>{title}</Text>
            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
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
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
    buttonTextStyle:{
        color: '#393939',
        padding: 0,
        margin: 0
    }
});
export default SkillScreen;