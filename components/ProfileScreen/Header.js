import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
function Header({headerText, type}) {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>{
                navigation.goBack();
            }} >
            <AntDesign name="arrowleft" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <Text style={{color: COLORS.white,marginLeft: 10, fontSize:16 }}>{ headerText }</Text>
            <View style={{alignSelf:'flex-end', backgroundColor: COLORS.success, padding: 2, paddingHorizontal: 4, borderRadius: 5 }}>
                <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    {/* <MaterialIcons name="edit" size={18} color={COLORS.white} /> */}
                    <Text style={{color: COLORS.white}}>{ type.toUpperCase() || "" }</Text>
                </TouchableOpacity>
            </View>
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
    imgStyle:{
        width: 40,
        height: 40,
        borderRadius: 50
    }
})
export default Header;