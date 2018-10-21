import React from "react";
import { ZONE_IDS } from "../Constants";
import Tapsell from "react-native-tapsell";
import NativeBannerAd from "../component/NativeBannerAd";
import { ToastAndroid, Platform } from "react-native";

export default class NativeBanner extends React.Component {
  static navigationOptions = {
    title: "Native Banner"
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
        portrait_static_image_url: "",
        landscape_static_image_url: "",
        error_message: ""
      },

      clickListener: () => {}
    };

    Tapsell.createCache(ZONE_IDS.NATIVE_BANNER, Tapsell.CACHE_SIZE_SMALL);

    Tapsell.requestCachedNativeBannerAd(
      ZONE_IDS.NATIVE_BANNER,
      (adData, onAdShown, onAdClicked) => {
        this.setState(
          {
            loading: false,
            nativeAdData: adData,
            clickListener: onAdClicked
          },
          () => {
            onAdShown(adData.ad_id);
            this.setState({ ad: adData });
          }
        );
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
      <NativeBannerAd ad={this.state.ad} onNativeAdClicked={this.clickFunc} />
    );
  }
}
