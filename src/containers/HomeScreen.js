import React from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  FlatList
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

class HomeScreen extends React.Component {
  state = {
    rooms: [],
    isLoading: true
  };
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };
  componentDidMount = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState(
      {
        rooms: response.data.rooms,
        isLoading: false
      },
      console.log(this.state)
    );
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View>
          <Text>Is Loading ...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View>
            <FlatList
              data={this.state.rooms}
              keyExtractor={item => String(item._id)}
              renderItem={obj => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Other", {
                        id: obj.item._id
                      })
                    }
                    style={{ flex: 1, padding: 20 }}
                  >
                    <Image
                      style={{ width: 335, height: 220 }}
                      source={{ uri: obj.item.photos[0] }}
                    />
                    <View style={styles.price}>
                      <Text style={{ color: "white" }}>{obj.item.price}€</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10
                      }}
                    >
                      <View>
                        <Text style={styles.title}>{obj.item.title}</Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: 5
                          }}
                        >
                          <Image
                            style={{
                              width: "30%",
                              height: "80%",
                              marginLeft: -15
                            }}
                            source={require("./5stars.png")}
                          />
                          <Text style={{ color: "grey", marginLeft: -10 }}>
                            {obj.item.reviews} reviews
                          </Text>
                        </View>
                      </View>
                      <Image
                        resizeMode="contain"
                        style={{ width: 45, height: 45, borderRadius: 25 }}
                        source={{ uri: obj.item.user.account.photos[0] }}
                      />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </ScrollView>
      );
    }
  }

  // showMoreApp = () => {
  //   this.props.navigation.navigate("Other", {id: } );
  // };
}
const styles = StyleSheet.create({
  price: {
    backgroundColor: "#000000",
    height: 50,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50
  },
  title: { fontSize: 18, fontWeight: "400", marginTop: 3 }
});

export default HomeScreen;
