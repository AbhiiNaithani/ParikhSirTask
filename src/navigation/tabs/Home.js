import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//Screens
import SearchDomains from '../screens/SearchDomains'
import AddDomains from '../screens/AddDomains'
import AddSubdomains from '../screens/AddSubdomains'

const Stack = createStackNavigator();

export default function Home() {
    return (
        <Stack.Navigator
            initialRouteName='SearchDomains'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='SearchDomains' component={SearchDomains} />
            {/* <Stack.Screen name='AddDomains' component={AddDomains} /> */}
            <Stack.Screen name='AddSubDomains' component={AddSubdomains} />
        </Stack.Navigator>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
})