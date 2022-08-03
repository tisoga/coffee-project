import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import {
    ImageBackground,
} from 'react-native';
import {
    Button,
    Header,
    Text,
    Input
} from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { requestPurchase, useIAP } from 'react-native-iap';
import { addFavorite, removeFavorite } from '../components/redux/actions/favoriteAction';
import { setCustomer } from '../components/redux/actions/buyAction';


const DetailMenuScreen = ({ navigation }) => {
    const { id, name, price, image, customer } = useSelector(state => state.buyReducer)
    const [customerName, setCustomerName] = useState(customer)
    const [errorMsg, setErrorMSg] = useState('')
    const [isModalVisible, setModalVisible] = useState(false)
    const favoriteList = useSelector(state => state.favoriteReducer)
    const dispatch = useDispatch()
    const db = firestore()
    // console.log(itemData)
    const btnFavorite = () => {
        const newList = [...favoriteList]
        if (favoriteList.includes(id)) {
            const index = newList.indexOf(id)
            if (index !== -1) {
                newList.splice(index, 1)
            }
            dispatch(removeFavorite(newList))
        }
        else {
            newList.push(id)
            dispatch(addFavorite(newList))
        }
    }
    const buyCoffee = () => {
        if(customerName){
            setModalVisible(false)
            setErrorMSg('')
            dispatch(setCustomer(customerName))
            const initiatePurchase = async() => {
                try {
                    await requestPurchase(id.toLowerCase())
                }
                catch (err) {
                    console.log(err)
                }
            }
            Alert.alert(
                'Warning',
                'If you completed this order, you will donate the money for developer of this app.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('test'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => initiatePurchase()
                    }
                ])
            }
        else{
            setErrorMSg('Please Input Your Name First.')
        }
        
    }
    return (
        <>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={{height: 170, backgroundColor: 'white'}}>
                    <Text h3 h3Style={{textAlign: 'center'}}>What is Your Name?</Text>
                    <Input 
                        placeholder={'Insert Your Name'}
                        value={customerName}
                        onChangeText={(val) => setCustomerName(val)} 
                        errorMessage={errorMsg}
                    />
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Button
                            title={'Cancel'}
                            type={'solid'}
                            buttonStyle={{backgroundColor: 'red', marginRight: 10}}                        
                            onPress={() => setModalVisible(false)}/>
                        <Button
                            title={'Confirm'}
                            type={'solid'}
                            buttonStyle={{backgroundColor: 'green', marginRight: 10}}
                            onPress={() => buyCoffee()}
                        />
                    </View>
                </View>
            </Modal>
            <Header
                backgroundImage={require("../images/header.png")}
                leftComponent={{
                    icon: 'arrow-back',
                    color: '#fff',
                    iconStyle: { color: '#fff' },
                    onPress: () => navigation.goBack()
                }} />
            <ImageBackground
                source={{ uri: image }}
                resizeMode='stretch'
                style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ backgroundColor: 'white', marginTop: '15%', marginHorizontal: '10%', borderRadius: 10 }}>
                    <Text h3 adjustsFontSizeToFit
                        style={{ textAlign: 'center' }}
                        numberOfLines={2}>{name}</Text>
                </View>
                <View style={{ marginBottom: '6%' }}>
                    <View style={{ marginHorizontal: '20%', backgroundColor: 'white', borderRadius: 10 }}>
                        <Text h3 adjustsFontSizeToFit
                            h3Style={{ textAlign: 'center' }}
                            numberOfLines={2}>{`Price : $${price}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-evenly' }}>
                        {favoriteList.includes(id)
                            ?
                            <Button
                                title={'Remove from Favorite'}
                                titleStyle={{ fontSize: 13 }}
                                type={'solid'}
                                buttonStyle={{ backgroundColor: 'blue' }}
                                onPress={() => btnFavorite()}
                                icon={
                                    <Icon
                                        name="close-circle" size={20} color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                }
                            />
                            :
                            <Button
                                title={'Add to Favorite'}
                                type={'solid'}
                                buttonStyle={{ backgroundColor: 'red' }}
                                onPress={() => btnFavorite()}
                                icon={
                                    <Icon
                                        name="heart" size={20} color="white"
                                        style={{ marginRight: 5 }}
                                    />
                                }
                            />
                        }
                        <Button
                            title={'Buy'}
                            type={'solid'}
                            buttonStyle={{ width: 160, backgroundColor: 'green' }}
                            onPress={() => setModalVisible(true)}
                            icon={
                                <Icon
                                    name="checkbox" size={20} color="white"
                                    style={{ marginRight: 5 }}
                                />
                            }
                        />
                    </View>
                </View>
            </ImageBackground>
        </>
    )
}

export default DetailMenuScreen