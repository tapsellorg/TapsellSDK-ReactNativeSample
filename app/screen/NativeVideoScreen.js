import React from "react";
import { ZONE_IDS } from "../Constants";
import Tapsell from "react-native-tapsell";
import NativeVideoAd from "../component/NativeVideoAd";
import { ToastAndroid, Platform } from "react-native";

export default class NativeVideo extends React.Component {
  static navigationOptions = {
    title: "Native Video"
  };

  constructor() {
    super();

    this.state = {
      ad: {
        ad_id: "",
        zone_id: "",
        title: "",
        description: "",
        call_to_action_text: "",
        icon_url: "",
        error_message: ""
      },

      clickListener: () => {}
    };

    Tapsell.requestNativeVideoAd(
      ZONE_IDS.NATIVE_VIDEO,
      (adData, onAdShown, onAdClicked) => {
        this.setState(
          {
            loading: false,
            nativeVideoAdData: adData,
            clickListener: onAdClicked
          },
          () => {
            onAdShown(adData.ad_id);
            this.setState({ ad: adData });
          }
        );
      },
      () => {
        if (Platform.OS === "android")
          ToastAndroid.show("No Native Ad Available", ToastAndroid.SHORT);
        this.setState({ loading: false });
      },
      () => {
        if (Platform.OS === "android")
          ToastAndroid.show("No Network Available", ToastAndroid.SHORT);
        this.setState({ loading: false });
      },
      (error) => {
        if (Platform.OS === "android")
          ToastAndroid.show("Error: " + error, ToastAndroid.SHORT);
        this.setState({ loading: false });
      }
    );
  }

  clickFunc = () => {
    if (this.state.clickListener) {
      this.state.clickListener(this.state.ad.ad_id);
    }
  };

  render() {
    return (
      <NativeVideoAd ad={this.state.ad} onNativeAdClicked={this.clickFunc} />
    );
  }
}
