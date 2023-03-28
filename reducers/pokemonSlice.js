import { createSlice } from "@reduxjs/toolkit";

const localStorageKey = "pokemonCaught";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    caught: JSON.parse(localStorage.getItem(localStorageKey)) || [],
  },
  reducers: {
    addPokemon: (state, action) => {
      const newPokemon = { ...action.payload, captured: true };
      state.caught.push(newPokemon);
      localStorage.setItem(localStorageKey, JSON.stringify(state.caught));
    },
    removePokemon: (state, action) => {
      state.caught = state.caught.filter(
        (pokemon) => pokemon.id !== action.payload.id
      );
      localStorage.setItem(localStorageKey, JSON.stringify(state.caught));
    },
    updatePokemon: (state, action) => {
      const updatedPokemon = { ...action.payload };
      const index = state.caught.findIndex(
        (pokemon) => pokemon.id === updatedPokemon.id
      );
      if (index !== -1) {
        state.caught[index] = updatedPokemon;
        localStorage.setItem(localStorageKey, JSON.stringify(state.caught));
      }
    },
  },
});

export const { addPokemon, removePokemon, updatePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;

