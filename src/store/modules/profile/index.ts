import { Module, ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
import UserEntity from '@/entities/UserEntity';
import UserService from '@/services/UserService';
import ProfileService from '@/services/ProfileService';
import ProfileState from '@/entities/states/ProfileState';
import ProfileEntity from '@/entities/ProfileEntity';

const state = (): ProfileState => ({
  profile: {
    id: '',
    fullName: '',
    email: '',
    contacts: [],
    location: '',
  },
  profileSearchResult: [],
  isMoreProfiles: true,
  friendsSearchResult: [],
  isMoreFriends: true,
});

const actions: any = {

  async getProfile(
    { commit }: ActionContext<ProfileState, RootState>,
    userId: string,
  ) {
    const profile = await UserService.getById(userId);

    commit('setProfile', profile);
  },

  async findProfile(
    { commit, state: currentState }: ActionContext<ProfileState, RootState>,
    data: any,
  ) {
    const { fullQuery, currentPage } = data;
    const query = fullQuery.split(' ');
    const request: any[] = [];
    query.forEach((queryItem: string) => {
      if (queryItem !== '') {
        request.push({
          fullName: queryItem,
          username: queryItem,
          location: queryItem,
          about: queryItem,
          role: queryItem,
          skills: queryItem,
        });
      }
    });
    const profileSearchResult = await ProfileService.findByQuery(
      request,
      currentPage,
    );
    let searchResult = [];
    if (currentPage !== 1) {
      searchResult = [
        ...currentState.profileSearchResult,
        ...profileSearchResult.entries.data,
      ];
    } else {
      searchResult = profileSearchResult.entries.data;
    }
    commit('setSearchResult', searchResult);
    if (profileSearchResult.entries.data.length < 20) {
      commit('setMoreProfiles', false);
    } else {
      commit('setMoreProfiles', true);
    }
  },

  async findFriends(
    { commit, state: currentState }: ActionContext<ProfileState, RootState>,
    data: any,
  ) {
    const { fullQuery, currentPage } = data;
    const query = fullQuery.split(' ');
    const request: any[] = [];
    query.forEach((queryItem: string) => {
      if (queryItem !== '') {
        request.push({
          fullName: queryItem,
          username: queryItem,
          location: queryItem,
          about: queryItem,
          role: queryItem,
          skills: queryItem,
        });
      }
    });
    const friendsSearchResult = await ProfileService.findFriendsByQuery(
      request,
      currentPage,
    );
    let searchFriendsResult = [];
    if (currentPage !== 1) {
      searchFriendsResult = [
        ...currentState.friendsSearchResult,
        ...friendsSearchResult.entries.data,
      ];
    } else {
      searchFriendsResult = friendsSearchResult.entries.data;
    }
    commit('setSearchFriendsResult', searchFriendsResult);
    if (friendsSearchResult.entries.data.length < 20) {
      commit('setMoreFriends', false);
    } else {
      commit('setMoreFriends', true);
    }
  },
};

const mutations = {
  setProfile(currentState: ProfileState, profile: UserEntity): void {
    currentState.profile = { ...profile };
  },

  setMoreProfiles(currentState: ProfileState, isMoreProfiles: boolean): void {
    currentState.isMoreProfiles = isMoreProfiles;
  },

  setMoreFriends(currentState: ProfileState, isMoreFriends: boolean): void {
    currentState.isMoreFriends = isMoreFriends;
  },

  setSearchResult(
    currentState: ProfileState,
    profileSearchResult: ProfileEntity[],
  ): void {
    currentState.profileSearchResult = [...profileSearchResult];
  },
  setSearchFriendsResult(
    currentState: ProfileState,
    friendsSearchResult: ProfileEntity[],
  ): void {
    currentState.friendsSearchResult = [...friendsSearchResult];
  },
};

const namespaced = true;

const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default profile;
