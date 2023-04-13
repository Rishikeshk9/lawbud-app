import { useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView, FlatList } from "react-native";
import { COLORS, NEWS_ALERTS } from "../components/constants";
import Header from "../components/Header";
import LottieView from 'lottie-react-native';
import { useRef } from "react";

function NewsAlertScreen() {
    const animation = useRef(null);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Header headerText="News Alerts" />

            <View style={styles.container}>
                <LottieView
                    source={require('../assets/629-empty-box.json')}
                    autoPlay
                    // ref={animation}
                    loop
                    style={{
                        width: 200,
                        height: 200,
                        backgroundColor: '#eee',
                    }}
                // Find more Lottie files at https://lottiefiles.com/featured
                />
                {/* <FlatList 
                data={NEWS_ALERTS}
                    renderItem={({item})=>(
                        <Card headline={item.headline} description={item.description} />

                        )}
                        keyExtractor={(item,index)=>index}
                /> */}
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.black, marginTop: 10 }} >Coming Soon...</Text>
            </View>
        </SafeAreaView>
    );
}

function Card({ headline, description }) {
    const navigation = useNavigation();
    return (
        <View style={{ elevation: 2, borderRadius: 7, marginBottom: 10, overflow: 'hidden' }} >
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: COLORS.white }} >


                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                    // Navigate to Lawyer's AboutScreen 
                    // navigation.navigate('About',{

                    //     });
                }} >

                    <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center', padding: 5 }} >
                        <Text style={styles.headingStyle}>{headline}</Text>
                        <Text style={{ color: COLORS.gray, }} >{description} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    headingStyle: {
        fontSize: 20,
        fontWeight: '500',
    }

});

export default NewsAlertScreen;