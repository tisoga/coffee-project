import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

import {
    Header,
    SearchBar,
    Text
} from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { useIAP } from 'react-native-iap';
import { chooseMenu } from '../components/redux/actions/buyAction';
import { setOrderList } from '../components/redux/actions/orderAction';

const MenuContainer = ({ title, data, navigation }) => {
    const listMenu = [];
    const dispatch = useDispatch()
    let titleText = ''
    data.forEach(menu => {
        if (menu[title]) {
            listMenu.push(menu)
        }
    });
    if (title === 'bestSales') {
        titleText = `Best Sales`
    }
    else if (title === 'newProduct') {
        titleText = `${listMenu.length} New Product`
    }

    const moveToScreen = (itemData) => {
        // console.log(itemData)
        dispatch(chooseMenu(itemData))
        navigation.navigate('Detail Screen')
    }

    return (
        <View style={styles.titleHeader}>
            <Text h4 style={{ marginVertical: 10, marginHorizontal: 20 }}>{titleText}</Text>
            <FlatList
                data={listMenu}
                horizontal={true}
                keyExtractor={(item, index) => item.id}
                renderItem={(itemData) => (
                    <View style={{ backgroundColor: 'gray', flex: 1, flexDirection: 'row', }}>
                        <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
                            <TouchableOpacity
                                style={{ borderWidth: 1, height: 150, width: 150, borderRadius: 5 }}
                                activeOpacity={0.5}
                                onPress={() => moveToScreen(itemData.item)}>
                                <Image
                                    style={{ height: 117 }}
                                    source={{
                                        uri: itemData.item.image,
                                    }}
                                />
                                <View style={{ borderTopWidth: 1, backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
                                    <Text h4
                                        style={{ textAlign: 'center' }}
                                        adjustsFontSizeToFit
                                        numberOfLines={1}>{itemData.item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const MainScreen = ({ navigation }) => {
    const listMenu = useSelector(state => state.menuReducer)
    const {
        connected,
        currentPurchase,
        currentPurchaseError,
        finishTransaction,
        getProducts,
    } = useIAP();
    const dispatch = useDispatch()
    const productData = useSelector(state => state.buyReducer)
    const db = firestore()
    const donatorRef = db.collection('donator').orderBy('purchaseTime', 'asc')

    useEffect(() => {
        donatorRef.onSnapshot(qs => {
            const lists = []
            qs.forEach(doc => {
                const {customerName, productName, productPrice} = doc.data()
                lists.push({
                    id: doc.id,
                    customerName: customerName,
                    productName: productName,
                    productPrice: productPrice
                })
            })
            dispatch(setOrderList(lists))
        })
    },[])

    useEffect(() => {
        if (connected) {
            const itemSKU = []
            listMenu.forEach((item) => {
                itemSKU.push(item.id.toLowerCase())
            })
            getProducts(itemSKU)
        }
    }, [getProducts]);

    useEffect(() => {
        // console.log(currentPurchaseError)
        const checkCurrentPurchase = async (purchase) => {
            if (purchase) {
                let receipt = await purchase.transactionReceipt;
                // console.log(typeof receipt)
                // console.log(productData)
                if (receipt) {
                    receipt = JSON.parse(receipt)
                    const customerData = {
                        orderId: receipt.orderId,
                        productId: productData.id,
                        customerName: productData.customer,
                        productName: productData.name,
                        productPrice: productData.price,
                        purchaseTime: new Date(receipt.purchaseTime),
                        purchaseToken: receipt.purchaseToken
                    }
                    // console.log(customerData)
                    try {
                        const ackResult = await finishTransaction(purchase, true);
                        const docRef = await db.collection('donator').add(customerData)
                        Alert.alert('Success', 'Your Order is Completed, Check Your Order in Order list Menu.')
                        // console.log('ackResult', ackResult);
                    } catch (ackErr) {
                        Alert.alert('Warning','Something Wrong, Please Try Again!')
                        // console.warn('ackErr', ackErr);
                    }
                }
            }
        };
        checkCurrentPurchase(currentPurchase);
    }, [currentPurchase, finishTransaction]);

    return (
        <ScrollView stickyHeaderIndices={[0]} style={{backgroundColor: 'white'}}>
            <Header
                backgroundImage={require("../images/header.png")}
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => navigation.toggleDrawer() }} />
            <View style={styles.imageHeaderContainer}>
                <ImageBackground source={require("../images/coffe.jpg")} resizeMode={'cover'} style={{ width: '100%', height: '110%', }} blurRadius={3}>
                    <Text h3 h3Style={{ color: 'white', textAlign: 'center', top: 58 }}>Coffe Shop</Text>
                </ImageBackground>
            </View>
            {/* <SearchBar
                containerStyle={{ backgroundColor: 'transparent', marginTop: -40, borderBottomWidth: 0, borderTopWidth: 0, marginHorizontal: '10%' }}
                inputContainerStyle={{ backgroundColor: 'white', borderRadius: 10 }}
            /> */}
            <MenuContainer title={'bestSales'} data={listMenu} navigation={navigation} />
            <MenuContainer title={'newProduct'} data={listMenu} navigation={navigation} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    imageHeaderContainer: {
        height: 200,
    },
    titleHeader: {
        height: 230,
        backgroundColor: 'white',
    },
})

export default MainScreen