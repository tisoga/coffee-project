import React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    Button
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { resetMenu, setMenu } from '../components/redux/actions/menuAction'
const LoadingScreen = () => {
    const listMenu = useSelector(state => state.menuReducer)
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <ActivityIndicator
                size={'large'}
                color={'blue'}
            />
            <Text style={{ fontSize: 20, marginTop: 10, fontStyle: 'italic' }}>Please wait....</Text>
            {/* <Button
                title='test'
                onPress={() => console.log(listMenu)}
            /> */}
        </View>
    )
}

export default LoadingScreen