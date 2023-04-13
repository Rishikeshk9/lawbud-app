import { Text, View, StyleSheet, TouchableOpacity, ProgressBarAndroid } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from "../constants";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Rating } from "react-native-ratings";
import { useRef } from "react";
function Ratings({ userId }) {
    const reviewsArray = useRef([]);
    const [loading, setLoading] = useState(false);
    const [averageReview, setAverageReview] = useState(0);
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
        reviewsArray.current = reviews.data;
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
    
    useEffect(() => {
        getReviews();
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Ratings</Text>
                <MaterialIcons name="arrow-forward-ios" size={21} color={COLORS.gray} />
            </View>
            <View style={{ flexDirection: 'row', }} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={styles.ratingText}>{averageReview.toFixed(2)}</Text>
                    
                    {/* <Rating
                        ratingCount={5}
                        startingValue={averageReview}
                        imageSize={20}
                        style={{ paddingVertical: 10 }}
                    /> */}
                    <Text style={{ color: COLORS.gray }}>{reviews.length} reviews</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={styles.barStyle}><Text>1</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={oneCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>2</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={twoCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>3</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={threeCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>4</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={fourCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                    <View style={styles.barStyle}><Text>5</Text><ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={ fiveCount.current} color={COLORS.blue} style={{ width: '80%', marginLeft: 10 }} /></View>
                </View>

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 5,
        width: '100%',
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
});
export default Ratings;