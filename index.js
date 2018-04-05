import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid,
	Image,
	Button,
	ScrollView,
    Picker,
    Platform
} from "react-native";
import Tapsell, { AdVideo, BannerAd } from "react-native-tapsell";

const APP_KEY =
	"qjmospqbfarbhodregqecbbnfhcjllkflpbpsmdrtpqkapdeptftldfiapfgbamkhalbij";
const ZONE_ID = "59b4d07d468465281b792cb7";
const NATIVE_ZONE_ID = "59c8a9334684656c504f0e19";
const NATIVE_VIDEO_ZONE_ID = "59c8ae514684656c504fce40";
const STANDARD_BANNER_ZONE_ID = "5a44aa6565a77100013d5fb3";

const REWARD_AD_TYPE = "reward";
const NATIVE_BANNER_AD_TYPE = "native-banner";
const NATIVE_VIDEO_AD_TYPE = "native-video";
const BANNER_AD_TYPE = "banner-ad";

export default class TapsellSample extends Component {
	constructor() {
		super();
		Tapsell.setDebugMode(true);
		Tapsell.initialize(APP_KEY);
		this.state = {
			adType: REWARD_AD_TYPE,
			nativeVideoAdId: "0",
			showAdDisabled: true,
			adId: "",
			loading: false,
			nativeAdData: {
				ad_id: "",
				zone_id: "",
				title: "موضوع پیشفرض",
				description: "توضیح پیشفرض",
				call_to_action_text: "روی من کلیک کن",
				icon_url:
					"https://tapsell.ir/wp-content/uploads/2017/06/tapsell2.png",
				portrait_static_image_url:
					"https://tapsell.ir/wp-content/uploads/2017/06/tapsell2.png",
				landscape_static_image_url:
					"https://tapsell.ir/wp-content/uploads/2017/06/tapsell2.png",
				error_message: "default error message"
			},
			nativeVideoAdData: {
				ad_id: "",
				zone_id: "",
				title: "موضوع پیشفرض",
				description: "توضیح پیشفرض",
				call_to_action_text: "روی من کلیک کن",
				icon_url:
					"https://tapsell.ir/wp-content/uploads/2017/06/tapsell2.png",
				error_message: "default error message"
			},
			onNativeAdClicked: () => {},
			onNativeVideoAdClicked: () => {}
		};
		Tapsell.setRewardListener((zoneId, adId, completed, rewarded) => {
			console.log("onAdShowFinished");
		});
	}

	onShowAdClicked() {
		Tapsell.showAd(
			{
				ad_id: this.state.adId,
				back_disabled: true,
				immersive_mode: false,
				rotation_mode: Tapsell.ROTATION_UNLOCKED,
				show_exit_dialog: true
			},
			(zoneId, adId) => {
				if(Platform.OS === 'android')ToastAndroid.show("ad opened", ToastAndroid.SHORT);
			},
			(zoneId, adId) => {
				if(Platform.OS === 'android')ToastAndroid.show("ad closed", ToastAndroid.SHORT);
			}
		);
	}

	onRequestAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestAd(
			ZONE_ID,
			true,
			(zoneId, adId) => {
				if(Platform.OS === 'android')ToastAndroid.show("ad available", ToastAndroid.SHORT);
				this.setState({ showAdDisabled: false, adId, loading: false });
			},
			zoneId => {
				if(Platform.OS === 'android')ToastAndroid.show("no ad available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			zoneId => {
				if(Platform.OS === 'android')ToastAndroid.show("no network", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			(zoneId, error) => {
				if(Platform.OS === 'android')ToastAndroid.show("ERROR\n" + error, ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			(zoneId, adId) => {
				if(Platform.OS === 'android')ToastAndroid.show("on expiring", ToastAndroid.SHORT);
				this.setState({ loading: false });
			}
		);
	}

	onRequestNativeBannerAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestNativeBannerAd(
			NATIVE_ZONE_ID,
			(adData, onAdShown, onAdClicked) => {
				this.setState(
					{
						loading: false,
						nativeAdData: adData,
						onNativeAdClicked: onAdClicked
					},
					() => {
						onAdShown(adData.ad_id);
					}
				);
			},
			() => {
				if(Platform.OS === 'android')ToastAndroid.show("No Native Ad Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			() => {
				if(Platform.OS === 'android')ToastAndroid.show("No Network Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			error => {
				if(Platform.OS === 'android')ToastAndroid.show("Error: " + error, ToastAndroid.SHORT);
				this.setState({ loading: false });
			}
		);
	}

	onRequestNativeVideoAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestNativeVideoAd(
			NATIVE_VIDEO_ZONE_ID,
			(adData, onAdShown, onAdClicked) => {
				this.setState(
					{
						loading: false,
						nativeVideoAdData: adData,
						onNativeVideoAdClicked: onAdClicked
					},
					() => {
						onAdShown(adData.ad_id);
					}
				);
			},
			() => {
				if(Platform.OS === 'android')ToastAndroid.show("No Native Ad Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			() => {
				if(Platform.OS === 'android')ToastAndroid.show("No Network Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			error => {
				if(Platform.OS === 'android')ToastAndroid.show("Error: " + error, ToastAndroid.SHORT);
				this.setState({ loading: false });
			}
		);
	}

	onNativeAdClicked() {
		if (this.state.onNativeAdClicked) {
			this.state.onNativeAdClicked(this.state.nativeAdData.ad_id);
		}
	}

	onNativeVideoAdClicked() {
		if (this.state.onNativeVideoAdClicked) {
			this.state.onNativeVideoAdClicked(
				this.state.nativeVideoAdData.ad_id
			);
		}
	}

	componentDidMount() {}

	render() {
		let loadingIndicator = null;
		if (this.state.loading) {
			loadingIndicator = (
				<Text style={styles.loadingText}>Loading...</Text>
			);
		}

		let adView = null;
		switch (this.state.adType) {
			case REWARD_AD_TYPE:
				adView = (
					<View style={styles.form}>
						<TouchableOpacity
							onPress={this.onShowAdClicked.bind(this)}
							disabled={this.state.showAdDisabled}
							style={
								this.state.showAdDisabled
									? styles.buttonDisabled
									: styles.button
							}>
							<Text style={styles.buttonText}>Show Ad</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.button}
							onPress={this.onRequestAdClicked.bind(this)}>
							<Text style={styles.buttonText}>Request Ad</Text>
						</TouchableOpacity>
					</View>
				);
				break;
			case NATIVE_BANNER_AD_TYPE:
				adView = (
					<View>
						<Text
							style={{
								fontWeight: "bold",
								textAlign: "center",
								marginTop: 20
							}}>
							Native Banner Ad
						</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={this.onRequestNativeBannerAdClicked.bind(
								this
							)}>
							<Text style={styles.buttonText}>
								Request Native Banner Ad
							</Text>
						</TouchableOpacity>
						<View
							style={styles.nativeAdView}
							onLayout={event => {
								this.setState({
									landscape_image_w:
										event.nativeEvent.layout.width
								});
							}}>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									padding: 8
								}}>
								<Text>{this.state.nativeAdData.title}</Text>
								<Image
									resizeMode="stretch"
									style={styles.icon}
									source={{
										uri: this.state.nativeAdData.icon_url
									}}
								/>
							</View>

							<Text style={{ padding: 8, flex: 1 }}>
								{this.state.nativeAdData.description}
							</Text>
							<Image
								resizeMode="contain"
								style={{
									width: this.state.landscape_image_w,
									height: 150
								}}
								source={{
									uri: this.state.nativeAdData
										.landscape_static_image_url
								}}
							/>
							<Button
								onPress={this.onNativeAdClicked.bind(this)}
								title={
									this.state.nativeAdData.call_to_action_text
								}
							/>
						</View>
					</View>
				);
				break;
			case NATIVE_VIDEO_AD_TYPE:
				adView = (
					<View>
						<Text
							style={{
								fontWeight: "bold",
								textAlign: "center",
								paddingTop: 50
							}}>
							Native Video Ad
						</Text>
						<TouchableOpacity
							style={styles.button}
							onPress={this.onRequestNativeVideoAdClicked.bind(
								this
							)}>
							<Text style={styles.buttonText}>
								Request Native Video Ad
							</Text>
						</TouchableOpacity>

						<View
							style={{
								flexDirection: "row",
								alignSelf: "flex-end",
								padding: 8
							}}>
							<Text style={{ marginTop: 24 }}>
								{this.state.nativeVideoAdData.title}
							</Text>
							<Image
								resizeMode="stretch"
								style={styles.icon}
								source={{
									uri: this.state.nativeVideoAdData.icon_url
								}}
							/>
						</View>

						<Text style={{ padding: 8, flex: 1 }}>
							{this.state.nativeVideoAdData.description}
						</Text>
						<AdVideo adId={this.state.nativeVideoAdData.ad_id} />
						<Button
							onPress={this.onNativeVideoAdClicked.bind(this)}
							title={
								this.state.nativeVideoAdData.call_to_action_text
							}
						/>
					</View>
				);
				break;
			case BANNER_AD_TYPE:
				adView = (
					<View style={{ marginTop: 50 }}>
						<BannerAd
							zoneId={STANDARD_BANNER_ZONE_ID}
							bannerType={Tapsell.BANNER_300x250}
						/>
					</View>
				);
				break;
		}

		return (
			<View style={styles.container}>
				{loadingIndicator}

				<View style={{ backgroundColor: "#E0E0E0" }}>
					<Picker
						selectedValue={this.state.adType}
						onValueChange={(value, index) => {
							this.setState({ adType: value });
						}}>
						<Picker.Item
							label="Rewarded Ad"
							value={REWARD_AD_TYPE}
						/>
						<Picker.Item
							label="Native Banner Ad"
							value={NATIVE_BANNER_AD_TYPE}
						/>
						<Picker.Item
							label="Native Video Ad"
							value={NATIVE_VIDEO_AD_TYPE}
						/>
						<Picker.Item label="Banner Ad" value={BANNER_AD_TYPE} />
					</Picker>
				</View>
				{adView}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 16
	},
	button: {
		alignSelf: "center",
		backgroundColor: "#E0E0E0",
		margin: 8
	},
	buttonDisabled: {
		opacity: 0.5
	},
	buttonText: {
		color: "black",
		paddingVertical: 8,
		paddingHorizontal: 12,
		textAlign: "center"
	},
	form: {
		margin: 16,
		alignItems: "center",
		justifyContent: "center"
	},
	loadingText: {
		color: "black",
		fontSize: 16,
		alignSelf: "center",
		margin: 16,
		color: "black",
		fontWeight: "bold"
	},
	nativeAdView: {
		backgroundColor: "#E0E0E0",
		flexDirection: "column",
		alignItems: "flex-end",
		padding: 8,
		margin: 16
	},
	icon: {
		width: 48,
		height: 48,
		margin: 8
	}
});

AppRegistry.registerComponent("TapsellSample", () => TapsellSample);
