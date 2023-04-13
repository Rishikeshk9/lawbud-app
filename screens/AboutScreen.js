import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from "react-native";
import Header from "../components/AboutScreen/Header";
import { Ionicons } from '@expo/vector-icons';
import image1 from "../assets/image.jpg";
import { COLORS } from "../components/constants";
import Ratings from "../components/AboutScreen/Ratings";
import Reviews from "../components/AboutScreen/Reviews";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Rating } from "react-native-ratings";
import axios from "axios";
import { useRef } from "react";

function AboutScreen({ route }){
    const [loading,setLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [ lawyersRating, setLawyersRating ] = useState(0);
    
    const [ rating, setRating ] = useState(null);
    const reviewsArray = useRef([]);
    const [averageReview, setAverageReview] = useState(0);
    async function getUserData() {
        setLoading(true);
        const currentUser = await AsyncStorage.getItem("currentUserData");
        console.log(currentUser);
        let arr = JSON.parse(currentUser);
        setCurrentUser(JSON.parse(currentUser));
        setLoading(false);
        // console.log("Current User: " + currentUser[0]._id);

    }
    function getAverageReview() {
        let count = 0;
        let data = reviewsArray.current;
        data.forEach((item,index)=>{
            
                console.log("Rating: "+item.rating);
                count += item.rating;
        });
        
        setAverageReview(count / (data.length));
        console.log("Count: "+ count + " Data: "+data.length +" "+ count / (data.length));
    }
    async function getRatings(){
        setLoading(true);
        const response = await axios.get(`https://lawbud-backend.onrender.com/user/getReview/${route.params.userId}`);
        console.log( "Response: " + JSON.stringify(response.data));
        let reviews = response.data;
        console.log(route.params.currentUserId);
        reviewsArray.current = reviews.data;
        reviews.data.forEach((item,index)=>{
            console.log(item.reviewer);
            if(item.reviewer === route.params.currentUserId){
                console.log("Matched...");
                setLawyersRating(item.rating);
            }
        });
        getAverageReview();
        setLoading(false);
    }

    async function onFinishRating(rating) {
        console.log("Rating: " + rating);
        setRating(rating);
        let msg =
        {
            "reviewer": route.params.currentUserId,
            "reviewed_on": route.params.userId,
            "review_msg": rating + "",
            "rating": rating,
        }
        console.log(msg);
        axios.post("https://lawbud-backend.onrender.com/user/addRating/", msg).then((response)=>{
            // reviews.push(msg);
            getRatings();
        })
    }
    useEffect(()=>{
        getUserData();
        getRatings();
        // console.log( route.params.reviews );
        
    },[]);
    return(
        <SafeAreaView style={{flex:1,backgroundColor: COLORS.lightGray, }}>
            <Header/>
            <ScrollView>

            <View style={styles.container}>
                <Card name={ route.params.name } imgSrc={ route.params.imgSrc } type={ route.params.type } languages={ route.params.languages } experience={ route.params.experience } averageReview={ averageReview }  />
                { loading && <ActivityIndicator size={"small"} color={COLORS.black} /> }
                { currentUser && 
                    <Chat_Button name={route.params.name} imgSrc={ route.params.imgSrc } currentUser={currentUser} contact={ route.params.contact } />
                }
                <View  style={styles.textStyle}>
                    <Text style={{padding: 12}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, provident pariatur dolorum quidem nihil, quaerat voluptatibus nam adipisci consectetur repellendus, facilis excepturi? Aliquam assumenda enim quia laboriosam. Quam, temporibus perspiciatis?</Text>
                </View>
               
                <View  style={{...styles.textStyle,   padding: 12, width: '100%' }}>
                    <Text>Rate {route.params.name}:</Text>
                    <Rating
                                //   type='heart'
                                ratingCount={5}
                                startingValue={ lawyersRating }
                                imageSize={40}
                                showRating
                                onFinishRating={onFinishRating}
                                style={{ paddingBottom: 10 }}
                            />
                </View>
                <View style={{ backgroundColor: COLORS.white,   elevation: 2, borderRadius: 5, padding: 12, }} >
                    {/* <Ratings userId={ route.params.userId } /> */}
                    <Reviews reviews={ route.params.reviews } averageReview={averageReview} setAverageReview={setAverageReview} lawyersRating={ lawyersRating } userId={ route.params.userId } currentUserData={ route.params.currentUserData }/>
                </View>
                <Report_Button/>
                
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function Card({ name, imgSrc, type, languages, experience, averageReview }) {
    const navigation = useNavigation();
    // console.log(experience);
    return (
        <View style={{elevation: 2, borderRadius: 7,   overflow: 'hidden' }} >
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}}>

            <Image
                source={{
                    uri: imgSrc
                }}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={21} color={COLORS.gray} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: COLORS.gray }} >{type}</Text>
                <Text style={{ color: COLORS.gray }} >{languages.map((item,index) => 
                {
                    if(index!==languages.length-1){
                        return item + ", "
                    }
                    else{
                        return item;
                    }
                } )}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginRight: 10 }} >
                    <Text style={{ color: COLORS.gray }} >Exp: {experience}</Text>
                    <Rating
                //   type='heart'
                        ratingCount={5}
                        imageSize={25}
                        readonly
                        style={{ alignSelf: 'flex-end', paddingVertical: 10 }}
                        starContainerStyle={{padding:5}}
                        startingValue={ averageReview }
                        />
                    {/* <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                    </View> */}
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}

function Report_Button(){
    return(
        <TouchableOpacity style={styles.report_btn} onPress={()=>{
            Alert.alert("Report", "Report an account", [
                {
                    text: "Cancel"
                },
                {
                    text: "OK"
                },
        ]);
        }} >
            <Text> Report Account </Text>
        </TouchableOpacity>
    );
}

function Chat_Button({name, imgSrc, contact, currentUser }){
    const navigation = useNavigation();
    return(
        <TouchableOpacity onPress={()=>{
            navigation.navigate('Chat',{
                imgSrc: imgSrc,
                name: name,
                contact: contact,
                currentUser: currentUser
            });
        }} >
        <View style={styles.chat_btn}>
            <Ionicons name="chatbubble-ellipses" size={24} color={COLORS.white} />
            <Text style={{ color: COLORS.white, fontSize: 20, fontWeight: '400', marginLeft: 5}} >Chat</Text>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        backgroundColor: COLORS.lightGray
    },
    imgStyle: {
        width: 110,
        height: 110,
        aspectRatio: 1/1,
        // borderWidth: 5,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    textStyle:{
          width: '100%',
        flex: 1,
        elevation:2,
        backgroundColor: COLORS.white,
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom:10
    },
    report_btn:{
        marginTop: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: "#f8fafc",
        borderColor: COLORS.red,
        borderWidth: 1,
        borderRadius: 5,
    },
    chat_btn:{
        flexDirection: 'row',
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        
        paddingVertical: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5, marginVertical:10
    }
});

export default AboutScreen;