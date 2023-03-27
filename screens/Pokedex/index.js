import React, { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PokemonButton from "../../components/PokemonButton";
import pokemonData from "../../assets/pokedex.json";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from 'react-redux';

const PokedexScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState(pokemonData.map(pokemon => ({
    id: pokemon.id,
    name: pokemon.name.english,
    captured: false,
  })));
  const logo = require(`../../assets/pokemon.png`);
  const isFocused = useIsFocused();
  const [capturedPokemons, setCapturedPokemons] = useState([]);

  useEffect(() => {
    // Aqui vamos recuperar do AsyncStorage os pokémons que já foram capturados
    const getCapturedPokemons = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@captured_pokemons')
        if(jsonValue != null) {
          setCapturedPokemons(JSON.parse(jsonValue));
        }
      } catch(e) {
        console.log(e)
      }
    }
    getCapturedPokemons();
  }, []);
  
  
  useEffect(() => {
    const saveCapturedPokemons = async (capturedPokemons) => {
      try {
        const jsonValue = JSON.stringify(capturedPokemons)
        await AsyncStorage.setItem('@captured_pokemons', jsonValue)
      } catch (e) {
        console.log(e)
      }
    }
    saveCapturedPokemons(capturedPokemons);
  
    console.log(capturedPokemons); // adicionado console.log para verificar o estado capturedPokemons
  }, [capturedPokemons]);
  

  useEffect(() => {
    // Aqui vamos atualizar o estado pokemons para adicionar a propriedade shadowed que indica se o pokemon já foi capturado ou não
    setPokemons(pokemons.map(pokemon => ({
      ...pokemon,
      captured: capturedPokemons.includes(pokemon.id),
    })));
  }, [capturedPokemons]);
  

  useEffect(() => {
    // Aqui vamos atualizar o estado capturedPokemons para remover os pokémons que foram capturados na tela do detalhe do pokémon
    if (!isFocused) {
      setPokemons(prevPokemons => {
        const newPokemons = [...prevPokemons];
        newPokemons.pop();
        return newPokemons;
      });
    }
  }, [isFocused]);

  const renderPokemon = ({ item }) => {
    const isCaptured = capturedPokemons.includes(item.id);
    const shadowStyle = isCaptured ? {} : styles.shadowed;
    
    return (
      <PokemonButton 
        id={item.id} 
        shadowed={isCaptured} 
        captured={item.captured}
        style={shadowStyle}
        onPress={() => {
          const newPokemons = [...pokemons];
          const index = newPokemons.findIndex(pokemon => pokemon.id === item.id);
          newPokemons[index] = { ...newPokemons[index], captured: !newPokemons[index].captured };
          setPokemons(newPokemons);
  
          if (!isCaptured) {
            setCapturedPokemons([...capturedPokemons, item.id]);
          } else {
            setCapturedPokemons(capturedPokemons.filter(id => id !== item.id));
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
