import React, { Component } from "react";
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, ScrollView, TextInput, Dimensions, Button, Alert } from "react-native";
import * as Font from 'expo-font'
import AppLoading from "expo-app-loading";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from 'react-native-dropdown-picker';
import firebase from "firebase";

let customs = {
    'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf')
}

const preview_images = {
    'img': require('../assets/post.jpeg'),
    'img1': require('../assets/image_1.jpg'),
    'img2': require('../assets/image_2.jpg'),
    'img3': require('../assets/image_3.jpg'),
    'img4': require('../assets/image_4.jpg'),
    'img5': require('../assets/image_5.jpg'),
    'img6': require('../assets/image_6.jpg'),
    'img7': require('../assets/image_7.jpg'),
}

export default class Story extends Component{
    constructor(props) {
        super(props);
        this.state={
            fontsLoaded: false,
            previewImages: preview_images['img'],
            dropDown: 40,
            light_theme: true,
            caption: ""
        }
    }
    fontsLoadedAsync = async() => {
        await Font.loadAsync(customs);
        this.setState({
            fontsLoaded: true
        })
    }
    componentDidMount() {
        this.fontsLoadedAsync();
        this.fetchUser();
    }

    addStory =() =>{
      if (this.state.previewImages && this.state.caption) {
        let storyData = {
          previewImage: this.state.previewImages,
          caption: this.state.caption,
          author: firebase.auth().currentUser.displayName,
          created_on: new Date(),
          author_uid: firebase.auth().currentUser.uid,
          likes: 0
        };
  
        firebase
        .database()
        .ref("/posts/"+ Math.random().toString(36).slice(2))
        .set(storyData)
        .then(function(snapshot) {});
        
        this.props.setUpdateToTrue()
        this.props.navigation.navigate("Feed")
      } else {
        Alert.alert(
          "Error", "All fiels are required.",
          [
            {text:"Ok", onPress: ()=> {console.log("Ok pressed.")}}
          ],
          {cancelable:false}
        );
      }
    }

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
        else {
            return(
                <View style={this.state.light_theme ? styles.conL : styles.con}>
                    <SafeAreaView style={styles.droideSafeArea}/>
                    <View style={styles.appTit}>
                        <View style={styles.icon}>
                            <Image source={require('../assets/logo.png')}
                            style={styles.iconImg} />
                        </View>
                        <View style={styles.appTitTextCon}>
                            <Text style={this.state.light_theme ? styles.appTitTextL : styles.appTitText}>New Post</Text>
                        </View>
                    </View>
                    <View style={styles.fieldsContainer}>
                        <ScrollView>
                            <Image source={this.state.previewImages}
                            style={styles.img}></Image>

            <View style={{height: RFValue(this.state.dropDown)}}>
                            <DropDownPicker
                            items={[
                              { label: "Image 1", value: "image_1" },
                              { label: "Image 2", value: "image_2" },
                              { label: "Image 3", value: "image_3" },
                              { label: "Image 4", value: "image_4" },
                              { label: "Image 5", value: "image_5" },
                              { label: "Image 6", value: "image_6" },
                              { label: "Image 7", value: "image_7" },
                              { label: "Image 8", value: "image_8" },
                            ]}
                            defaultValue={this.state.previewImages}
                            containerStyle={{
                              height: 40,
                              borderRadius: 20,
                              marginBottom: 10
                            }}
                            onOpen={() => {
                              this.setState({ dropDown: 170 });
                            }}
                            onClose={() => {
                              this.setState({ dropDown: 40 });
                            }}
                            style={{ backgroundColor: "transparent" }}
                            itemStyle={{
                              justifyContent: "flex-start"
                            }}
                            dropDownStyle={{ backgroundColor: "#2f345d" }}
                            labelStyle={{
                              fontSize:14,
                              color: "#000000",
                            }}
                            arrowStyle={{
                              color: "#000000",
                            }}
                            onChangeItem={item =>
                              this.setState({
                                previewImage: item.value
                              })
                            }
                            zIndex={1000}
                            textStyle={{ fontSize: 20 }}
                            mode="SIMPLE"
                            closeAfterSelecting={true}
                            itemSeparator={true}
                          />
                    </View>
                            <TextInput
                                style={this.state.light_theme ? styles.infL : styles.inf}
                                onChangeText={caption => this.setState({caption})}
                                placeholder={"Caption"}
                                placeholderTextColor='white'
                            />

                            <Button 
                              onPress={()=> this.addStory()}
                              title="Submit"
                              color="rgb(128,128,128)" 
                            />

                        </ScrollView>
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    con: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    conL: {
      flex: 1,
      backgroundColor: "white"
    },
    droideSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTit: {
      flex: 0.07,
      flexDirection: "row"
    },
    icon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImg: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitTextCon: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    appTitTextL: {
      color: "black",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    fieldsContainer: {
      flex: 0.85
    },
    img: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
    },
    inf: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white",
      fontFamily: "Bubblegum-Sans",
      marginTop: 20
    },
    infL: {
      height: RFValue(40),
      borderColor: "#000",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "#000",
      fontFamily: "Bubblegum-Sans",
      marginTop: 20
    },
    infExtra: {
      marginTop: RFValue(15)
    },
    inText: {
      textAlignVertical: "top",
      padding: RFValue(5)
    }
  });