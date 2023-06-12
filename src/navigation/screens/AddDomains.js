import { StyleSheet, Text, View, Modal, Dimensions, TextInput, FlatList, Pressable } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Icon from '@expo/vector-icons/Ionicons';
import { getDomains } from '../../store/actions/domains_action';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { SelectedDomains } from '../../store/state/Context';



const wp = Dimensions.get('window').width;
const hp = Dimensions.get('window').height;



export default function AddDomains({ visible, handler, }) {
    const [numberOfDomains, setNumberOfDomains] = useState(0);
    const [domains, setDomains] = useState([]);
    const [searchedDomain, setSearchedDomain] = useState([]);
    const [inputText, setInputText] = useState('');
    // const [selectedDomains, setSelectedDomains] = useState(selDomains ? [...selDomains] : []);
    const { selectedDomains, setSelectedDomains } = useContext(SelectedDomains);
    const navigation = useNavigation();

    function selectedDomainsHandler(item) {
        const isPresent = selectedDomains.some(element => element._id === item._id);
        if (isPresent) {
            const list = selectedDomains.filter((domain) => domain._id !== item._id);
            setSelectedDomains(list);
        }
        else if (selectedDomains.length <= 4) {
            setSelectedDomains((domains) => [...domains, item]);
        }
    }


    function AddSubDomainsHandler() {
        navigation.navigate('AddSubDomains', { domains: selectedDomains });
        handler();
    }

    async function getAllDomains() {
        const result = await getDomains();
        setDomains(result.data);
        setSearchedDomain(result.data);
        setNumberOfDomains(result.data.length);
        // console.log('domains: ', domains);
    }

    function onSearch(text) {
        if (text === '') {
            setSearchedDomain(domains);
        } else {
            const tempList = domains.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
            setSearchedDomain(tempList);
        }

    }

    const debounce = (func, timeout = 500) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }
    }
    const debouncedGetData = useMemo(() => {
        return debounce(onSearch, 500);
    }, [inputText])


    useEffect(() => {
        getAllDomains();
    }, []);

    return (
        <Modal
            transparent={true}
            animationType='slide'
            visible={visible}
            onRequestClose={handler}
        >
            <View style={styles.container}>
                <View style={styles.dash} />
                <View style={styles.horContainer}>
                    <Text style={styles.boldText}>{'Add Domains'}</Text>
                    <Pressable onPress={handler}>
                        <Icon name='close-outline' size={wp * 0.08} color={'black'} />
                    </Pressable>
                </View>
                <Text style={styles.lightText}>{'Please add at-least 2 amenities to proceed'}</Text>
                <View style={styles.inputContainer}>
                    <Icon name='search-outline' size={wp * 0.045} color={'#9B9B9B'} />
                    <TextInput
                        placeholder="Search domains here"
                        placeholderTextColor={'#9B9B9B'}
                        style={styles.textInput}
                        onChangeText={text => {
                            setInputText(text);
                            debouncedGetData(text);
                        }}
                        value={inputText}
                    />
                </View>
                <Text style={[styles.boldText, { fontSize: wp * 0.04 }]}>{`ALL `}<Text style={{ color: '#4A4A4A' }}>{`(${numberOfDomains})`}</Text></Text>
                <Text style={[styles.boldText, { fontSize: wp * 0.034, color: '#4A4A4A', marginVertical: hp * 0.01 }]}>{'TECHNOLOGY'}</Text>

                <FlatList
                    data={searchedDomain}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => {
                        const isSelected = selectedDomains.some(element => element._id === item._id);

                        return (
                            <Pressable style={styles.domainContainer} onPress={() => selectedDomainsHandler(item)}>
                                <Text>{item.name}</Text>
                                {isSelected ? (<Icon name='checkbox' size={wp * 0.05} color={'#467BFF'} />) : null}
                            </Pressable>
                        );
                    }}
                />
                {selectedDomains.length ? (<Button title={'Add subdomains'} onPress={AddSubDomainsHandler} />) : null}

            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'white',
        height: hp * 0.75,
        width: wp,
        borderTopRightRadius: wp * 0.04,
        borderTopLeftRadius: wp * 0.04,
        paddingHorizontal: wp * 0.03
    },
    dash: {
        width: wp * 0.11,
        height: hp * 0.006,
        backgroundColor: '#EBEBEB',
        alignSelf: 'center',
        marginVertical: hp * 0.012,
        borderRadius: wp * 0.01

    },
    horContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    boldText: {
        fontSize: wp * 0.05,
        fontWeight: '700',
    },
    lightText: {
        fontSize: wp * 0.035,
        fontWeight: '400'
    },
    inputContainer: {
        width: '100%',
        height: hp * 0.05,
        borderColor: '#DEDEDE',
        borderWidth: 1,
        borderRadius: wp * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp * 0.02,
        paddingHorizontal: wp * 0.015
    },
    textInput: {
        color: 'black',
        fontSize: wp * 0.03,
        fontWeight: '400',
        marginLeft: wp * 0.02,
        width: wp * 0.8,
    },
    domainContainer: {
        width: '96%',
        height: hp * 0.05,
        alignSelf: 'center',
        borderBottomColor: '#DEDEDE',
        borderBottomWidth: 1,
        marginTop: hp * 0.013,
        flexDirection: 'row',
        justifyContent: 'space-between',

    }
})