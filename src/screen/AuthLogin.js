import React, { useState } from 'react';
import {
    View,
    ImageBackground
} from 'react-native';

import {
    Text,
    Input,
    Button
} from 'react-native-elements'
import { useDispatch } from 'react-redux';
import { setAuth } from '../components/redux/actions/authAction';

const AuthLogin = () => {
    const dispatch = useDispatch()
    const [authData, setData] = useState({
        email: 'test@mail.com',
        password: '123456'
    })
    const textChangeInput = (val, type) => {
        setData({
            ...authData, [type]: val
        })
    }
    const loginButton = () => {
        dispatch(setAuth(true))
    }
    return (
        <ImageBackground
            source={require("../images/bg_auth.png")}
            resizeMode={'stretch'}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text h3 h3Style={{ marginBottom: 10, fontStyle: 'italic' }}>Coffee Project</Text>
            <Input
                placeholder={'Email'}
                leftIcon={{ type: 'ionicons', name: 'mail-outline' }}
                onChangeText={(val) => textChangeInput(val, 'email')}
                value={authData.email}
                disabled={true}
            />
            <Input
                placeholder={'Password'}
                leftIcon={{ type: 'ionicons', name: 'lock-outline' }}
                onChangeText={(val) => textChangeInput(val, 'password')}
                value={authData.password}
                secureTextEntry={true}
                disabled={true}
            />
            <Button
                title={'Guest Login'}
                buttonStyle={{ borderRadius: 5 }}
                onPress={loginButton}
            />
        </ImageBackground>
    )
}

export default AuthLogin