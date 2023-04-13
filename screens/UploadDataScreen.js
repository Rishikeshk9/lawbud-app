import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../components/constants";
import { AuthContext } from "../components/context";
import { loginContext } from "../components/context1";

function UploadDataScreen(){
    
    const [loading,setLoading] = useState(false);
    const { newUserData, updateUser } = useContext(AuthContext);
    const { signUp } = useContext(loginContext);
    const navigation = useNavigation();
    async function submitData(){
        setLoading(true);
        console.log(newUserData);
        await signUp(newUserData).then((response)=>{
            console.log(response);
        }).catch(()=>{
            Alert.alert("Error...");
        }).finally(()=>{
            setLoading(false);
            navigation.navigate("SignIn");
        });
    }
    async function savaData(){
        setTimeout(async ()=>{
            submitData();
        },1000);
    }
    useEffect(()=>{
        savaData();
    },[]);
    return(
        <View style={styles.container}>
            {
                !loading ?
            <>
                <ActivityIndicator size={"large"} color={COLORS.black} />
                <Text>Saving data...</Text>
            </> :
            null
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default UploadDataScreen;