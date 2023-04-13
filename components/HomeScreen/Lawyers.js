import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { COLORS, LAWYERS } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLawyersData } from "../../Services/requests";
import { AuthContext } from "../context";

function Lawyers({lawyersData, loading, getLawyersData1, currentUserData }) {
    const navigation = useNavigation();
    let[favouriteLawyers,setFavouriteLawyers] = useState([]);
    const { favouriteUsers, setFavouriteUsers } = useContext(AuthContext);
    // const[ lawyersData, setLawyersData ] = useState(null);
    // async function getLawyersData1(){
    //    await  AsyncStorage.setItem("favourites",JSON.stringify([]));
    //     const lawyersArray = await getLawyersData();
    //     // console.log(lawyersArray);
    //     setLawyersData(lawyersArray.filter(( item )=>{
    //         // console.log(item.userType);
    //         return item.userType === "lawyer";
    //     }));
    // }
    async function getFavouritesLawyers(){
        const data = await AsyncStorage.getItem("favourites");
        setFavouriteLawyers(JSON.parse(data));

    }
    useEffect(()=>{
        // getLawyersData1();
        getFavouritesLawyers();
        console.log(lawyersData.length);
    },[]);
    return (
        <View style={{ flex: 1, marginTop: 10 }} >
            {
                lawyersData && 
                (<FlatList
                    data={ lawyersData }
                    style={styles.listStyle}
                    refreshControl={<RefreshControl refreshing={loading} onRefresh={getLawyersData1} />}
                    renderItem={({ item, index }) => (
                        <Card name={item.name} type={item.type} userId={item.user_id} contact={item.contact} imgSrc={item.profile_image} languages={item?.user_law_data?.languages||["Marathi","Hindi","English"]} reviews={ item.reviews } experience={item?.user_law_data?.experience.experience||0} key={index} currentUserData={currentUserData} favouriteLawyers={favouriteLawyers} setFavouriteLawyers={setFavouriteLawyers} lawyersData={ lawyersData } />
                        )}
                    keyExtractor={({ item, index }) => index}
                />)
                    }
            {/* <ActivityIndicator size={"large"} color={COLORS.secondary} /> */}
            
            {/* <TouchableOpacity onPress={()=>{
                navigation.navigate("Register");
            }}  >
                <Text>Go to Registration</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                navigation.navigate("Login");
            }}  >
                <Text>Go to Login</Text>
            </TouchableOpacity> */}
        </View>
    );
}
function Card({ name, userId, type, imgSrc, contact, languages, reviews, experience, currentUserData, favouriteLawyers, setFavouriteLawyers, lawyersData }) {
    const navigation = useNavigation();
    const [ users,setUsers ] = useState([]);
    let favoritesArray = [];
    // console.log(experience);
    const elementRemove = ( userId )=>{
        return users?.filter((ele)=>{
            return ele.userId === userId;
        });
    }
    const storeUser = async (userId) => {
            console.log("Store function called...");

            const value = {
              "userId": `${userId}` 
            };
            let response = false;
            favouriteLawyers.some(item=>{
                if( item.userId === userId)
                {
                    console.log("Item matched..." + item.userId + " "+ userId);
                //    favoritesArray = elementRemove( favoritesArray, item);
                   setFavouriteLawyers(( arr1 )=>{
                    return arr1.filter((ele)=>{
                        return ele.userId !== item.userId;
                    });
                   });
                   
                   console.log("Array:"+ JSON.stringify(favouriteLawyers));
                   response = true;
                //    return;
                }
            });
            if(response===true)
            {
                console.log("Response");
                await AsyncStorage.setItem("favourites", JSON.stringify(favouriteLawyers));
                response = false;
                AsyncStorage.getItem("favourites").then((cc,error)=>{

                    console.log("Favourites12: "+cc);
                });
                return;
            }
            else{

                favoritesArray = [...favouriteLawyers,value];
                setFavouriteLawyers(favoritesArray);
                try {
                  await AsyncStorage.setItem("favourites", JSON.stringify(favoritesArray));
                  AsyncStorage.getItem("favourites").then((cc,error)=>{
        
                      console.log("Favourites1: "+cc);
                  });
                } catch (error) {
                  console.log(error);
                }
            }
      };
      const userFavoriteOrNot = ( userId )=>{
        let response = users?.some(item=>{
            return item.userId === userId;
        });
        console.log("HI there how are you: "+response+" "+userId);
        return response;
      }
    const getUser = async () => {
        try {
          const savedUsers = await AsyncStorage.getItem("favourites");
          const favouriteUsers = JSON.parse(savedUsers);
          setUsers(favouriteUsers);
        //   console.log(currentUser[0][0]);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(()=>{
          getUser();
    },[]);
    
    return (
        <View style={{elevation: 2, borderRadius: 7, marginBottom: 10, marginRight: 10, overflow: 'hidden' }}>
            <View style={{flex:1, justifyContent: 'center', backgroundColor: COLORS.white}} >
                
            
            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{
                navigation.navigate('About',{
                    name,
                    currentUserId: currentUserData[0].user_id,
                    userId,
                    imgSrc,
                    contact,
                    type,
                    languages,
                    experience,
                    reviews,
                    currentUserData
                });
            }} >

            <Image
                source={{
                    uri: imgSrc
                }}
                style={styles.imgStyle}
                />
            <View style={{ flex: 1, marginLeft: 10, justifyContent: 'center' }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 10 }} >
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >{name}</Text>
                    <TouchableOpacity onPress={()=>{
                        storeUser(userId);
                        elementRemove(userId);
                    }} >
                        {
                            userFavoriteOrNot(userId) ?
                            <AntDesign name="hearto" size={21} color={COLORS.red} />
                            :
                            <AntDesign name="hearto" size={21} color={COLORS.gray} />
                        }
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
                    <Text style={{ color: COLORS.gray }}>Exp: {experience}yrs</Text>
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
    imgStyle: {
        width: 110,
        height: 110,
        aspectRatio: 1/1,
        borderColor: COLORS.black,
        resizeMode: "cover",
    },
    listStyle: {
        marginLeft: 10
    }
});
export default Lawyers;