import React, {Component} from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from "firebase";

import Create from '../Sceens/Create';
import Feed from '../Sceens/Feed';

const Tab = createMaterialBottomTabNavigator();

export default class TabNav extends Component {
    constructor(props) {
        super(props);
        this.state={
            light_theme: true,
            isUpdated: false
        }
    }
      renderFeed = props => {
        return <Feed setUpdateToFalse={this.removeUpdated} {...props}/>
      }
      renderStory = props => {
        return <Create setUpdateToTrue={this.changeUpdated} {...props}/>
      }
      changeUpdated = () => {
        this.setState({
          isUpdated: true
        });
      };
      removeUpdated = () => {
        this.setState({
          isUpdated: false
        });
      };
    fetchUser = () => {
        let theme;
        firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({ light_theme: theme === "light" })
        })
    }

    render() {
        return(
            <Tab.Navigator
                labeled={false}
                barStyle={this.state.light_theme ? styles.bottomTabStyleL : styles.bottomTabStyle}
                screenOptions= {({route}) => ({
                    tabBarIcon: ({focused, color, size}) =>{
                        let iconName;
                        if(route.name === 'Feed') {
                            iconName = focused
                            ? 'home'
                            : 'home-outline'
                        } else if(route.name === 'Create'){
                            iconName= focused? "add-circle":"add-circle-outline"
                        }
                        return(
                            <Ionicons name = {iconName} size={size} color={color}
                            style={styles.icons}/>
                        )
                    }
                }) }
                    
                    activeColor='red'
                    inactiveColor = 'grey' >
                    <Tab.Screen name='Feed' component={this.renderFeed} options={{unmountOnBlur: true }}/>
                    <Tab.Screen name='Create' component={this.renderStory} options={{unmountOnBlur: true }}/>
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    bottomTabStyle:{
        backgroundColor:'#2f345d',
        height:'8%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:'hidden',
        position:'absolute'
    },
    bottomTabStyleL:{
        backgroundColor:'#afbdef',
        height:'8%',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        overflow:'hidden',
        position:'absolute'
    },
    icons:{
        width:RFValue(30),
        height:RFValue(30),
    },
});