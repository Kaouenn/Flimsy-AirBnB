import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import MapView from "react-native-maps";

class OtherScreen extends React.Component {
  state = {
    room: {},
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: "Room"
  });

  componentDidMount = async () => {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" +
        this.props.navigation.state.params.id
    );
    this.setState(
      {
        room: response.data,
        isLoading: false
      },
      console.log(this.state)
    );
  };
  renderStars = ratingValue => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        stars.push(<Ionicons key={i} name="md-star" size={25} color="gold" />);
      } else {
        stars.push(<Ionicons key={i} name="md-star" size={25} color="grey" />);
      }
    }

    return stars;
  };

  render() {
    const room = this.state.room;
    if (this.state.isLoading === true) {
      return (
        <View>
          <Text>Is Loading ...</Text>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={{ flex: 1 }}>
            <Swiper autoplay={true} style={{ height: 250 }}>
              {this.state.room.photos.map((photo, index) => {
                return (
                  <View key={index}>
                    <Image
                      style={{ width: "100%", height: 250 }}
                      source={{ uri: photo }}
                    />
                  </View>
                );
              })}
            </Swiper>
            <View style={styles.price}>
              <Text style={{ color: "white" }}>{this.state.room.price}€</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
                flex: 1,
                height: 300
              }}
            >
              <View>
                <Text numberOfLines={1} style={styles.title}>
                  {this.state.room.title}
                </Text>

                <View
                  style={{
                    marginTop: 5,
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  {this.renderStars(this.state.room.ratingValue)}
                  <Text style={{ color: "#a09f9f", marginLeft: 3 }}>
                    {this.state.room.reviews} reviews
                  </Text>
                </View>
              </View>
              <Image
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  marginLeft: -20
                }}
                source={{ uri: this.state.room.user.account.photos[0] }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: -240,
                padding: 20,
                fontSize: 24
              }}
            >
              <Text
                numberOfLines={3}
                style={{
                  lineHeight: 23,
                  fontSize: 18,
                  textAlign: "justify",
                  fontWeight: "300"
                }}
              >
                {this.state.room.description}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, height: 300 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 48.866667,
                longitude: 2.333333,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.room.loc[1],
                  longitude: this.state.room.loc[0]
                }}
                title={"Chambre de merde"}
                description={"Ici les rats sont rois"}
              />
            </MapView>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  price: {
    backgroundColor: "#000000",
    height: 50,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50
  },
  title: { fontSize: 18, fontWeight: "400", marginTop: 3, paddingRight: 30 }
});

export default OtherScreen;
