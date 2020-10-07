import UserState from '@/entities/states/UserState';
import CookieHelper from '@/helpers/CookieHelper';
import { Module, ActionContext } from 'vuex';
import RootState from '@/entities/states/RootState';
// import { RawLocation } from 'vue-router/types/router';
import UserEntity from '@/entities/UserEntity';
import UserService from '@/services/UserService';
import SavingProjectState from '@/entities/states/SavingProjectState';
import FileEntity from '@/entities/FileEntity';
import LocationEntity from '@/entities/LocationEntity';
import UserContactEntity from '@/entities/UserContactEntity';
import UserContactService from '@/services/UserContactService';

const state = (): UserState => ({
  isAuthorize: false,
  user: {
    id: '',
    fullName: '',
    email: '',
    contacts: [],
    location: '',
  },
  contacts: [],
});

const actions: any = {
  nuxtClientInit({ commit }: ActionContext<UserState, RootState>) {
    const token = CookieHelper.getCookie('token');
    const user = CookieHelper.getCookie('user');

    commit('setToken', token);
    commit('setUser', user && JSON.parse(user));
    commit('setIsAuthorize', !!token);
  },

  async getSelf({ commit }: ActionContext<UserState, RootState>) {
    const user = await UserService.getSelfData();

    commit('setUser', user);
  },

  async getContacts({ commit }: ActionContext<UserState, RootState>) {
    const contacts = await UserContactService.getSelfContacts();

    commit('setContacts', contacts);
  },

  async saveAvatar(
    { commit }: ActionContext<SavingProjectState, RootState>,
    avatar: FileEntity,
  ) {
    const imagePath = await UserService.uploadImage(avatar.file);
    commit('setImagePath', imagePath);

    return imagePath;
  },

  async saveUser(context: ActionContext<UserState, RootState>) {
    await UserService.update(context.state.user!);

    context.commit('setUser', context.state.user);
  },

  async postLocations(
    context: ActionContext<UserState, RootState>, userInput: string,
  ): Promise<LocationEntity[]> {
    return UserService.postLocations(userInput);
  },

  async saveContacts(
    context: ActionContext<UserState, RootState>,
  ) {
    const {
      contacts,
    } = context.state;

    const savingPromises = contacts.filter((item) => item.url).map(async (contact) => {
      if (contact.id) {
        await UserContactService.update(contact);

        return contact;
      }

      const id = await UserContactService.create(contact);

      return { ...contact, id };
    });

    const deletingPromises = contacts
      .filter((item) => item.id && !item.url)
      .map(({ id }) => UserContactService.delete(id));

    const newContacts = await Promise.all(savingPromises);

    if (deletingPromises.length) await Promise.all(deletingPromises);

    context.commit('setContacts', newContacts);
  },
};

const mutations = {
  setIsAuthorize(currentState: UserState, isAuthorize: boolean): void {
    currentState.isAuthorize = isAuthorize;
  },

  setToken(currentState: UserState, token?: string): void {
    currentState.token = token;
  },

  setUser(currentState: UserState, user: UserEntity): void {
    currentState.user = { ...user };
  },

  setToAfterLogin(currentState: UserState, toAfterLogin?: any): void {
    currentState.toAfterLogin = toAfterLogin;
  },

  setBasicInfo(currentState: UserState, user: UserEntity): void {
    currentState.user = {
      ...user,
      contacts: currentState.user!.contacts,
      skills: currentState.user!.skills,
    };
  },

  setSkills(currentState: UserState, skills: string[]): void {
    currentState.user.skills = [...skills];
  },

  setContacts(currentState: UserState, contacts: UserContactEntity[]): void {
    currentState.contacts = [...contacts];
  },

  setImagePath(currentState: UserState, imagePath: string): void {
    currentState.user.imagePath = imagePath;
  },
};

const namespaced = true;

const user: Module<UserState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default user;
