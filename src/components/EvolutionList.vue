<template>
  <div class="evolution-list">
    <h4>Evoluções:</h4>
    <div class="evolution-grid">
      <div v-for="evolution in evolutions" :key="evolution.id" class="evolution-item" :class="{ 'flipped': evolution.showInfo }">
        <div class="evolution-card" @click="showEvolutionInfo(evolution)">
          <div class="card-front">
            <h6>{{ capitalizeFirstLetter(evolution.name) }}</h6>
            <img v-if="evolution.sprite" :src="evolution.sprite" alt="Evolution sprite">
          </div>
          <div class="card-back" v-if="evolution.showInfo">
            <ul class="pokemon-info">
              <li v-for="(stat, index) in evolution.stats" :key="index">
                {{ stat.name }}: <span class="info-value">{{ stat.base_stat }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    evolutions: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async showEvolutionInfo(evolution) {
      evolution.showInfo = !evolution.showInfo;
      if (evolution.showInfo && !evolution.stats) {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution.name.toLowerCase()}`);
          const stats = response.data.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          }));
          evolution.stats = stats;
        } catch (error) {
          console.error('Error fetching evolution stats:', error);
        }
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style lang="scss">
.evolution-list {
  margin-top: 20px;
  width: 100%
}

h4 {
  margin-bottom: 10px;
}

.evolution-grid {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaçamento horizontal entre os itens */
  width: 100% !important;
}

.evolution-item {
  width: 220px; 
  height: 250px; 
  perspective: 1000px; /* Define a perspectiva para a rotação da carta */
  margin-bottom: 20px;
}
.evolution-card {
  width: 220px; 
  height: 250px; 
  position: relative;
  transform-style: preserve-3d; /* Mantém a perspectiva da rotação */
  transition: transform 0.5s; /* Adiciona uma transição suave de rotação */
}

.evolution-card:hover {
  cursor: pointer;
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Esconde o verso da carta */
}

.card-front {
  border-radius: 8px; 
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.card-back {
  border-radius: 8px; 
  background-color: #f0f0f0;
  transform: rotateY(180deg); /* Rotaciona o verso da carta */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.flipped .evolution-card {
  transform: rotateY(180deg); /* Rotaciona a carta ao clicar */
}

img {
  width: 80px; /* Redimensiona o tamanho do sprite */
  height: 80px; /* Redimensiona o tamanho do sprite */
}

.pokemon-info {
  list-style: none;
  padding: 10px;
  margin: 0;
}

.info-value {
  font-weight: bold;
}

@media (max-width: 768px) {
  .evolution-grid {
    justify-content: center; 
    flex-wrap: wrap;
  }
}
</style>
