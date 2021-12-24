import React, { Component } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("Dashboard");
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground 
        source={require('../assets/load.gif')}
        style={{width:RFValue(100), height:RFValue(100)}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
