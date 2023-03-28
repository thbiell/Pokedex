import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonButton from "../../components/PokemonButton";
import pokemonData from "../../assets/pokedex.json";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


const PokedexScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState(pokemonData);
  const logo = require(`../../assets/pokemon.png`);
  const isFocused = useIsFocused();
  const caughtPokemons = useSelector(state => state.trainer.caught);
  const dispatch = useDispatch();

  useEffect(() => {
    // Aqui vamos recuperar do AsyncStorage os pokémons que já foram capturados
    const getCaughtPokemons = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@caught_pokemons')
        if(jsonValue != null) {
          dispatch({type: 'SET_CAUGHT', payload: JSON.parse(jsonValue)});
        }
      } catch(e) {
        console.log(e)
      }
    }
    getCaughtPokemons();
  }, [dispatch]);

  useEffect(() => {
    // Aqui vamos atualizar o estado captured no arquivo JSON correspondente para adicionar a propriedade captured que indica se o pokemon já foi capturado ou não
    const updatedPokemons = pokemons.map(pokemon => ({
      ...pokemon,
      captured: caughtPokemons.some(caughtPokemon => caughtPokemon.id === pokemon.id),
    }));
    setPokemons(updatedPokemons);

    // Aqui vamos salvar no AsyncStorage a nova lista de pokémons capturados
    const saveCaughtPokemons = async (caughtPokemons) => {
      try {
        const jsonValue = JSON.stringify(caughtPokemons)
        await AsyncStorage.setItem('@caught_pokemons', jsonValue)
      } catch (e) {
        console.log(e)
      }
    }
    saveCaughtPokemons(caughtPokemons);
  }, [caughtPokemons]);

  const renderPokemon = ({ item }) => {
    const isCaptured = caughtPokemons.some(caughtPokemon => caughtPokemon.id === item.id);
    const shadowStyle = isCaptured ? {} : styles.shadowed;
    
    return (
      <PokemonButton 
        id={item.id} 
        captured={isCaptured}
        style={shadowStyle}
        onPress={() => {
          if (!isCaptured) {
            dispatch({type: 'CATCH_POKEMON', payload: item});
          } else {
            dispatch({type: 'RELEASE_POKEMON', payload: item.id});
          }
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <FlatList
        data={pokemons}
        renderItem={renderPokemon}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#D8BFD8",
  },
  image: {
    height: 150,
    resizeMode: "contain",
    width: 150,
  },
});

export default PokedexScreen;
