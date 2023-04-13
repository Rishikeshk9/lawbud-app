import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../components/constants";
import { AuthContext } from "../components/context";
import ChatStack from "../Stacks/ChatStack";
import FavouriteStack from "../Stacks/FavouriteStack";
import HomeStack from "../Stacks/HomeStack";
import NewsStack from "../Stacks/NewsStack";

const Tab = createBottomTabNavigator();
function Tabs() {
    const { usersType, setLawyerUser } = useContext(AuthContext);
    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        if (routeName == "Chat") {
            return false;
        }
        return true;
    }
    
    return (
        <Tab.Navigator
            initialRouteName="HomeScreen"
            screenOptions={{
                "tabBarShowLabel": false,
                "tabBarStyle": { backgroundColor: COLORS.black },
                "tabBarStyle": [
                    {
                        "display": "flex"
                    },
                    null
                ]
            }}



        >

            <Tab.Screen name="HomeScreen" component={HomeStack} options={({ route }) => ({
                headerShown: false,
                tabBarVisible: getTabBarVisibility(route),
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/Home.png")} style={{
                            tintColor: focused ? COLORS.black : COLORS.grey,
                            ...styles.imgStyle
                        }} />
                    </View>
                )
            })} />
            <Tab.Screen name="ChatScreen" component={ChatStack} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/messenger.png")} style={{
                            tintColor: focused ? COLORS.black : COLORS.grey,
                            ...styles.imgStyle
                        }} />
                    </View>
                )
            }} />
            <Tab.Screen name="NewsScreen" component={NewsStack} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/book.png")} style={{
                            tintColor: focused ? COLORS.black : COLORS.grey,
                            ...styles.imgStyle
                        }} />
                    </View>
                )
            }} />
            <Tab.Screen name="FavouriteScreen" component={FavouriteStack} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={styles.tabOption}>
                        <Image source={require("../assets/heart.png")} style={{
                            tintColor: focused ? COLORS.black : COLORS.grey,
                            ...styles.imgStyle
                        }} />
                    </View>
                )
            }} />

        </Tab.Navigator>
    );
}
const styles = StyleSheet.create({
    imgStyle: {
        width: 24,
        height: 24,
    },
    tabOption: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Tabs;