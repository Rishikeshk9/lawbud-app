import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewsAlertScreen from "../screens/NewsAlertsScreen";


const NewsStackScreen = createNativeStackNavigator();
function  NewsStack(){
    return(
        <NewsStackScreen.Navigator>
            <NewsStackScreen.Screen name='ChatsList' component={NewsAlertScreen} options={{
              headerShown: false,
            }}/>
        </NewsStackScreen.Navigator>
    );

}
export default NewsStack;