import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import React from 'react'
import Icon from '@expo/vector-icons/Ionicons'

const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;

export default function HeaderBar({ title, func }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={func}>
                <Icon name='arrow-back' size={wp * 0.06} color={'black'} />
            </Pressable>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp,
        height: hp * 0.07,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: wp * 0.03,

    },
    text: {
        fontSize: wp * 0.046,
        fontWeight: '600',
        marginLeft: wp * 0.03
    }
})