import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'

const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;

export default function Heading() {
    const heading = `Let's dig deeper into your requirements`;
    const title = 'Domain';
    const titleText = 'Please select min. 1 and max. 5 domains';

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>{heading}{'\n'}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.titleText}>{titleText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 0.155 * hp,
        width: wp,
        padding: wp * 0.03

    },
    heading: {
        marginTop: hp * 0.01,
        fontSize: wp * 0.04,
        fontWeight: '600',
    },
    title: {
        fontSize: wp * 0.043,
        fontWeight: '600',
    },
    titleText: {
        fontSize: wp * 0.035,
        fontWeight: '400'
    }
})