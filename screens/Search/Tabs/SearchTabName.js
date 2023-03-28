import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import pokemonData from "../../../assets/pokedex.json";
import PokemonScreen from "../../Pokemon/index";

const SearchTabName = () => {
  const [searchName, setSearchName] = useState("");
  const [pokemon, setPokemon] = useState(null);

  const handleSearch = () => {
    const foundPokemon = pokemonData.find(
      (p) => p.name.english.toLowerCase() === searchName.toLowerCase()
    );
    if (foundPokemon) {
      setPokemon(foundPokemon);
    } else {
      setPokemon(null);
    }
  };

  const renderPokemonDetails = () => {
    if (!searchName) {
      return null;
    }

    if (pokemon) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.pokemonContainer}>
            <PokemonScreen route={{ params: { name: pokemon.name.english } }} />
          </View>
        </ScrollView>
      );
    }

    return <Text>No Pokemon found</Text>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          value={searchName}
          onChangeText={setSearchName}
          placeholder="Enter Pokemon Name"
          keyboardType="default"
        />
        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>
      {renderPokemonDetails()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D8BFD8",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#4B0082",
    padding: 5,
    marginRight: 7,
    backgroundColor: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    margin: 8,
    width: 50,
    borderColor: "#4B0082",
    borderWidth: 2,
    shadowColor: "#000",
  },
  pokemonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
});

export default SearchTabName;
