import React, { useEffect, useState } from 'react';
import {
  StyleSheet
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AuthLogin, DetailMenuScreen, FavoriteScreen, MainScreen, LoadingScreen, AllMenuScreen, DonateListScreen } from './src/screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './src/components';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { resetMenu, setMenu } from './src/components/redux/actions/menuAction'
import { withIAPContext } from 'react-native-iap';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={AuthLogin}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

const MainStack = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='home' color={color} size={size} />
          )
        }} />
      <Tab.Screen
        name='All Menu'
        component={AllMenuScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='book' color={color} size={size} />
          )
        }} />
      <Tab.Screen
        name='Favorite'
        component={FavoriteScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name='heart' color={color} size={size} />
          )
        }} />
        <Tab.Screen
        name='Donate'
        component={DonateListScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

const MainScreenApp = () => {
  return (
    <Stack.Navigator
      initialRouteName='Main Screen'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS
      }}
    >
      <Stack.Screen
        name='Main Screen'
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Detail Screen'
        component={DetailMenuScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

const App = () => {
  const [isLoading, setLoading] = useState(true)
  const isAuthenticated = useSelector(state => state.authReducer)
  const db = firestore();
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection('menu').get().then(qs => {
      dispatch(resetMenu())
      qs.forEach(async (doc, index) => {
        const fileName = doc.data().fileName
        const image = await storage().ref(fileName).getDownloadURL()
        dispatch(setMenu({
          id: doc.id,
          image: image,
          ...doc.data()
        }))
        if (index === qs.size - 1) {
          setLoading(false)
        }
      })
    })
  }, [])
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.mainContainer}>
        {isAuthenticated
          ?
          isLoading
            ?
            <LoadingScreen />
            :
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}
              screenOptions={{
                swipeEdgeWidth: 0
              }}
            >
              <Drawer.Screen
                name='MainDrawer'
                component={MainScreenApp}
                options={{
                  headerShown: false
                }}
              />
            </Drawer.Navigator>
          :
          <AuthStack />
        }
      </SafeAreaProvider>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'gray'
  },
})

export default withIAPContext(App);
