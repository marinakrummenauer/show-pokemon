// store.js

import { defineStore } from 'pinia';
import axios from 'axios';

export const usePokemonStore = defineStore({
  id: 'pokemon',
  state: () => ({
    pokemons: [],
    errorMessage: ''
  }),
  actions: {
    async fetchPokemon(name) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemon = response.data;
        // Aqui você pode atualizar o estado do store conforme necessário
        this.pokemons.push(pokemon);
      } catch (error) {
        // Manipule erros aqui, se necessário
        this.errorMessage = 'Pokémon inexistente';
      }
    },
    clearErrorMessage() {
      // Função para limpar a mensagem de erro
      this.errorMessage = '';
    }
  }
});
