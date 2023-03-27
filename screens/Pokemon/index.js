import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { addPokemon, removePokemon } from "../../reducers/pokemonSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

const PokemonScreen = ({ route }) => {
  const { id } = route.params;
  const idString = id.toString().padStart(3, "0");
  const imageSrc = require(`../../assets/images/${idString}.png`);
  const pokedex = require("../../assets/pokedex.json");
  const [pokemon, setPokemon] = useState(pokedex.find((p) => p.id === id));
  const dispatch = useDispatch();
  const [captured, setCaptured] = useState(pokemon.captured);

  const handleAddToCollection = () => {
    dispatch(addPokemon(pokemon));
    setCaptured(true);
    setPokemon({ ...pokemon, captured: true });
  };

  const handleRemoveToCollection = () => {
    dispatch(removePokemon(pokemon));
    setCaptured(false);
    setPokemon({ ...pokemon, captured: false });
  };

  return (
    <View style={styles.container}>
      <Image source={imageSrc} style={styles.image} />
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>{`#${idString}`}</Text>
          <Text style={styles.text}>{pokemon.name.english}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>Types:</Text>
          {pokemon.type.map((type, index) => (
            <Text key={index} style={styles.text}>
              {type}
            </Text>
          ))}
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>HP:</Text>
          <Text style={styles.text}>{pokemon.base.HP}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>Attack:</Text>
          <Text style={styles.text}>{pokemon.base.Attack}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Defense:</Text>
          <Text style={styles.text}>{pokemon.base.Defense}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>Sp. Atk:</Text>
          <Text style={styles.text}>{pokemon.base["Sp. Attack"]}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Sp. Def:</Text>
          <Text style={styles.text}>{pokemon.base["Sp. Defense"]}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.text}>Speed: {pokemon.base.Speed}</Text>
        </View>
      </View>
      <View style={styles.func}>
        <Pressable
          style={[styles.funcButton, styles.addButton]}
          onPress={handleAddToCollection}
        >
          <Text style={styles.buttonText}>
            {captured ? "Captured" : "Add to Collection"}
          </Text>
        </Pressable>
        {captured && (
          <Pressable
            style={[styles.funcButton, styles.removeButton]}
            onPress={handleRemoveToCollection}
          >
            <Text style={styles.buttonText}>Remove from Collection</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8FF",
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    width: 180,
    height: 180,
    marginTop: 32,
    marginBottom: 16,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#4B0082",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    borderColor: "#4B0082",
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
    width: 320,
    backgroundColor: "#FFFFFF",
  },
  info: {
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B0082",
    marginVertical: 4,
    fontFamily: "Roboto",
  },
  typeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginVertical: 8,
    width: 320,
  },

  hp: {
    backgroundColor: "#DC143C",
  },
  attack: {
    backgroundColor: "#FFA500",
  },
  defense: {
    backgroundColor: "#87CEEB",
  },
  spAtk: {
    backgroundColor: "#EE82EE",
  },
  spDef: {
    backgroundColor: "#9370DB",
  },
  speed: {
    backgroundColor: "#00BFFF",
  },
  func: {
    flexDirection: "row",
  },
  funcButton: {
    width: 150,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  addButton: {
    backgroundColor: "#4B0082",
  },
  removeButton: {
    backgroundColor: "#DC143C",
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default PokemonScreen;
