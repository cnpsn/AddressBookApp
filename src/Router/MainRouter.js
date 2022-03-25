import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PersonsSc from '../Screens/PersonsSc'
import FindMyFriendSc from '../Screens/FindMyFriendSc'
import SettingsSc from '../Screens/SettingsSc'
import CustomizedTabbar from '../Components/CustomizedTabbar';


export default function MainRouter() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    const BottomTab = () => {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <CustomizedTabbar {...props} />}>
                <Tab.Screen name="PersonsSc" component={PersonsSc} />
                <Tab.Screen name="FindMyFriendSc" component={FindMyFriendSc} />
                <Tab.Screen name="SettingsSc" component={SettingsSc} />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BottomTab" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="BottomTab" component={BottomTab} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}