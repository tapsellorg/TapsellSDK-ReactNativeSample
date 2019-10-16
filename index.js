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
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  Root: { screen: RootScreen },
  Interstitial: { screen: InterstitialScreen },
  StandardBanner: { screen: StandardBannerScreen },
  NativeBanner: { screen: NativeBannerScreen },
  NativeVideo: { screen: NativeVideoScreen }
});

const AppContainer = createAppContainer(RootStack);
export default AppContainer;

class TapsellSample extends React.Component {
  constructor() {
    super();
    Tapsell.initialize(APP_KEY);
  }

  render() {
    return <AppContainer uriPrefix="/app" />;
  }
}

AppRegistry.registerComponent("TapsellSample", () => TapsellSample);
