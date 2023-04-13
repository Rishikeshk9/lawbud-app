import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { LAWYERS, COLORS } from "../components/constants";
import Header from "../components/Header";
import image1 from "../assets/image.jpg";
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLawyersData } from "../Services/requests";

function FavouritesScreen(){
    const[favouritesData,setFavouritesData] = useState([]);
    const[loading,setLoading] = useState(false);
    const [ isFocused, setIsFocused ] = useState(useIsFocused());
    const[lawyersData,setLawyersData] = useState(null);
    let favouritesUserFiltered = [];
    const getUser = async () => {
        try {
            console.log("Get called...");
            setLoading(true);
          const savedUser = await AsyncStorage.getItem("favourites");
          if(savedUser==null)
          {
            return;
          }
          let data1 = JSON.parse(savedUser);
          console.log("Data:"+data1[0].userId);
        //   setFavouritesData(data1);
        let lawyersArray = await getLawyersData();
        lawyersArray = lawyersArray.data;
        // //   const savedAllUsers = await AsyncStorage.getItem("usersData");
        //   const favouriteUsers = JSON.parse(savedUser);
        //   console.log("Favoutirte users: "+  favouriteUsers[0].userId);
        //   setLawyersData(favouriteUsers);
          //   const allUsers = JSON.parse(savedAllUsers);
          setLawyersData(lawyersArray.filter(( item )=>{
            // console.log(item.userType);
            return item.type === "lawyer";
          }));
            // console.log("All:"+ data1.includes({ userId: "tW_EaVsJ" }));
          let i = 0;
          lawyersArray.forEach((item,index)=>{
              
              if(data1.some(item1 => item1.userId === item.user_id))
              {
                  
                  favouritesUserFiltered.push(item);
                  i++;
                }
                
            });
            setFavouritesData(favouritesUserFiltered);
            setLoading(false);
            return favouritesUserFiltered;
        } catch (error) {
          console.log("Error:"+error);
        }
      };
    useEffect(()=>{

        getUser();
        // console.log("Favorites123:"+favouritesData);
    },[ isFocused ]);

    return(
        <View style={styles.container}>
            <Header headerText={"Favourites"} />
            {/* {
                loading && <ActivityIndicator size={"small"} color={COLORS.black} ></ActivityIndicator>} */}
                {
                    favouritesData && <FlatList
                    data={favouritesData}
                    style={styles.listStyle}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getUser} />}
                    renderItem={({ item, index }) => (
                        // <Text>{item.userId }</Text>
                        <Card name={item?.name} type={item?.type} languages={item?.languages || ["Marathi","Hindi","English"]} profile_image={item.profile_image} experience={item?.experience || 0 } key={index} />
                        )}
                        keyExtractor={({ item, index }) => index}
                        />
                    }
                    
                
        </View>
    );
}
function Card({ name, type, languages, profile_image, experience }) {
    const navigation = useNavigation();
    console.log(experience);
    
    return (
        <View style={{elevation: 2, borderRadius: 7, marginTop: 10, marginRight: 10, overflow: 'hidden' }} >
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                navigation.navigate('About',{
                    name,
                    type,
                    languages,
                    experience
                });
            }} >

            <Image
                source={{
                    uri: profile_image
                }}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity>
                        <AntDesign name="hearto" size={21} color={COLORS.red} />
                        {/* <AntDesign name="heart" size={21} color={COLORS.red} /> */}
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
                    <View style={{ flexDirection: 'row' }} >
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                        <TouchableOpacity><AntDesign name="staro" size={20} color={COLORS.gray} /></TouchableOpacity>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgStyle: {
        width: 110,
        height: 110,
        // borderWidth: 5,
        aspectRatio: 1/1,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle: {
        marginLeft: 10
    }
});
export default FavouritesScreen;