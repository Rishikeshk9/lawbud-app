import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";
import PersonalScreen from "./PersonalScreen";
import SkillScreen from "./SkillsScreen";
import DocumentsScreen from "./DocumentsScreen";
import UploadDataScreen from "./UploadDataScreen";

const RootStack = createNativeStackNavigator();
function RootStackScreen() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="SignIn" component={LoginScreen} options={{
        headerShown: false,
      }} />
      <RootStack.Screen name='Register' component={RegistrationScreen} options={{
        headerShown: false,
      }} />
      <RootStack.Screen name='Personal' component={PersonalScreen} options={{
        headerShown: false,
      }} />
      <RootStack.Screen name='Skills' component={SkillScreen} options={{
        headerShown: false,
      }} />
      <RootStack.Screen name='Documents' component={DocumentsScreen} options={{
        headerShown: false,
      }} />
      <RootStack.Screen name='UploadData' component={UploadDataScreen} options={{
        headerShown: false,
      }} />
    </RootStack.Navigator>
  );
}
export default RootStackScreen;