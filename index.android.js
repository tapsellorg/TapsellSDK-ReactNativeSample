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
	ScrollView
} from "react-native";
import Tapsell, { AdVideo } from "react-native-tapsell";

const APP_KEY =
	"qjmospqbfarbhodregqecbbnfhcjllkflpbpsmdrtpqkapdeptftldfiapfgbamkhalbij";
const ZONE_ID = "59b4d07d468465281b792cb7";

export default class TapsellSample extends Component {
	constructor() {
		super();
		Tapsell.setDebugMode(true);
		Tapsell.initialize(APP_KEY);
		this.state = {
			showAdDisabled: true,
			adId: "",
			nativeVideoAdId: "nativeVideo",
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
			landscape_image_w: 200,
			onNativeAdClicked: () => {},
			onNativeVideoAdClicked: () => {}
		};
	}

	onShowAdClicked() {
		Tapsell.showAd(
			{
				ad_id: this.state.adId,
				back_disabled: false,
				immersive_mode: false,
				rotation_mode: Tapsell.ROTATION_UNLOCKED,
				show_exit_dialog: true
			},
			(zoneId, adId) => {
				ToastAndroid.show("ad opened", ToastAndroid.SHORT);
			},
			(zoneId, adId) => {
				ToastAndroid.show("ad closed", ToastAndroid.SHORT);
			}
		);
	}

	onRequestAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestAd(
			ZONE_ID,
			true,
			(zoneId, adId) => {
				ToastAndroid.show("ad available", ToastAndroid.SHORT);
				this.setState({ showAdDisabled: false, adId, loading: false });
			},
			zoneId => {
				ToastAndroid.show("no ad available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			zoneId => {
				ToastAndroid.show("no network", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			(zoneId, error) => {
				ToastAndroid.show("ERROR\n" + error, ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			(zoneId, adId) => {
				ToastAndroid.show("on expiring", ToastAndroid.SHORT);
				this.setState({ loading: false });
			}
		);
	}

	onRequestNativeBannerAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestNativeBannerAd(
			ZONE_ID,
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
				ToastAndroid.show("No Native Ad Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			() => {
				ToastAndroid.show("No Network Available", ToastAndroid.SHORT);
				this.setState({ loading: false });
			},
			error => {
				ToastAndroid.show("Error: " + error, ToastAndroid.SHORT);
				this.setState({ loading: false });
			}
		);
	}

	onRequestNativeVideoAdClicked() {}

	onNativeAdClicked() {
		if (this.state.onNativeAdClicked) {
			this.state.onNativeAdClicked(this.state.nativeAdData.ad_id);
		}
	}

	onNativeVideoAdClicked() {
		if (this.state.onNativeVideoAdClicked) {
			this.state.onNativeVideoAdClicked(this.state.nativeAdData.ad_id);
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

		// return (
		// 	<View style={styles.container}>
		// 		<Text>SALAM</Text>
		// 		<AdVideo adId="TEST_ADID" />
		// 		<Text>SALAM</Text>
		// 	</View>
		// );
		return (
			<ScrollView>
				<View style={styles.form}>
					<TouchableOpacity
						onPress={this.onShowAdClicked.bind(this)}
						disabled={this.state.showAdDisabled}
						style={
							this.state.showAdDisabled ? (
								styles.buttonDisabled
							) : (
								styles.button
							)
						}>
						<Text style={styles.buttonText}>Show Ad</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={this.onRequestAdClicked.bind(this)}>
						<Text style={styles.buttonText}>Request Ad</Text>
					</TouchableOpacity>
					{loadingIndicator}
				</View>
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
					onPress={this.onRequestNativeBannerAdClicked.bind(this)}>
					<Text style={styles.buttonText}>
						Request Native Banner Ad
					</Text>
				</TouchableOpacity>
				<View
					style={styles.nativeAdView}
					onLayout={event => {
						this.setState({
							landscape_image_w: event.nativeEvent.layout.width
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
						title={this.state.nativeAdData.call_to_action_text}
					/>
				</View>
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
					onPress={this.onRequestNativeVideoAdClicked.bind(this)}>
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
				<View>
					<AdVideo adId={this.state.nativeVideoAdId} />
				</View>
				<Button
					onPress={this.onNativeVideoAdClicked.bind(this)}
					title={this.state.nativeVideoAdData.call_to_action_text}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 16,
		backgroundColor: "#F5FCFF",
		alignItems: "center"
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
		fontSize: 12
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
