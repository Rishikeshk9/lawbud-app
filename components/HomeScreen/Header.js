import { Text, View, StyleSheet, TextInput, Pressable, TouchableOpacity } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import SearchableDropDown from "react-native-searchable-dropdown";
function Header({lawyersData, currentUserData }) {
    const navigation = useNavigation();
    // console.log("In a header:"+lawyersData);
    return (
        <View style={styles.container}>
            <Pressable onPress={()=>{
                navigation.openDrawer();
            }} >
                <FontAwesome name="bars" size={24} color={COLORS.white} style={{marginLeft: 10}} />
            </Pressable>
            <View style={{flexDirection: 'row',alignItems: 'center' }} >
                
                <SearchableDropDown
                items={lawyersData}
                onItemSelect={(item)=> {
                    navigation.navigate("About",{
                    name: item.name,
                    type: item.userType,
                    languages: ["Hindi","English"],
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
                    borderRadius:5
                }}
                itemTextStyle={{
                    color: COLORS.black
                }}
                resetValue={false}
                placeholder={"Search for lawyers in your area..."}
                placeholderTextColor={COLORS.black}
                textInputProps={{
                    underlineColorAndroid: 'transparent',
                    style:{
                        padding: 2,
                        borderWidth: 1.5,
                        borderColor: COLORS.grey,
                        borderRadius: 5,
                        backgroundColor: COLORS.white,
                        color: COLORS.black,
                        marginLeft: 10
                    }
                }}
            />
                <TouchableOpacity onPress={()=>{
                    navigation.navigate("Profile",{
                        currentUserData
                    });
                }} >
                    <FontAwesome name="user" size={24} color={COLORS.white} style={{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        paddingRight: 16,
        backgroundColor: "#000000",
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputStyle: {
        borderWidth: 1,
        padding: 4,
        color: COLORS.white,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
    }
});
export default Header;