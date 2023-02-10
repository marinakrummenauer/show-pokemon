<template>
    <div class="pokemon">
        <h1 class="title">Localize seu</h1> 
      <span class="img-container">
        <img class="logo-pokemon align-center" src="@/assets/pokemon-logo.png">
      </span>
      <div class="form-container">
        <form @submit.prevent="searchPokemon">
          <input type="text" v-model="pokemonName" placeholder="Pesquise seu Pokémon">
          <button type="submit">Buscar</button>
        </form>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>
        <div class="pokemon-results">
        <ul v-if="pokemons.length">
          <li v-for="pokemon in pokemons"  v-bind:key="pokemon.id">
            <h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.sprites.front_default" alt="Pokemon sprite">
            <ul>
              <li><strong>HP:</strong> {{ pokemon.stats[5].base_stat }}</li>
              <li><strong>Attack:</strong> {{ pokemon.stats[4].base_stat }}</li>
              <li><strong>Defense:</strong> {{ pokemon.stats[3].base_stat }}</li>
              <li><strong>Special Attack:</strong> {{ pokemon.stats[2].base_stat }}</li>
              <li><strong>Special Defense:</strong> {{ pokemon.stats[1].base_stat }}</li>
              <li><strong>Speed:</strong> {{ pokemon.stats[0].base_stat }}</li>
            </ul>
          </li>
        </ul>
      </div>
      </div>
    </div>
  </template>
  
 <script>
 import axios from 'axios';
  export default {
    name: "PokemonInformation",
    data() {
      return {
        pokemonName: "",
        pokemons: [],
        errorMessage: ""
      };
    },
    methods: {
      async searchPokemon() {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`);
          this.pokemons = [response.data];
        } catch (error) {
          this.errorMessage = "Ocorreu um erro ao buscar o Pokémon";
        }
      }
    }
  }
  </script>
  <style lang="scss">

  .pokemon{
    padding-top:50px;
    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }
    .title{
      text-align: center;
      color:#2e63aa;
    }
    input{
      border: 2px solid #f1c204;
      border-radius:2px;
      font-size:18px;
      height:32px;
    }
    button{
      margin-left:8px;
      background-color:#2e63aa;
      color: #f1c204;
      border: 2px solid #2e63aa;
      border-radius:10px;
      font-size:24px;
    }
    .img-container{
      justify-content: center  !important;
      align-content: center !important;
      display: flex !important;
      right:0;
      margin-top:32px;
    }
    .show-pokemon{
      display: block;
    }
    .pokemon-results {
      display: flex !important;
      align-items: center;
      margin-top: 20px;
    }
    @media (min-width: 320px ) and (max-width: 991px) {
      button{
        margin-left:4px;
        font-size:24px;
      }
    }
    @media (min-width: 1024px ) {
      button{
        margin-left:8px;
        font-size:18px;
        width: 150px;
        height: 32px;
      }
    }
  }
  </style>