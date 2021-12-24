import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Loading from './Sceens/Loading';
import Login from './Sceens/Login';
import Dashboard from './Sceens/Dashboard';

import firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const AppSwitcher = createSwitchNavigator({
  'Loading':Loading,
  'Login':Login,
  'Dashboard':Dashboard
});

const AppCon = createAppContainer(AppSwitcher);

export default class App extends React.Component{
  render() {
    return <AppCon/>
  }
}