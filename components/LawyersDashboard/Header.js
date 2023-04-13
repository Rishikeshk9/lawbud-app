import { Pressable, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants";
import { FontAwesome } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useContext } from "react";
import { AuthContext } from "../context";
function Header() {
    const navigation = useNavigation();
    const { usersType } = useContext(AuthContext);
    return (
        <View style={styles.headerContainer}>
            <Pressable onPress={() => {
                // navigation.openDrawer();
                navigation.dispatch(DrawerActions.openDrawer());
            }} >
                <FontAwesome name="bars" size={24} color={COLORS.white} />
            </Pressable>
            <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                <TextInput style={styles.inputStyle} cursorColor={COLORS.white} placeholder={"Search lawyer in your area..."} placeholderTextColor={COLORS.gray} />
                {/* <SearchableDropDown
            items={lawyersData}
            onItemSelect={(item) => {
              navigation.navigate("About", {
                name: item.name,
                type: item.userType,
                languages: ["Hindi", "English"],
                experience: item.experience
              });
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
            placeholderTextColor={COLORS.black}
            textInputProps={{
              underlineColorAndroid: 'transparent',
              style: {
                padding: 2,
                borderWidth: 1.5,
                borderColor: COLORS.grey,
                borderRadius: 5,
                backgroundColor: COLORS.white,
                color: COLORS.black,
                marginLeft: 10
              }
            }}
          /> */}
                <TouchableOpacity onPress={() => {
                    if(usersType==="user")
                    {
                        navigation.navigate("Profile");
                    }
                    else{
                        navigation.navigate("LawyersProfile");
                    }
                }} >
                    <FontAwesome name="user" size={24} color={COLORS.white} style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        // paddingHorizontal: 20
    },
    textStyle: {
        fontSize: 27,
        paddingVertical: 10,
        fontWeight: '500',
    },
    cardStyle: {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 5,
        paddingVertical: 10,
        elevation: 2
    },
    headerContainer: {
        flexDirection: 'row',
        padding: 5,
        paddingRight: 16,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    barStyle: {
        borderWidth: 2,
        width: 80,
        height: 80,
        borderRadius: 50,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        padding: 4,
        color: COLORS.white,
        paddingHorizontal: 10,
        width: '90%',
        marginLeft: 2,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
    }
});

export default Header;