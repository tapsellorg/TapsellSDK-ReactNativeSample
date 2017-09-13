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
		Tapsell.initialize(
			"kilkhmaqckffopkpfnacjkobgrgnidkphkcbtmbcdhiokqetigljpnnrbfbnpnhmeikjbq"
		);
		this.state = {
			showAdDisabled: true,
			adId: ""
		};
	}

	onShowAdClicked() {
		Tapsell.showAd({
			ad_id: this.state.adId,
			back_disabled: true,
			immersive_mode: false,
			rotation_mode: 3,
			show_exit_dialog: true
		});
	}

	onRequestAdClicked() {
		Tapsell.requestAd(
			"586f52d9bc5c284db9445beb",
			true,
			(zoneId, adId) => {
				ToastAndroid.show("add available", ToastAndroid.SHORT);
				this.setState({ showAdDisabled: false, adId });
			},
			zoneId => {
				ToastAndroid.show("no add available", ToastAndroid.SHORT);
			},
			zoneId => {
				ToastAndroid.show("no network", ToastAndroid.SHORT);
			},
			(zoneId, error) => {
				ToastAndroid.show(error, ToastAndroid.SHORT);
			},
			(zoneId, adId) => {
				ToastAndroid.show("on expiring", ToastAndroid.SHORT);
			}
		);
	}

	render() {
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
	}
});

AppRegistry.registerComponent("TapsellSample", () => TapsellSample);
