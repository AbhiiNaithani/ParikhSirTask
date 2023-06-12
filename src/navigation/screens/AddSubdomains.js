import { StyleSheet, Text, View, SafeAreaView, Dimensions, Pressable, ScrollView, LogBox } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import HeaderBar from '../../components/HeaderBar'
import Heading from '../../components/Heading';
import Icon from '@expo/vector-icons/Ionicons';
import AddDomains from './AddDomains';
import { SelectedDomains } from '../../store/state/Context';
import { colors } from '../../constants/color'
import { FlatList } from 'react-native';




const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;



export default function AddSubdomains({ route, navigation }) {
    const [domainsModalVisible, setDomainsModalVisible] = useState(false);
    const { selectedDomains, setSelectedDomains, selectedSubDomains, setSelectedSubDomains } = useContext(SelectedDomains);

    function DomainsHandler() {
        setDomainsModalVisible(!domainsModalVisible);
    }

    function deleteDomains(item) {
        const list = selectedDomains.filter((domain) => domain._id !== item._id);
        setSelectedDomains(list);
    }

    function subDomainsHandler(item) {
        const isPresent = selectedSubDomains.some(element => element._id === item._id);
        if (isPresent) {
            const list = selectedSubDomains.filter((domain) => domain._id !== item._id);
            setSelectedSubDomains(list);
        }
        else {
            setSelectedSubDomains((domains) => [...domains, item]);
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderBar title={'Ask'} func={() => navigation.goBack()} />
            <ScrollView nestedScrollEnabled={true}>
                <Heading />
                <Pressable style={styles.inputContainer} onPress={DomainsHandler}>
                    <Text style={styles.textInput}>{'Search domains here'}</Text>
                    <Icon name='search-outline' size={wp * 0.065} color={'black'} />
                </Pressable>
                <AddDomains visible={domainsModalVisible} handler={DomainsHandler} />
                <View style={styles.paddedContainer}>
                    <FlatList numColumns={2} keyExtractor={(item) => item._id} data={selectedDomains} renderItem={({ item, index }) => {
                        return (
                            <View style={[styles.chip, { backgroundColor: colors[index].backgroundColor }]}>
                                <Text style={styles.text}>{item.name}</Text>
                                <Pressable onPress={() => deleteDomains(item)}>
                                    <Icon name='close' color={'black'} size={wp * 0.055} />
                                </Pressable>
                            </View>
                        )
                    }} />
                </View>
                <View style={styles.paddedContainer}>
                    <Text style={styles.headingText}>{'Subdomains'}</Text>
                    {selectedDomains.map((item, index) => {
                        const color = colors[index];
                        return (<View style={{ marginTop: hp * 0.008 }} key={index}>
                            <FlatList numColumns={3} keyExtractor={(item) => item._id} data={item.domainTags} renderItem={({ item }) => {
                                const isSelected = selectedSubDomains.some(element => element._id === item._id);
                                return (
                                    <Pressable onPress={() => subDomainsHandler(item)} style={[styles.borderedChip, { backgroundColor: isSelected ? color.backgroundColor : 'white', borderColor: isSelected ? color.borderColor : 'white' }]}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </Pressable>

                                )
                            }} />
                        </View>
                        )
                    })}
                </View>
                <View style={{ padding: hp * 0.1 }} />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: wp * 0.96,
        height: hp * 0.055,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: wp * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp * 0.015,
        paddingHorizontal: wp * 0.04
    },
    textInput: {
        color: '#5B5B5B',
        fontSize: wp * 0.04,
        fontWeight: '500',
        width: wp * 0.8,
    },
    paddedContainer: {
        paddingHorizontal: wp * 0.03
    },
    chip: {
        padding: wp * 0.02,
        borderRadius: wp * 0.02,
        marginBottom: hp * 0.01,
        marginRight: wp * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        marginRight: wp * 0.03,
        fontSize: wp * 0.035,
        fontWeight: '500',
    },
    headingText: {
        fontSize: wp * 0.043,
        fontWeight: '600',
        marginVertical: hp * 0.018
    },
    borderedChip: {
        width: wp * 0.3,
        padding: wp * 0.012,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp * 0.02,
        marginRight: wp * 0.02,
        marginBottom: hp * 0.015,
        borderWidth: 2,

    }


})