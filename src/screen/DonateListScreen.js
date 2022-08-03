import React, { useEffect } from 'react';
import {
    ImageBackground,
    FlatList,
    StyleSheet,
    View
} from 'react-native';
import {
    Text,
    Header,
    ListItem,
    Avatar
} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux';

const DonateListScreen = ({navigation}) => {
    const orderList = useSelector(state => state.orderReducer)
    console.log(orderList)
    const lists = [
        {
            name: 'Amy Farha',    
            coffee_name: 'Cappucino',
            price: 2.2
        },  
        {
            name: 'Chris Jackson',    
            coffee_name: 'Mocachino',
            price: 1.2
        },
    ]

    return(
            <ImageBackground
            style={{ flex: 1 }}
            source={require("../images/bg.jpg")}
            resizeMode="stretch"
        >
            <Header
                backgroundImage={require("../images/header.png")}
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => navigation.toggleDrawer() }} />
            <Text h2 h2Style={{ color: 'white', textAlign: 'center' }}> Order/Donation List</Text>
            <FlatList 
                keyExtractor={(item,index) => item.id}
                contentContainerStyle={styles.viewMenu}
                data={orderList}
                renderItem={(itemData) => (
                    <ListItem bottomDivider>
                        <Avatar
                        rounded
                        size="small"
                        overlayContainerStyle={{ backgroundColor: 'gray' }}
                        icon={{ name: 'person', color: 'white', type: 'Ionicons' }}
                        activeOpacity={0.7} />
                        {/* <View>
                            <Text>21</Text>
                            <Text>04</Text>
                        </View> */}
                        <ListItem.Content>      
                            <ListItem.Title>{itemData.item.customerName}</ListItem.Title>      
                            <ListItem.Subtitle>{itemData.item.productName}</ListItem.Subtitle>   
                        </ListItem.Content>    
                    <Text>{`$${itemData.item.productPrice}`}</Text>  
                    </ListItem>
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
        minHeight: '85%',
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})

export default DonateListScreen