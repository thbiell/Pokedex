import { Pressable, View, Text, StyleSheet, Image } from "react-native";

const HomeScreen = ({ navigation }) => {
  const logo = require(`../../assets/pokedex.png`);
  const lupa = require(`../../assets/lupa.png`);
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Pokedex")}
      >
        <Image source={logo} style={styles.image} />
        <Text style={styles.buttonText}>Pokédex</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
      >
        <Image source={lupa} style={styles.image} />
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#D8BFD8",
  },
  button: {
    alignItems: "center",
    borderRadius: 10,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  image: {
    height: 150,
    resizeMode: "contain",
    width: 150,
  },
});

export default HomeScreen;
