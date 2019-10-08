import React from "react";
import axios from "axios";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
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
                    style={{
                      flex: 1,
                      padding: 15
                    }}
                  >
                    <Image
                      style={{
                        width: 345,
                        height: 220,
                        borderRadius: 3,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.8,
                        shadowRadius: 2
                      }}
                      source={{ uri: obj.item.photos[0] }}
                    />
                    <View style={styles.price}>
                      <Text style={{ color: "white" }}>{obj.item.price}€</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRigt: 5,
                        marginTop: 5,
                        boxSizing: "content-box",
                        width: "100%"
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
                              marginLeft: -10
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
  title: {
    fontSize: 16.5,
    fontWeight: "400",
    marginTop: 3,
    maxWidth: 285
  }
});

const shadowStyle = {
  width: 100,
  height: 100,
  color: "#000",
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 }
};

export default HomeScreen;
