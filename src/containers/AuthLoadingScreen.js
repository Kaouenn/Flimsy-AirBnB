import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

class AuthLoadingScreen extends React.Component {
  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" style={{ backgroundColor: "#ff595e" }} />
      </View>
    );
  }
}

export default AuthLoadingScreen;
