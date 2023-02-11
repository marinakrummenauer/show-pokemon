<template>
    <div class="pokemon">
        <h1 class="title">Localize seu</h1> 
      <span class="img-container">
        <img class="logo-pokemon align-center" src="@/assets/pokemon-logo.png">
      </span>
      <div class="form-container">
        <form @submit.prevent="searchPokemon">
          <input type="text" v-model="pokemonName" placeholder="Pesquise seu Pokémon">
          <button class="search" type="submit">Buscar</button>
        </form>
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
          <button class="close" type="button" @click="clearErrorMessage">X</button>
        </div>
        <div class="pokemon-results">
        <ul v-if="pokemons.length">
          <li v-for="pokemon in pokemons"  v-bind:key="pokemon.id">
            <h2>{{ pokemon.name.toUpperCase()  }}</h2>
            <img :src="pokemon.sprites.front_default" alt="Pokemon sprite" @click="showPokemonInfo(pokemon)">
            <ul class="pokemon-info-container" v-if="pokemon.showInfo">
              <li>HP: <span class="info-value">{{ pokemon.stats[5].base_stat }} </span></li>
              <li>Attack: <span class="info-value">{{ pokemon.stats[4].base_stat }} </span> </li>
              <li>Defense: <span class="info-value">{{ pokemon.stats[3].base_stat }} </span></li>
              <li>Special Attack: <span class="info-value">{{ pokemon.stats[2].base_stat }}</span></li>
              <li>Special Defense: <span class="info-value">{{ pokemon.stats[1].base_stat }}</span></li>
              <li>Speed: <span class="info-value">{{ pokemon.stats[0].base_stat }}</span></li>
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
      }
    },
    created() {
      this.pokemons.forEach(pokemon => {
        pokemon.showInfo = false;
      })
    },
    methods: {
      async searchPokemon() {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName.toLowerCase()}`);
          const pokemon = response.data;
          pokemon.showInfo = false;
          this.pokemons = [pokemon];
        } catch (error) {
          this.errorMessage = "Pokémon inexistente";
        }
      },
      showPokemonInfo(pokemon) {
        console.log('showPokemonInfo');
        pokemon.showInfo = !pokemon.showInfo;
      },
      clearErrorMessage() {
        this.errorMessage = "";
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
      flex-direction: column;
    }
    .title{
      text-align: center;
      color:#2e63aa;
    }
    input{
      border: 2px solid #f1c204;
      border-radius:2px;
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
    }
    .show-pokemon{
      display: block;
    }
    .pokemon-results {
      display: flex !important;
      margin-top: 20px;
      justify-content: center;
        h2{
          color:#2e63aa;
          font-weight: 700 ;
          justify-content: center;
          align-items: center;
        }
    }
    .close{
      margin-left: 8px;
      font-size: 18px;
      width: 30px;
      height: 30px;
      color:#842029;
      border-color:#f5c2c7;
      background-color: #f8d7da;;
    }
    .pokemon-info {
      display: none;
    }
    .alert-danger{
      margin-top:24px;
    }
    li {
      list-style-type: none;
      padding:10px 20px;
      font-weight: 400 ;
      color: #2e63aa;
    }
    .pokemon-info-container {
      border: 4px solid #f1c204;
      padding: 10px;
      margin-top: 10px;
      margin-right: 20px;
        .info-value{
          color:#f1c204;
          font-weight: 800;
        }
    }
    @media (min-width: 320px ) and (max-width: 991px) {
      button{
        margin-left:4px;
        font-size:24px;
        display: flex  !important;
        margin-top:16px;
        align-items: center;
      }
      .logo-pokemon {
        width:250px;
      }
      .img-container{
        margin-top:18px;
      }
      input{
        display: flex;
        font-size:18px;
        height:32px;
        width:285px;
      }
      .form-container{
        margin-top:24px;
      }
      li {
        padding-top:10px;
        font-size:24px ;
      }
      .pokemon-info-container {
        width: 280px;
      }
      .pokemon-results{
        margin-right: 8px;
      }
    }
    @media (min-width: 1024px ) {
      button{
        margin-left:8px;
        font-size:36px;
        width: 180px;
        height: 56px;
      }
      .img-container{
        margin-top:32px;
      }
      .logo-pokemon {
        width:500px;
      }
      .form-container{
        margin-top:32px;
      }
      input{
        font-size:28px;
        height:46px;
      }
      li {
        padding-top:10px;
        font-size:36px ;
      }
      .pokemon-info-container {
        width: 500px;
      }

    }
  }
  </style>