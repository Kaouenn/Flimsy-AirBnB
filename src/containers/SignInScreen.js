import React from "react";
import axios from "axios";

import {
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  View,
  KeyboardAvoidingView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

class SignInScreen extends React.Component {
  state = { email: "", password: "" };

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.container}>
          <Image
            style={{
              width: 230,
              height: 230,
              marginTop: 120,
              marginBottom: -30
            }}
            source={{
              uri:
                "http://fr.mhec.fr/wp-content/uploads/sites/2/2018/11/airbnb-logo.png"
            }}
          />

          <View
            style={{
              width: 300
            }}
          >
            <TextInput
              style={{
                height: 50,
                width: "auto",
                borderBottomColor: "white",
                borderBottomWidth: 1,
                marginBottom: 30,
                color: "#ff595e",
                marginTop: 40,
                fontSize: 20
              }}
              autoCapitalize="none"
              type="email"
              placeholder="Email ID"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              style={{
                height: 50,
                width: "auto",
                borderBottomColor: "white",
                borderBottomWidth: 1,
                color: "#ff595e",
                marginVertical: 30,
                fontSize: 20
              }}
              secureTextEntry={true}
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity
              onPress={() => {
                this.onSubmit(this.state);
                this.signInAsync();
              }}
              style={styles.loginButton}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 20 }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
  onSubmit = async values => {
    const response = await axios.post(
      "https://airbnb-api.now.sh/api/user/log_in",
      {
        email: values.email,
        password: values.password
      }
    );
    console.log(response.data);
  };

  signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  loginButton: {
    backgroundColor: "#ff595e",
    height: 60,
    width: 120,
    justifyContent: "center",
    marginLeft: 90,
    marginTop: 30,
    alignItems: "center",
    borderRadius: 10
  }
});
export default SignInScreen;
