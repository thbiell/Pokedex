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
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
