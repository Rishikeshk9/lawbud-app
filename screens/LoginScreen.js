import { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ActivityIndicator, Alert, ToastAndroid } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";
import { useNavigation } from "@react-navigation/native";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import { AuthContext } from "../components/context";
import { loginContext } from "../components/context1";
import { getLawyersData } from "../Services/requests";
const LoginSchema = Yup.object().shape({
    phone: Yup.string().min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").matches(/^[0-9]+$/, "Must be only digits").required("Please enter your mobile number")
});
const LoginOTPSchema = Yup.object().shape({
    otp: Yup.string().min(4, "Must be exactly 4 digits").max(4, "Must be exactly 4 digits").matches(/^[0-9]+$/, "Must be only digits").required("Please enter your OTP")
});


function LoginScreen() {
    const refRBSheet = useRef();
    const formikRef = useRef();
    const navigation = useNavigation();
    const { usersType, setUsersType } = useContext(AuthContext);
    const { signIn } = useContext(loginContext);
    let [userType, setUserType] = useState("user");
    let [phone, setPhone] = useState();
    let [allUsers, setAllUsers] = useState([]);
    let [usersData, setUsersData] = useState([]);
    let [loading, setLoading] = useState(false);
    async function getUsersData() {
        if (loading) {
            return;
        }
        setLoading(true);
        console.log("Called 1");
        const data1 = await getLawyersData();
        console.log(data1.data);
        console.log("Called 2");
        setAllUsers(data1.data);
        setUsersData(data1.data.filter((item, index) => {
            return item.type === userType;
        }));
        setLoading(false);
    }
    function checkUserIsValid() {
        let foundUser = allUsers?.filter((item, index) => {
            // console.log( String(item.contact) +" "+ phone);
            if( item.type === usersType)
            return String(item.contact) === phone;
        });
        // console.log("Found user: "+ JSON.stringify(foundUser));
        if (foundUser.length !== 0) {
            ToastAndroid.show("1234", ToastAndroid.SHORT);
            refRBSheet.current.open();
        }
        else {

            Alert.alert("Invalid user!", "Phone Number is incorrect...", [
                { text: "Okay" }
            ]);
            return;
        }
    }
    useEffect(() => {
        setUsersData(allUsers?.filter((item, index) => {
            return item.type === usersType;
        }));
    }, [userType]);
    useEffect(() => {
        setUsersType("user");
        getUsersData();

    }, []);
    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Login</Text>
            <View style={{ flexDirection: 'row', borderRadius: 5, padding: 4, marginTop: 5, backgroundColor: COLORS.lightGray }} >
                <TouchableOpacity style={{ width: '50%', borderRadius: 5, backgroundColor: userType === "user" ? COLORS.black : COLORS.lightGray }} onPress={() => {
                    setUserType("user");
                    setUsersType("user");
                }} >
                    <Text style={{ color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%', borderRadius: 5, backgroundColor: userType === "lawyer" ? COLORS.black : COLORS.lightGray }} onPress={() => {
                    setUserType("lawyer");
                    setUsersType("lawyer");
                }}>
                    <Text style={{ color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>Lawyer</Text>
                </TouchableOpacity>
            </View>
            {
                loading && <ActivityIndicator size={"small"} color={COLORS.white} />
            }
            {usersData &&
                <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>

                    {/* User Data */}
                    {
                        usersData &&
                        <>
                            <Formik initialValues={{
                                phone: ''
                            }}
                                innerRef={formikRef}
                                onSubmit={(state) => {
                                    let phone1 = state.phone;
                                    setPhone(phone1);
                                    checkUserIsValid();
                                    // console.log("State:"+ JSON.stringify(state));
                                }}
                                validationSchema={LoginSchema}
                            >
                                {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                                    <>
                                        <View style={{ marginTop: 10 }} >
                                            <Text style={{ color: COLORS.gray }}>Phone Number</Text>
                                            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.phone} keyboardType={"number-pad"} onChangeText={handleChange('phone')} onBlur={() => setFieldTouched('phone')} />
                                            {touched.phone && errors.phone && (
                                                <Text style={styles.errorText}>{errors.phone}</Text>
                                            )}
                                        </View>
                                        {/* Button */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                formikRef.current.submitForm();

                                            }} disabled={loading && !isValid} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }} >
                                            <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Send OTP</Text>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                                            <Text style={{ color: COLORS.gray }} >Don't have an account?</Text>
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate("Register");
                                            }} >
                                                <Text style={{ color: COLORS.gray, marginLeft: 5, textDecorationLine: 'underline' }} >Sign Up</Text>
                                            </TouchableOpacity>
                                        </View>

                                    </>
                                )}
                            </Formik>



                            {/* Bottom Sheet */}
                            <RBSheet
                                ref={refRBSheet}
                                animationType="none"
                                closeOnDragDown={true}
                                closeOnPressMask={true}
                                customStyles={{
                                    container: {
                                        backgroundColor: COLORS.white,
                                    },
                                    wrapper: {
                                        backgroundColor: "transparent",
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    }
                                }}
                            >
                                <SheetComponent navigation={navigation} userType={userType} setUsersType={setUsersType} usersType={usersType} setLoading={setLoading} signIn={signIn} phone={phone} usersData={usersData} />
                            </RBSheet>
                        </>

                    }

                </View>
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
function SheetComponent({ navigation, userType, usersType, setUsersType, setLoading, signIn, phone, usersData }) {
    const formikRef1 = useRef();
    const [otp, setOtp] = useState();
    // const navigation = useNavigation();
    function loginHandle() {
        // console.log("In a sheet component..."+ JSON.stringify(lawyersData));
        setLoading(true);
        let usersArray = usersData;
        console.log(usersArray);
        let foundUser = usersArray.filter((item, index) => {
            console.log(String(item.contact) + " " + phone);
            return String(item.contact) === phone;
        });
        console.log("Found user: " + JSON.stringify(foundUser));
        if (foundUser.length === 0) {
            Alert.alert("Invalid user!", "Username or password is incorrect...", [
                { text: "Okay" }
            ]);
            return;
        }
        signIn(foundUser).then(() => {
            console.log("User logged in...");
        }).catch((e) => {
            Alert.alert("Error occured...");
        }).finally(() => {
            setLoading(false);
        })

    }
    return (
        <Formik initialValues={{
            otp: ''
        }} validationSchema={LoginOTPSchema} innerRef={formikRef1} onSubmit={(state) => {
            setOtp(state.otp);

        }} >
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
                <View style={{ paddingVertical: 20, paddingHorizontal: 40 }}>
                    <View style={{ marginTop: 10 }} >
                        <Text style={{ color: COLORS.gray }}>Enter OTP</Text>
                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.otp} onChangeText={handleChange('otp')} onBlur={() => setFieldTouched('otp')} />
                        {touched.otp && errors.otp && (
                            <Text style={styles.errorText}>{errors.otp}</Text>
                        )}
                    </View>
                    <TouchableOpacity disabled={!isValid} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }} onPress={() => {
                        // if(userType=="user")
                        // {
                        //     navigation.navigate("Home");
                        // }
                        // else{
                        //     // setUsersType

                        //     // navigation.navigate("LawyersDashboard");
                        // }
                        formikRef1.current.submitForm();
                        loginHandle(phone, otp);
                    }} ><Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Next</Text></TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 29,
        justifyContent: 'center',
    },
    inputStyle: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4

    },

    errorText: {
        color: COLORS.red,
    }
})
export default LoginScreen;