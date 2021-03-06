import { Module, ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import UserFavoritesService from '@/services/UserFavoritesService';
import UserFavoritesState from '@/entities/states/UserFavoritesState';
import AllFavoritesEntity from '@/entities/AllFavoritesEntity';
import UserEntity from '@/entities/UserEntity';
import ProjectEntity from '@/entities/ProjectEntity';

const state = (): UserFavoritesState => ({
  projects: [],
  users: [],
});

const actions: any = {
  async getAllFavorites(context: ActionContext<UserFavoritesState, RootState>) {
    const { projects, users } = await UserFavoritesService.getAllFavorites();
    context.commit('setProjectsFavorites', projects);
    context.commit('setUsersFavorites', users);
  },

  async getAllFavoriteProjects(context: ActionContext<UserFavoritesState, RootState>) {
    const projects = await UserFavoritesService.getProjectsFavorites();
    context.commit('setProjectsFavorites', projects);
  },

  async getAllFavoriteUsers(context: ActionContext<UserFavoritesState, RootState>) {
    const users = await UserFavoritesService.getUsersFavorites();
    context.commit('setUsersFavorites', users);
  },

  async addFavoriteProject(context: ActionContext<UserFavoritesState, RootState>, id: number) {
    await UserFavoritesService.addFavoriteProject(id);
  },

  async addFavoriteUser(context: ActionContext<UserFavoritesState, RootState>, id: string) {
    await UserFavoritesService.addFavoriteUser(id);
  },

  async removeFavoriteProject(context: ActionContext<UserFavoritesState, RootState>, id: number) {
    await UserFavoritesService.removeFavoriteProject(id);
  },

  async removeFavoriteUser(context: ActionContext<UserFavoritesState, RootState>, id: string) {
    await UserFavoritesService.removeFavoriteUser(id);
  },
};

const mutations = {
  setAllFavorites(currentState: UserFavoritesState, allFavorites: AllFavoritesEntity): void {
    currentState.projects = [...allFavorites.projects];
    currentState.users = [...allFavorites.users];
  },

  setUsersFavorites(currentState: UserFavoritesState, usersFavorites: UserEntity[]): void {
    currentState.users = [...usersFavorites];
  },

  setProjectsFavorites(currentState: UserFavoritesState, projectsFavorites: ProjectEntity[]): void {
    currentState.projects = [...projectsFavorites];
  },

  changeProjectFavorite(currentState: UserFavoritesState, id: number): void {
    const currentProject = currentState.projects.find((el: ProjectEntity) => el.id === id);
    if (currentProject) {
      currentProject.isFavorite = !currentProject.isFavorite;
    }
  },
};

const namespaced = true;

const userFavorites: Module<UserFavoritesState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default userFavorites;
