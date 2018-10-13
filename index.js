import React from "react";
import { AppRegistry } from "react-native";
import {
  RootScreen,
  InterstitialScreen,
  StandardBannerScreen,
  NativeBannerScreen,
  NativeVideoScreen
} from "./app/screen";
import { APP_KEY } from "./app/Constants";

import Tapsell, { AdVideo, BannerAd } from "react-native-tapsell";
import { createStackNavigator } from "react-navigation";

const RootStack = createStackNavigator({
  Root: { screen: RootScreen },
  Interstitial: { screen: InterstitialScreen },
  StandardBanner: { screen: StandardBannerScreen },
  NativeBanner: { screen: NativeBannerScreen },
  NativeVideo: { screen: NativeVideoScreen }
});

class TapsellSample extends React.Component {
  constructor() {
    super();
    Tapsell.initialize(APP_KEY);
  }

  render() {
    return <RootStack />;
  }
}

AppRegistry.registerComponent("TapsellSample", () => TapsellSample);
