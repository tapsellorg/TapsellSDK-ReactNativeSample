import React from "react";
import { ZONE_IDS } from "../Constants";
import Tapsell, { BannerAd } from "react-native-tapsell";

import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

export default class StandardBanner extends React.Component {
  static navigationOptions = {
    title: "Standard Banner"
  };

  render() {
    return (
      <View style={{ marginTop: 50 }}>
        <BannerAd
          zoneId={ZONE_IDS.STANDARD_BANNER}
          bannerType={Tapsell.BANNER_300x250}
        />
      </View>
    );
  }
}
