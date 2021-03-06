import { ActionContext, Module } from 'vuex';
import AllUsersState from '@/entities/states/AllUsersState';
import RootState from '@/entities/states/RootState';
import UserEntity from '@/entities/UserEntity';
import UserService from '@/services/UserService';
import UsersFilterEntity from '@/entities/UsersFilterEntity';

const state = (): AllUsersState => ({
  users: [],
  filter: {
    role: '',
    location: '',
    hasActiveProjects: false,
  },
});

const getters = {
  users({ users, filter: { hasActiveProjects, role, location } }: AllUsersState) {
    return [...users]
      // @ts-ignore
      .sort((a, b) => {
        const aName: string = a.fullName || '';
        const bName: string = b.fullName || '';

        if (aName > bName) {
          return -1;
        }

        return aName < bName ? 1 : 0;
      })
      .filter((user) => {
        const roleLowerCase = role && role.toLowerCase();
        const locationLowerCase = location && location.toLowerCase();
        const isSearchRoleIncludes = !roleLowerCase
            || user?.role?.toLowerCase().includes(roleLowerCase);
        const isSearchLocationIncludes = !locationLowerCase
            || user?.location?.toLowerCase().includes(locationLowerCase);

        // Когда бэкенд закончат, тут нужно сделать на активные проекты проверку
        const isSearchHasActiveProjectsIncludes = !hasActiveProjects;

        return isSearchRoleIncludes
          && isSearchLocationIncludes
          && isSearchHasActiveProjectsIncludes;
      });
  },
};

const actions: any = {
  async getAllUsers(context: ActionContext<AllUsersState, RootState>) {
    const users = await UserService.get();

    context.commit('setUsers', users);
  },
};

const mutations = {
  setUsers(currentState: AllUsersState, users: UserEntity[]): void {
    currentState.users = [...users];
  },

  setFilter(currentState: AllUsersState, filter: UsersFilterEntity): void {
    currentState.filter = { ...filter };
  },

  setSearchRoleFilter(currentState: AllUsersState, role: string): void {
    currentState.filter.role = role;
  },

  setSearchLocationFilter(currentState: AllUsersState, location: string): void {
    currentState.filter.location = location;
  },

  setHasActiveProjectsFilter(currentState: AllUsersState, hasActiveProjects: boolean): void {
    currentState.filter.hasActiveProjects = hasActiveProjects;
  },

};

const namespaced = true;

const allUsers: Module<AllUsersState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default allUsers;
