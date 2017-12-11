import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Button,
	ScrollView,
    Picker,
    Platform
} from "react-native";
import Tapsell from "react-native-tapsell";

const APP_KEY =
	"rashssjnjiaeqqeihgjdsihajkbkqgeqqdoftpafmlcoofdflejgmttlercbsdfbnjnjqs";
const ZONE_ID = "586e4ed1bc5c28712bd8d50c";
const NATIVE_ZONE_ID = "58aa98994684653c04d9b22d";
const NATIVE_VIDEO_ZONE_ID = "58aa9d0d4684653c04da4e5e";

const REWARD_AD_TYPE = "reward";
const NATIVE_BANNER_AD_TYPE = "native-banner";
const NATIVE_VIDEO_AD_TYPE = "native-video";

export default class TapsellSample extends Component {
	constructor() {
		super();
		// Tapsell.setDebugMode(true);
		Tapsell.initialize(APP_KEY);
		this.state = {
			adType: REWARD_AD_TYPE,
			showAdDisabled: true,
			adId: "",
			loading: false,
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
				if (Platform.OS === "android")
					ToastAndroid.show("ad opened", ToastAndroid.SHORT);
				else console.log("ad opened");
			},
			(zoneId, adId) => {
				if (Platform.OS === "android")
					ToastAndroid.show("ad closed", ToastAndroid.SHORT);
				else console.log("ad closed");
			}
        );
        this.setState({ showAdDisabled: true});
	}

	onRequestAdClicked() {
		this.setState({ loading: true });
		Tapsell.requestAd(
			ZONE_ID,
			true,
			(zoneId, adId) => {
				if (Platform.OS === "android")
					ToastAndroid.show("ad available", ToastAndroid.SHORT);
				else console.log("ad available");
				this.setState({ showAdDisabled: false, adId, loading: false });
			},
			zoneId => {
				if (Platform.OS === "android")
					ToastAndroid.show("no ad available", ToastAndroid.SHORT);
				else console.log("no ad available");
				this.setState({ loading: false });
			},
			zoneId => {
				if (Platform.OS === "android")
					ToastAndroid.show("no network", ToastAndroid.SHORT);
				else console.log("no network");
				this.setState({ loading: false });
			},
			(zoneId, error) => {
				if (Platform.OS === "android")
					ToastAndroid.show("ERROR\n" + error, ToastAndroid.SHORT);
				else console.log("ERROR\n" + error);
				this.setState({ loading: false });
			},
			(zoneId, adId) => {
				if (Platform.OS === "android")
					ToastAndroid.show("on expiring", ToastAndroid.SHORT);
				else console.log("on expiring");
				this.setState({ loading: false });
			}
		);
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
					</View>
				);
				break;
			case NATIVE_BANNER_AD_TYPE:
				adView = (
					null
				);
				break;
			case NATIVE_VIDEO_AD_TYPE:
				adView = (
					null
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
