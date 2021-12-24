import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home2 from '../Nav/TabNav'
import StoryScreen from '../Sceens/PostScreen'

const Stack = createStackNavigator()

const StackNav = () => {
return <Stack.Navigator 
        initialRouteName='Home2'
        screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home2' component={Home2}/>
        <Stack.Screen name='PostScreen' component={StoryScreen}/>
    </Stack.Navigator>
}

export default StackNav;