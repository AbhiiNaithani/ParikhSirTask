import { StyleSheet, Text, Dimensions } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'

const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;


export default function Button({ title, onPress }) {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        height: hp * 0.075,
        width: wp * 0.94,
        marginVertical: hp * 0.02,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#467BFF',
        borderRadius: wp * 0.02
    },
    text: {
        color: 'white',
        fontSize: wp * 0.04,
        fontWeight: '600',
    }

})