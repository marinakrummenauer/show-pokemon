import Vue from 'vue';
import Router from 'vue-router';
import PokemonInformation from '@/components/PokemonInformation';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'PokemonInformation',
    component: PokemonInformation
  }
]

export default new Router({
  routes
})