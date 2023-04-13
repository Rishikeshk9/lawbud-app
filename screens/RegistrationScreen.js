import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { COLORS } from "../components/constants";
import { MaterialIcons } from '@expo/vector-icons';
import SearchableDropDown from "react-native-searchable-dropdown";
import { useNavigation } from "@react-navigation/native";
import { getLawyersCategories, getLawyersData } from "../Services/requests";
import { Formik } from "formik";
import * as Yup from 'yup';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { AuthContext } from "../components/context";
import { State } from "react-native-gesture-handler";


const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Required'),
    phone: Yup.string().min(10, "Must be exactly 10 digits").max(10, "Must be exactly 10 digits").matches(/^[0-9]+$/, "Must be only digits").required("Please enter your mobile number")
});
const SignupOTPSchema = Yup.object().shape({
    otp: Yup.string().min(4, "Must be exactly 4 digits").max(4, "Must be exactly 4 digits").matches(/^[0-9]+$/, "Must be only digits").required("Please enter your OTP")
});

function RegistrationScreen(){
    let [userType, setUserType] = useState("user");
    const { usersType, setUsersType, newUserData, setNewUserData1 } = useContext(AuthContext);
    const State = useContext(AuthContext);
    const navigation = useNavigation();
    const [userData,setUserData] = useState({
        type: '',
        email_id: '',
        phone: '',

    })
    const [lawyersCategoriesData, setCategoriesLawyersData] = useState([]);
    const [loading, setLoading] = useState(false);
    async function getLawyersCategoriesData1() {
        if (loading) {
            return;
        }
        const lawyersCategories = await getLawyersCategories();
        console.log("Category:" + lawyersCategories);
        setCategoriesLawyersData(lawyersCategories);
        setLoading(false);
    }
    useEffect(() => {
        getLawyersCategoriesData1();
        
    }, []);
    useEffect(()=>{
        console.log("In a useEffect:"+JSON.stringify(State.newUserData));
    },[State.newUserData]);
    return (
        <View style={styles.container}>
            <Text style={{ color: COLORS.white, fontSize: 30, fontWeight: '400' }}>Registration</Text>
            { loading && <ActivityIndicator size={"small"} color={COLORS.black} />}
            { lawyersCategoriesData && <RegistrationProgress userType={userType} />}
            {/* Registration Screens */}
            <Register userType={userType} State={State} usersType={State.usersType} setUserType={setUserType} setUsersType={State.setUsersType} setNewUserData1={State.updateUser} newUserData={State.newUserData} lawyersCategoriesData={lawyersCategoriesData} />
            {/* <Personal/> */}
            {/* {
               !loading ? <SkillSets lawyersCategoriesData={lawyersCategoriesData} /> : <ActivityIndicator size={"small"} color={COLORS.black} />
            } */}
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

        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 2, flexDirection: 'row', justifyContent: 'space-around', borderRadius: 5 }} >
            {/* <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>SkillSets</Text>
    <Text style={{fontSize: 12, color: COLORS.black}}>Documents</Text> */}
            {
                userType === "lawyer" ?
                <View style={{flexDirection: 'row', width: '100%' }} >

                    <ProgressSteps {...progressStepsStyle}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="SkillSets" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Documents" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                </View>
                    :
                    <ProgressSteps {...progressStepsStyle}>
                        <ProgressStep label="Register" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                        <ProgressStep label="Personal" nextBtnTextStyle={styles.buttonTextStyle} previousBtnTextStyle={styles.buttonTextStyle}></ProgressStep>
                    </ProgressSteps>
                    
            }

            {/* <Text style={{fontSize: 12, color: COLORS.black}}>Register</Text>
        <Text style={{fontSize: 12, color: COLORS.black}}>Personal</Text>     */}

        </View >
    );
}
function Register({ userType, State, usersType, setUserType, setUsersType, newUserData, setNewUserData1, lawyersCategoriesData }) {
    const [currentOption, setCurrentOption] = useState("user");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");
    const navigation = useNavigation();
    const refRBSheet = useRef();
    const formikRef = useRef();

    function notifyData(){
        // setNewUserData1({...newUserData,email:email,phone:phone});
        // State.updateDatabase({...newUserData,email: email,phone:phone});
        console.log("Email and phone: "+email+" "+phone);
    }

    useEffect(()=>{
        if(email!==null && phone!==null)
        notifyData();
    },[email,phone,usersType]);
    return (
        <View style={{ backgroundColor: COLORS.white, marginTop: 10, padding: 16, borderRadius: 5 }}>
            <Text style={{ fontSize: 16, color: COLORS.gray, }}>What describes you best?</Text>
            <View style={{ flexDirection: 'row', borderRadius: 5, padding: 4, marginTop: 5, backgroundColor: COLORS.lightGray }} >
                <TouchableOpacity style={{ width: '50%', borderRadius: 5, backgroundColor: userType === "user" ? COLORS.black : COLORS.lightGray }} onPress={() => {
                    setUserType("user");
                    State.setUsersType("user");
                }} >
                    <Text style={{ color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%', borderRadius: 5, backgroundColor: userType === "lawyer" ? COLORS.black : COLORS.lightGray }} onPress={() => {
                    setUserType("lawyer");
                    State.setUsersType("lawyer");
                }}>
                    <Text style={{ color: COLORS.gray, fontSize: 16, padding: 10, textAlign: 'center' }}>Lawyer</Text>
                </TouchableOpacity>
            </View>
            {/* User Data */}
            <Formik initialValues={{
                email: '',
                phone: ''
            }}
            innerRef={formikRef}
            onSubmit={(state)=>{
                console.log("State"+JSON.stringify(state));
                if(state.email!==null && state.phone!==null)
                {
                    let email1 = state.email;
                    let phone1 = state.phone;
                    State.updateUser({...newUserData,email_id: email1,contact: parseInt(phone1),type: State.usersType });
                }
               
            }}
                validationSchema={SignupSchema}
            >
                {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

                    <View style={{ width: '100%', }} >
                        {/* <InputComponent title={"Email id"} /> */}
                        <View style={{ marginTop: 10 }} >
                            <Text style={{ color: COLORS.gray }}>Email id</Text>
                            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.email} onChangeText={handleChange('email')} onBlur={() => setFieldTouched('email')} />
                            {touched.email && errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <Text style={{ color: COLORS.gray }}>Phone Number</Text>
                            <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.phone} onChangeText={handleChange('phone')} onBlur={() => setFieldTouched('phone')} />
                            {touched.phone && errors.phone && (
                                <Text style={styles.errorText}>{errors.phone}</Text>
                            )}
                        </View>

                        {/* <InputComponent title={"Phone Number"} /> */}
                        {/* Button */}
                        <TouchableOpacity onPress={() => {
                            formikRef.current.submitForm();
                            refRBSheet.current.open();
                        }} disabled={!isValid} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }} >
                            <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Get OTP</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            {/* Bottom Sheet */}
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>

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

                    <SheetComponent navigation={navigation} State={State} userType={userType} email={email} phone={phone} setNewUserData1={setNewUserData1} newUserData={newUserData} lawyersCategoriesData={lawyersCategoriesData} />
                </RBSheet>
            </View>
        </View>
    );
}
function SheetComponent({ navigation, State, userType, email, phone, newUserData, setNewUserData1, lawyersCategoriesData }) {
    const formikRef = useRef();
    const [data,setData] = useState();
    useEffect(()=>{
        // data.email = email;
        // data.phone = phone;
        // setData({...newUserData, email, phone });
        // console.log("In a sheet:");
        // console.log(data);
        // setNewUserData1({...newUserData,email:email,phone:phone});
    },[]);
    return (
        <Formik initialValues={{
            otp: ''
        }}
        onSubmit={()=>{
            // setData((prev)=>({
            //     ...prev,
            //     email: "hello", 
            //     phone: phone
            // }));
            // State.updateUser({...newUserData,email:email,phone:phone});
            // console.log("In a register"+JSON.stringify(newUserData));
            // console.log( JSON.stringify(newUserData));
        }}
        innerRef={formikRef}
        validationSchema={SignupOTPSchema}>
            {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (

                <View style={{ padding: 10 }} >
                    <View style={{ marginTop: 10 }} >
                        <Text style={{ color: COLORS.gray }}>Enter OTP</Text>
                        <TextInput style={styles.inputStyle} cursorColor={COLORS.gray} value={values.otp} onChangeText={handleChange('otp')} onBlur={() => setFieldTouched('otp')} />
                    </View>

                    <TouchableOpacity onPress={() => {
                        formikRef.current.submitForm();
                        navigation.navigate("Personal", {
                            userType,
                            lawyersCategoriesData

                        });
                    }} style={{ backgroundColor: isValid ? COLORS.black : COLORS.grey, marginTop: 10, borderRadius: 4 }} disabled={!isValid} >
                        <Text style={{ color: COLORS.white, padding: 4, textAlign: 'center' }} >Next</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingTop: 10
    },

    btn: {
        backgroundColor: COLORS.white,
    },
    inputStyle: {
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        paddingLeft: 5,
        marginTop: 4
    },
    badgeStyle: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.secondary,
        borderRadius: 50,
        padding: 5
    },

    errorText: {
        color: COLORS.red,
    },
    buttonTextStyle: {
        color: '#393939',
        padding: 0,
        margin: 0
    }
});
export default RegistrationScreen;