import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Platform, StatusBar, SafeAreaView } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard'
import firebase from "firebase";

let Stories = require('./Temp_stories.json');

let customFonts = {
    "Bubble-Sans": require('../assets/fonts/BubblegumSans-Regular.ttf')
};

export default class Feed extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false,
            light_theme: true,
            stories: []
        }
    }
    async _loadFontsAsync () {
        await Font.loadAsync(customFonts);
        this.setState({
            fontsLoaded:true
        })
    }
    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
        this.fetchStories();
    }

    fetchStories = () => {
        firebase
        .database()
        .ref("/posts/")
        .on(
          "value",
          snapshot => {
            let stories = [];
            if(snapshot.val()) {
              Object.keys(snapshot.val()).forEach(function(key) {
                stories.push({
                  key:key,
                  value: snapshot.val()[key]
                })
              }) 
            }
            this.setState({
              stories:stories
            })
            this.props.setUpdateToFalse()
          },
          function(errorObject) {
            console.log("the read failed"+ errorObject.code)
          }
        );
      }

    renderItem=({ item: story })=>{
        return <PostCard story={story} navigation={this.props.navigation}/>
    }
    keyExtractor = (item, index) => index.toString();

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
        if(!this.state.fontsLoaded) {
            return <AppLoading/>
        }
        else{
            return(
                <View style={this.state.light_theme ? styles.conLight : styles.con}>
                    <SafeAreaView style={styles.droide} />
                    <View style={styles.appTit}>
                        <View style={styles.appIcon}>
                            <Image 
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                             />
                        </View>
                        <View style={styles.appTitCon}>
                            <Text style={this.state.light_theme ? styles.appTitConTextLight : styles.appTitConText}>Spectagram</Text>
                        </View>
                    </View>

                    { !this.state.stories[0]? (
                        <View style={styles.noStoriesV}>
                            <Text style={this.state.light_theme ? styles.noStoriesL : styles.noStoriesT }>
                                No Stories Available
                            </Text>
                        </View>
                    ) :

                    <View style={styles.flatList}>
                        <FlatList
                            keyExtractor={this.keyExtractor}
                            data={Stories}
                            renderItem={this.renderItem}
                            horizontal={true}
                        />
                    </View>
                    }   
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    con:{
        flex:1,
        backgroundColor:'#000'
    },
    conLight:{
        flex:1,
        backgroundColor:'#fff'
    },
    droide:{
        marginTop: Platform.OS === 'android'? StatusBar.currentHeight:RFValue(35)
    },
    appTit:{
        flex:0.07,
        flexDirection:'row'
    },
    appIcon:{
        flex:0.2,
        justifyContent:'center',
        alignItems:'center'
    },
    logo:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },
    appTitCon:{
        flex:0.8,
        justifyContent:'center'
    },
    appTitConText:{
        color:'white',
        fontSize:RFValue(28)
    },
    appTitConTextLight:{
        color:'black',
        fontSize:RFValue(28)
    },
    flatList:{
        flex:0.85
    }
})