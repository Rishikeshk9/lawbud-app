import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView, ActivityIndicator } from "react-native";
import { COLORS } from "../components/constants";
import { AuthContext } from "../components/context";
import Categories from "../components/HomeScreen/Categories";
import Header from "../components/HomeScreen/Header";
import Lawyers from "../components/HomeScreen/Lawyers";
import { getLawyersData } from "../Services/requests";
import MarqueeText from 'react-native-marquee';


function HomeScreen() {
  const [lawyersData, setLawyersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ currentUserData, setCurrentUserData ] = useState();
  const [ username, setUsername ] = useState();
  const { favouriteUsers, setfavouriteUsers } = useContext(AuthContext);
  async function getLawyersData1() {
    if (loading) {
      return;
    }
    setLoading(true);
    let lawyersArray = [];
    let response = await getLawyersData();
    // lawyersArray = response.data;
    // console.log(response);
    // console.log("LawyersArray: " + lawyersArray);
    setLawyersData(response.data.filter((item) => {
      return item.type === "lawyer";
    }));

    // console.log("Lawyers Data:1 " + lawyersData);
    setLoading(false);
  }
  async function setFavouritesData(){
    const data = await AsyncStorage.getItem("currentUserData");
    let data1 = JSON.parse(data);
    // setCurrentUserData(data1);
    setUsername(data1[0].name);
    setfavouriteUsers(JSON.parse(data));

  }
  async function getCurrentUserData(){
    
    let userData = await AsyncStorage.getItem("currentUserData");
    console.log("In a profile:" + userData);
    let data = JSON.parse(userData);
    setCurrentUserData(data);
  }
  useEffect(() => {
    getCurrentUserData();
    getLawyersData1();
    setFavouritesData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      
      {
        loading && <ActivityIndicator size={"small"} color={COLORS.black} />  
      }
      { lawyersData && (<Header lawyersData={lawyersData} currentUserData={ currentUserData } />)}
      {/* <ScrollView> */}
      <Text style={styles.textStyle}>Hello, { username || "" }</Text>
      <Text style={{ fontSize: 20, fontWeight: '400', marginLeft: 10 }}>Categories</Text>
      <Categories />
      {
        loading && <ActivityIndicator size={"small"} color={COLORS.black} />  
      }
      { lawyersData && <Lawyers lawyersData={lawyersData} loading={loading} getLawyersData1={getLawyersData1} currentUserData={currentUserData} />}
      {/* </ScrollView> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  textStyle: {
    fontSize: 27,
    paddingVertical: 10,
    fontWeight: '500',
    marginLeft: 10
  }
});

export default HomeScreen;