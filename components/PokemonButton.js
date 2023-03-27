import { Pressable, StyleSheet, Image, Text } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

const PokemonButton = ({ id, captured = false, shadow = false }) => {
  const navigation = useNavigation();

  const idString = id.toString().padStart(3, "0");
  const imageSrc = require(`../assets/images/${idString}.png`);
  const navigateToPokemon = () => {
    navigation.navigate("Pokemon", { id });
  };

  const opacity = captured ? 0.8 : 0.4;
  const shadowOpacity = shadow ? 0.8 : 0.4;

  return (
    <Pressable
      onPress={navigateToPokemon}
      style={[
        styles.button,
        { opacity, shadowOpacity },
      ]}
    >
      <Image source={imageSrc} style={styles.image} />
      <Text style={styles.text}>{`#${idString}`}</Text>
    </Pressable>
  );
};

PokemonButton.propTypes = {
  id: PropTypes.number.isRequired,
  captured: PropTypes.bool,
  shadow: PropTypes.bool,
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    height: 145,
    justifyContent: "center",
    margin: 8,
    width: 140,
    borderColor: "#4B0082",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
  },
  image: {
    height: 120,
    resizeMode: "contain",
    width: 120,
  },

  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
    color: "purple",
  },
});

export default PokemonButton;
