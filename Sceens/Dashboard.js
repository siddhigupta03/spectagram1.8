import React, { Component } from 'react';
import Draw from '../Nav/Draw';
import { NavigationContainer } from '@react-navigation/native';

export default class Dashboard extends Component{
    render() {
        return(
            <NavigationContainer>
                <Draw/>
            </NavigationContainer>
        )
    }
}