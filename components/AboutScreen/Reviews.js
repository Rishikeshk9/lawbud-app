import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, ProgressBarAndroid, Alert } from "react-native";
import { COLORS } from "../constants";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { Rating } from "react-native-ratings";

function Reviews({ userId, lawyersRating, averageReview, setAverageReview, currentUserData }) {

    // Rating
    const reviewsArray = useRef([]);
    // const [loading, setLoading] = useState(false);
    // const [averageReview, setAverageReview] = useState(0);
    const oneCount = useRef(0);
    const twoCount = useRef(0);
    const threeCount = useRef(0);
    const fourCount = useRef(0);
    const fiveCount = useRef(0);
    const [reviews, setReviews] = useState(reviewsArray.current);
    async function getReviews() {
        setLoading(true);
        const response = await axios.get(`https://lawbud-backend.onrender.com/user/getReview/${userId}`);
        console.log("Response: " + JSON.stringify(response.data));
        let reviews = response.data;
        console.log(reviews.data);
        reviewsArray.current = reviews.data.filter((item,index)=>{
            return item.hasOwnProperty("review_msg") == true;
        })
        // setReviewsarray(reviews.data);
        if(reviews.data.length>0)
        {
            getAverageReview();
        }
        setLoading(false);
    }
    function getAverageReview() {
        let count = 0;
        let data = reviewsArray.current;
        data.forEach((item, index) => {
            switch (item.rating) {
                case 1:
                    oneCount.current = oneCount.current + 1;
                    break;
                case 2:
                    twoCount.current = twoCount.current + 1;
                    break;
                case 3:
                    threeCount.current = threeCount.current + 1;
                    break;
                case 4:
                    fourCount.current = fourCount.current + 1;
                    break;
                case 5:
                    fiveCount.current = fiveCount.current + 1;
                    break;

            }
            count += item.rating;
        });
        console.log("Count: " + count + "Length: " + data.length);
        oneCount.current =  (oneCount.current / data.length * 100)/100;
        twoCount.current =  (twoCount.current / data.length * 100)/100;
        threeCount.current =  (threeCount.current / data.length * 100)/100;
        fourCount.current =  (fourCount.current / data.length * 100)/100;
        fiveCount.current =  (fiveCount.current / data.length * 100)/100;
        console.log(oneCount.current +" "+twoCount.current +" "+threeCount.current +" "+fourCount.current +" "+fiveCount.current);
        // console.log((reviews.length / fiveCount.current)/10);
        setReviews(data);
        setAverageReview(count / data.length);
    }

    console.log(reviews);
    const [review, setReview] = useState();
    // const [reviewsArray, setReviewsarray] = useState([]);
    const [loading, setLoading] = useState(false);
    async function handleSubmit() {
        let msg =
        {
            "reviewer": currentUserData[0].user_id,
            "reviewed_on": userId,
            "review_msg": review,
            "rating": lawyersRating,
        }
        if(review==null)
        {
            Alert.alert("Review","Please enter a valid review",[{
                text: "Ok",
                onPress: ()=>{
                    return;
                }
            }]);
            return;
        }
        if(lawyersRating==0)
        {
            Alert.alert("Rating","Please enter a rating",[{
                text: "Ok",
                onPress: ()=>{
                    return;
                }
            }]);
            return;
        }
        console.log(msg);
        axios.post("https://lawbud-backend.onrender.com/user/addReview/", msg).then((response) => {
            // reviews.push(msg);
            getReviews();
        })


    }


    // async function getReviews() {
    //     setLoading(true);
    //     const response = await axios.get(`https://lawbud-backend.onrender.com/user/getReview/${userId}`);
    //     console.log("Response: " + JSON.stringify(response.data));
    //     let reviews = response.data;
    //     console.log(reviews.data);
    //     setReviewsarray(reviews.data);
    //     setLoading(false);
    // }

    useEffect(() => {
        getReviews();
    }, []);

    return (
        <View style={styles.container}>
             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom:10 }} >
                <View style={{ width: 48, height: 48, backgroundColor: COLORS.grey, borderRadius: 50 }}></View>
                <TextInput
                    placeholder=" Write a Review"
                    style={{ width: '70%', paddingVertical:6, paddingHorizontal: 10, marginLeft: 10, backgroundColor: COLORS.lightGray, borderRadius:5 }} onChangeText={(data) => {
                        setReview(data);
                    }} />
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: review?.length > 2 ? COLORS.black: COLORS.lightGray, marginHorizontal:4, paddingVertical: 8, paddingRight: 6, borderRadius: 50 }}>
                    <MaterialCommunityIcons name="send" size={24} color="white" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <Text>Ratings</Text>
                
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: COLORS.lightGray, borderRadius: 10, padding: 10 }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',  }} >
                    <>
                    <Text style={styles.ratingText}>{averageReview.toFixed(2)}</Text>

                    <Text style={{ color: COLORS.gray }}>{reviews.length} reviews</Text></>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={styles.barStyle}><Text>1</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={oneCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>2</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={twoCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>3</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={threeCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>4</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={fourCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>5</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={fiveCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                </View>

            </View>


            <Text style={{ marginVertical: 10 }} >User Reviews</Text>
           

            {
                loading && <ActivityIndicator size={"small"} color={COLORS.black} />
            }
            {
                reviewsArray.length == 0 ? <View style={{ justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 20 }} >No Reviews...</Text></View> : null
            }
            {
                reviewsArray &&
                <FlatList
                    data={reviewsArray.current}
                    renderItem={({ item, index }) => (
                        <>
                            {
                                item?.hasOwnProperty("review_msg") ?
                                    <View key={index} style={{ marginTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.lightGray, }} >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                            <View style={{ width: 36, height: 36, backgroundColor: COLORS.grey, borderRadius: 50 }}></View>
                                            <View>
                                                <View style={{ flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center' }} >
                                                    <Text style={{ marginLeft: 10, fontWeight: 'bold', marginRight:5 }}>Name</Text>
                                                    <Rating
                                                    //   type='heart'
                                                    ratingCount={5}
                                                    imageSize={12}
                                                    readonly
                                                    style={{ alignSelf: 'flex-end', paddingVertical: 10 }}
                                                    starContainerStyle={{padding:5}}
                                                    startingValue={item?.rating}
                                                    />
                                                </View>
                                                <Text style={{ color: COLORS.gray, marginLeft: 10 }} >{item?.review_msg}</Text>
                                            </View>
                                                
                                        </View>
                                        
                                        
                                    </View> : null
                            }
                        </>
                    )}
                    inverted={true}
                    keyExtractor={({ item, index }) => index}
                />


            }

            {
                reviews.length > 1 ?
                    <TouchableOpacity>
                        <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10, borderRadius: 5, width: '30%', backgroundColor: COLORS.lightGray }} >
                            <Text>See More</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                        </View>
                    </TouchableOpacity> : null
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: '100%'
    },
    header: {
        marginBottom: 4,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    barStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 40,
        color: COLORS.gray,
    }
})

export default Reviews;