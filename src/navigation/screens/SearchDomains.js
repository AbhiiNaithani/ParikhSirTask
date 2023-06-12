import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import HeaderBar from '../../components/HeaderBar'
import Heading from '../../components/Heading';
import Button from '../../components/Button';
import AddDomains from './AddDomains';

const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;

export default function SearchDomains({ navigation }) {
    const [domainsModalVisible, setDomainsModalVisible] = useState(false);

    function SearchDomainsHandler() {
        console.log('SearchDomainsHandler');
        // navigation.navigate('AddSubDomains')
        setDomainsModalVisible(!domainsModalVisible);
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar title={'Ask'} func={() => console.log('Go Back')} />
            <Heading />

            <Image source={require('../../../assets/background.png')} resizeMode={'contain'} style={styles.img} />

            <Button title={'Search for domains'} onPress={SearchDomainsHandler} />
            <AddDomains visible={domainsModalVisible} handler={SearchDomainsHandler} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    img: {
        width: wp * 0.74,
        height: hp * 0.55,
        alignSelf: 'center',

    }
})