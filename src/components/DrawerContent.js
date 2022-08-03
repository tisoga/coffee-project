import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';

import {
    Avatar,
    Text,
    Divider
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { setAuth } from './redux/actions/authAction';

const DrawerContent = (props) => {
    const dispatch = useDispatch()
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
                <View style={styles.profileView}>
                    <Avatar
                        rounded
                        size="medium"
                        overlayContainerStyle={{ backgroundColor: 'black' }}
                        icon={{ name: 'person', color: 'white', type: 'Ionicons' }}
                        onPress={() => console.log("Works!")}
                        activeOpacity={0.7} />
                    <View style={{ marginHorizontal: 25 }}>
                        <Text h4>Test User</Text>
                        <Text style={{ fontSize: 15, color: 'gray' }}>testuser@mail.com</Text>
                    </View>
                </View>
                <Divider />
                <View style={styles.drawerItemView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Home')}
                        style={styles.drawerItem}>
                        <Icon
                            name='home'
                            size={30}
                            color={'gray'}
                            style={{ marginTop: 5 }}
                        />
                        <Text style={styles.textDrawerItem}>Home</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Favorite')}
                        style={styles.drawerItem}>
                        <Icon
                            name='heart'
                            size={30}
                            color={'gray'}
                            style={{ marginTop: 5 }}
                        />
                        <Text style={styles.textDrawerItem}>Favorite</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('All Menu')}
                        style={styles.drawerItem}>
                        <Icon
                            name='book'
                            size={30}
                            color={'gray'}
                            style={{ marginTop: 5 }}
                        />
                        <Text style={styles.textDrawerItem}>All Menu</Text>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => props.navigation.navigate('Donate')}
                        style={styles.drawerItem}>
                        <Icon
                            name='cafe'
                            size={30}
                            color={'gray'}
                            style={{ marginTop: 5 }}
                        />
                        <Text style={styles.textDrawerItem}>Order List</Text>
                    </TouchableOpacity>
                    <Divider />
                </View>
                <Divider />
                <View style={styles.drawerBottomView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => dispatch(setAuth(false))}
                        style={styles.drawerItem}>
                        <Icon
                            name='log-out'
                            size={30}
                            color={'white'}
                            style={{ marginTop: 8 }}
                        />
                        <Text style={[styles.textDrawerItem, { color: 'white' }]}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 10
    },
    drawerItemView: {
        flex: 1
    },
    drawerBottomView: {
        backgroundColor: 'black'
    },
    drawerItem: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 2
    },
    textDrawerItem: {
        fontSize: 29, 
        marginHorizontal: 10, 
        marginTop: 2
    }
})

export default DrawerContent