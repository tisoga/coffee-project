import React, { useEffect, useState } from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    Header,
    Text
} from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux';
import { chooseMenu } from '../components/redux/actions/buyAction';

const FavoriteScreen = ({ navigation }) => {
    const menuList = useSelector(state => state.menuReducer)
    const favoriteList = useSelector(state => state.favoriteReducer)
    const [filterList, setFilter] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const newList = []
        favoriteList.forEach(id => {
            const menu = menuList.find(x => x.id === id)
            newList.push(menu)
            // console.log(filterList)
        });
        setFilter(newList)
    }, [favoriteList])

    const moveToScreen = (itemData) => {
        // console.log(itemData)
        dispatch(chooseMenu(itemData))
        navigation.navigate('Detail Screen')
    }

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={require("../images/bg.jpg")}
            resizeMode="stretch"
        >
            <Header
                backgroundImage={require("../images/header.png")}
                leftComponent={{
                    icon: 'menu', color: '#fff', iconStyle: { color: '#fff' },
                    onPress: () => navigation.toggleDrawer()
                }} />
            <Text h2 h2Style={{ color: 'white', textAlign: 'center' }}> Favorite Menu</Text>
            <FlatList
                data={filterList}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.viewMenu}
                numColumns={2}
                renderItem={(itemData) => (
                    <TouchableOpacity
                        style={{ borderWidth: 1, height: 160, width: '48%', marginHorizontal: 3, marginVertical: 2 }}
                        activeOpacity={0.8}
                        onPress={() => moveToScreen(itemData.item)}>
                        <View style={{ height: '80%', width: '100%', }}>
                            <Image
                                style={{ height: '100%', width: '100%' }}
                                resizeMode={'stretch'}
                                source={{
                                    uri: itemData.item.image,
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text
                                style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}
                                adjustsFontSizeToFit
                                numberOfLines={1}>{itemData.item.name}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    viewMenu: {
        // flex: 1,
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'center',
        minHeight: '80%',
        // maxHeight: '100%',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default FavoriteScreen