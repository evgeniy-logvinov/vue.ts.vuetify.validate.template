import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import RootState from '@/entities/states/RootState';
import {
  allProjects,
  allUsers,
  labels,
  myProjects,
  profile,
  registration,
  savingProject,
  user,
  userFavorites,
} from '@/store/modules';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    allProjects,
    allUsers,
    labels,
    myProjects,
    profile,
    registration,
    savingProject,
    user,
    userFavorites,
  },
};

export default new Vuex.Store<RootState>(store);
