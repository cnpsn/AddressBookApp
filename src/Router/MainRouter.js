import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CustomizedTabbar from '../Components/CustomizedTabbar';
import FindMyFriendSc from '../Screens/FindMyFriendSc'
import EditPersonSc from '../Screens/EditPersonSc'
import AddPersonSc from '../Screens/AddPersonSc'
import SettingsSc from '../Screens/SettingsSc'
import PersonsSc from '../Screens/PersonsSc'
import MapSc from '../Screens/MapSc'


export default function MainRouter() {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    // tabBar={props => <CustomizedTabbar {...props} />}
    const BottomTab = () => {
        return (
            <Tab.Navigator screenOptions={{ headerShown: false }} >
                <Tab.Screen name="PersonsSc" component={PersonsSc} />
                <Tab.Screen name="FindMyFriendSc" component={FindMyFriendSc} />
                <Tab.Screen name="SettingsSc" component={SettingsSc} />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BottomTab" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="EditPersonSc" component={EditPersonSc} />
                <Stack.Screen name="AddPersonSc" component={AddPersonSc} />
                <Stack.Screen name="BottomTab" component={BottomTab} />
                <Stack.Screen name="MapSc" component={MapSc} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}