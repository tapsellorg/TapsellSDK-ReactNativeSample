import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E0E0E0",
    alignItems: "flex-end",
    padding: 8,
    margin: 16
  },

  icon: {
    width: 48,
    height: 48
  },

  title: {
    marginRight: 6
  },

  image: {
    width: "100%",
    aspectRatio: 1.777777778,
    marginTop: 6
  },

  button: {
    alignItems: "center",
    backgroundColor: "#33AAFF",
    padding: 10,
    marginTop: 10,
    width: "100%"
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF"
  }
});

export default class NativeBannerAd extends React.Component {
  constructor() {
    super();
  }

  makeAdView = (ad, clickFunc) => {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-end"
          }}
        >
          <Text style={styles.title}>{ad.title}</Text>

          <Image
            resizeMode="stretch"
            style={styles.icon}
            source={{
              uri: ad.icon_url
            }}
          />
        </View>

        <Text>{ad.description}</Text>

        <Image
          resizeMode="contain"
          style={styles.image}
          source={{
            uri: ad.landscape_static_image_url
          }}
        />

        <TouchableOpacity style={styles.button} onPress={clickFunc}>
          <Text style={styles.buttonText}> {ad.call_to_action_text} </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let view = this.makeAdView(this.props.ad, this.props.onNativeAdClicked);
    return view;
  }
}
