import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavouritesScreen from "../screens/FavouritesScreen";


const FavouriteScreenStack = createNativeStackNavigator();
function  FavouriteStack(){
    return(
        <FavouriteScreenStack.Navigator>
            <FavouriteScreenStack.Screen name='Favourite' component={FavouritesScreen} options={{
              headerShown: false,
            }}/>
        </FavouriteScreenStack.Navigator>
    );

}
export default FavouriteStack;