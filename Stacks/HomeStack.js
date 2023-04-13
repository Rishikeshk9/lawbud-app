import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS } from "../components/constants";
import AboutScreen from "../screens/AboutScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatsListScreen from "../screens/ChatsListScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HomeScreen from "../screens/HomeScreen";
import NewsAlertScreen from "../screens/NewsAlertsScreen";
import CustomDrawer from "../components/CustomDrawer";
import ProfileScreen from "../screens/ProfileScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import LoginScreen from "../screens/LoginScreen";
import PersonalScreen from "../screens/PersonalScreen";
import SkillScreen from "../screens/SkillsScreen";
import DocumentsScreen from "../screens/DocumentsScreen";
import LawyersDashboardScreen from "../screens/LawyersDashboardScreen";
import { useContext } from "react";
import { AuthContext } from "../components/context";
import LawyersProfileScreen from "../screens/LawyersProfileScreen";
import UploadDataScreen from "../screens/UploadDataScreen";

const HomeScreenStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerStack() {
  return (
    <Drawer.Navigator initialRouteName="Home1" drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: COLORS.purple,
      drawerActiveTintColor: COLORS.white,
      drawerInactiveTintColor: COLORS.black,
      drawerLabelStyle: {
        marginLeft: 0
      }

    }} >
      <Drawer.Screen name="Home " component={HomeScreen} />
      {/* <Drawer.Screen name="Feedback" component={HomeScreen} /> */}
      {/* <Drawer.Screen name="Contact us" component={HomeScreen} /> */}
      <Drawer.Screen name="Privacy Policy" component={HomeScreen} />

    </Drawer.Navigator>
  );
}
function DrawerStackLawyers() {
  return (
    <Drawer.Navigator initialRouteName="Home1" drawerContent={(props) => <CustomDrawer {...props} />} screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: COLORS.purple,
      drawerActiveTintColor: COLORS.white,
      drawerInactiveTintColor: COLORS.black,
      drawerLabelStyle: {
        marginLeft: 0
      }

    }} >
      <Drawer.Screen name="Home " component={LawyersDashboardScreen} />
      {/* onPress={()=>{
        Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
        title="support@example.com"
      }} */}
      {/* <Drawer.Screen name="Feedback" component={LawyersDashboardScreen} /> */}
      {/* <Drawer.Screen name="Contact us" component={LawyersDashboardScreen} /> */}
      <Drawer.Screen name="Privacy Policy" component={LawyersDashboardScreen} />

    </Drawer.Navigator>
  );
}

function HomeStack() {

  const { usersType } = useContext(AuthContext);
  return (
    <HomeScreenStack.Navigator>
      {
        usersType === "user" ?
          <HomeScreenStack.Screen name='Home' component={DrawerStack} options={{
            headerShown: false,
          }} />
          : <HomeScreenStack.Screen name='LawyersDashboard' component={DrawerStackLawyers} options={{
            headerShown: false,
          }} />
      }
      <HomeScreenStack.Screen name='About' component={AboutScreen} options={{
        headerShown: false,
      }} />

      <HomeScreenStack.Screen name='Favourite' component={FavouritesScreen} options={{
        headerShown: false,
      }} />
      <HomeScreenStack.Screen name='ChatsList' component={ChatsListScreen} options={{
        headerShown: false,
      }} />
      <HomeScreenStack.Screen name='Chat' component={ChatScreen} options={{
        headerShown: false,
      }} />
      <HomeScreenStack.Screen name='NewsAlert' component={NewsAlertScreen} options={{
        headerShown: false,
      }} />
      {
        usersType === "user" ?
          <HomeScreenStack.Screen name='Profile' component={ProfileScreen} options={{
            headerShown: false,
          }} />
          :
          <HomeScreenStack.Screen name='LawyersProfile' component={LawyersProfileScreen} options={{
            headerShown: false,
          }} />
      }

    </HomeScreenStack.Navigator>
  );

}
export default HomeStack;