import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from "firebase";

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
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
    let stories = this.state.story_data
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let images = {
        'img': require('../assets/post.jpeg'),
        'img1': require('../assets/image_1.jpg'),
        'img2': require('../assets/image_2.jpg'),
        'img3': require('../assets/image_3.jpg'),
        'img4': require('../assets/image_4.jpg'),
        'img5': require('../assets/image_5.jpg'),
        'img6': require('../assets/image_6.jpg'),
        'img7': require('../assets/image_7.jpg'),
      }
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("PostScreen", {
              story: this.props.story
            })
          }
        >
          <View style={this.state.light_theme ? styles.cardContainerL : styles.cardContainer}>
            <Image
              source={images[stories.previewImage]}
              style={styles.storyImage}
            ></Image>

            <View style={styles.titleContainer}>
              <Text style={this.state.light_theme ? styles.storyTitleTextL :styles.storyTitleText}>
                {this.props.story.caption}
              </Text>
              <Text style={this.state.light_theme ? styles.storyAuthorTextL : styles.storyAuthorText}>
                {this.props.story.author}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                <Text style={this.state.light_theme ? styles.likeTextL : styles.likeText}>{this.props.story.likes}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20)
  },
  cardContainerL: {
    margin: RFValue(13),
    backgroundColor: "#afbdef",
    borderRadius: RFValue(20)
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250)
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center"
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white"
  },
  storyTitleTextL: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "black"
  },
  storyAuthorTextL: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "black"
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10)
  },
  descriptionTextL: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10)
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10)
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30)
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  },
  likeTextL: {
    color: "black",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5)
  }
});
