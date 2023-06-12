import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'

//tabs
import Home from './tabs/Home'
import Explore from './tabs/Explore'
import Create from './tabs/Create'
import Profile from './tabs/Profile'

const Tab = createBottomTabNavigator();
const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;

export default function MainContainer() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName='Home'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let icon;
                        let rn = route.name;
                        if (rn === 'Home') {
                            icon = 'home-variant';
                        }
                        else if (rn === 'Explore') {
                            icon = 'view-grid';
                        }
                        else if (rn === 'Create') {
                            icon = 'plus-box';
                        }
                        else if (rn === 'Profile') {
                            icon = 'account';
                        }
                        return <Icon name={icon} size={size} color={color} />;
                    },
                    headerShown: false,
                    tabBarStyle: [
                        { height: hp * 0.1, paddingVertical: hp * 0.02 }

                    ],
                    tabBarLabelStyle: [
                        {
                            fontSize: wp * 0.032,
                            paddingBottom: hp * 0.02
                        }
                    ],
                    tabBarActiveTintColor: '#467BFF',
                    tabBarInactiveTintColor: '#545454',


                })}


            >
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Explore' component={Explore} />
                <Tab.Screen name='Create' component={Create} />
                <Tab.Screen name='Profile' component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({

})