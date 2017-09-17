/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	ToastAndroid
} from "react-native";
import Tapsell from "react-native-tapsell";

export default class TapsellSample extends Component {
	constructor() {
		super();
		Tapsell.setDebugMode(false);
		Tapsell.initialize(
			"kilkhmaqckffopkpfnacjkobgrgnidkphkcbtmbcdhiokqetigljpnnrbfbnpnhmeikjbq"
		);
		this.state = {
			showAdDisabled: true,
			adId: "",
			loading: false
		};
	}

	onShowAdClicked() {
		// this.setState({ showAdDisabled: true });
		Tapsell.showAd(
			{
				ad_id: this.state.adId,
				back_disabled: false,
				immersive_mode: false,
				rotation_mode: 3,
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
			"586f52d9bc5c284db9445beb",
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

	render() {
		let loadingIndicator = null;
		if (this.state.loading) {
			loadingIndicator = (
				<Text style={styles.loadingText}>Loading...</Text>
			);
		}
		return (
			<View style={styles.container}>
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
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		margin: 16,
		backgroundColor: "#F5FCFF"
	},
	button: {
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
		alignItems: "center"
	},
	loadingText: {
		color: "black",
		fontSize: 12
	}
});

AppRegistry.registerComponent("TapsellSample", () => TapsellSample);
