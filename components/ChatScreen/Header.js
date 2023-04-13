import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import * as Linking from 'expo-linking';
function Header({ headerText, imgSrc }) {
    const [value, setValue] = useState(null);
    const data = [
        { label: 'Report', value: '1' },
        { label: 'Block', value: '2' },
        // { label: 'Item 3', value: '3' },
        // { label: 'Item 4', value: '4' },
        // { label: 'Item 5', value: '5' },
        // { label: 'Item 6', value: '6' },
        // { label: 'Item 7', value: '7' },
        // { label: 'Item 8', value: '8' },
    ];
    const dropdown = () => {
        return (
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder="Select item"
                // searchPlaceholder="Search..."
                value={value}
                
                onChange={item => {
                    setValue(item.value);
                    Alert.alert(`${item.value}`);
                }}
                confirmSelectItem
                onConfirmSelectItem={item=>{
                    // Alert.alert(`${item}`);
                    console.log(item);
                }}
                renderRightIcon={() => (
                    <Entypo name="dots-three-vertical" size={24} color={COLORS.white} />
                )}
            // renderLeftIcon={() => (
            //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            // )}
            />
        );
    }
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }} >
                <AntDesign name="arrowleft" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Image
                source={{
                    uri: imgSrc || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                }}
                style={styles.imgStyle}
                />
            <Text style={{ color: COLORS.white, marginLeft: 10, fontSize: 16 }}>{headerText}</Text>
            </View>
            {/* {dropdown()} */}
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                // placeholder="Select item"
                // searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                    setValue(item.value);
                    Alert.alert(`${item.label}`,`${item.label} an account`,[
                        {
                            text: "Cancel",
                            onPress: ()=>{
                                console.log("Cancel clicked...");
                            }
                        },
                        {
                            text: "Ok",
                            onPress: ()=>{
                                console.log("Ok")
                            }
                        }
                    ]);
                }}

                renderRightIcon={() => (
                    <Entypo name="dots-three-vertical" size={18} color={COLORS.white} />
                )}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 12,
        paddingRight: 16,
        backgroundColor: "#000000",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imgStyle: {
        width: 40,
        height: 40,
        borderRadius: 50
    },
    dropdown: {
        // margin: 16,
        height: 25,
        width: "25%",
        alignSelf: 'flex-end',
        // borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        width: 10,
        fontSize: 16,
    },
});
export default Header;