import { Module, ActionContext } from 'vuex';
import RegistrationState from '@/entities/states/RegistrationState';
import RootState from '@/entities/states/RootState';
import AuthenticationService from '@/services/AuthenticationService';
import SignUpEntity from '@/entities/SignUpEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import AuthMagicLinkEntity from '@/entities/AuthMagicLinkEntity';
import AuthEntity from '@/entities/AuthEntity';
import LoginEntity from '@/entities/LoginEntity';
import MagicLinkEntity from '@/entities/MagicLinkEntity';
import TokenHelper from '@/helpers/TokenHelper';
import router from '@/router';

const state = (): RegistrationState => ({
  signup: {
    email: '',
    name: '',
    openLandProfileLink: '',
    password: '',
    userRole: '',
    verifyPassword: '',
  },
  authInfo: {
    accessToken: '',
    refreshToken: '',
  },
});

const actions: any = {
  async postSignUp(context: ActionContext<RegistrationState, RootState>, signup: SignUpEntity) {
    const authInfo: AuthInfoEntity = await AuthenticationService.postSignUp(signup);

    context.commit('setSignUpInfo', authInfo);
    await context.dispatch('user/login', authInfo, { root: true });

    if (context.rootState.user.toAfterLogin) {
      await router.push(context.rootState.user.toAfterLogin);
    }
  },

  async postLogin(context: ActionContext<RegistrationState, RootState>, login: LoginEntity) {
    const authInfo: AuthInfoEntity = await AuthenticationService.postLogin(login);

    context.commit('setSignUpInfo', authInfo);
    await context.dispatch('user/login', authInfo, { root: true });

    if (context.rootState.user.toAfterLogin) {
      await router.push(context.rootState.user.toAfterLogin);
    }
  },

  async signUpByMagicLink(
    context: ActionContext<RegistrationState, RootState>,
    magicLink: MagicLinkEntity,
  ) {
    const authInfo: AuthEntity = await AuthenticationService.postRefreshToken(magicLink.token);

    context.commit('setSignUpInfo', authInfo);

    TokenHelper.setToken('accessToken', authInfo.accessToken);
    TokenHelper.setToken('refreshToken', authInfo.refreshToken);

    if (magicLink.redirect) {
      await router.push(magicLink.redirect);
    } else {
      console.log('aa', magicLink.redirect);
      await router.push('/');
    }
  },

  async getMagicLink(context: ActionContext<RegistrationState, RootState>, email: string) {
    const { tokenId }: AuthMagicLinkEntity = await AuthenticationService.postAuthMagicLink(email);
    await AuthenticationService.postSendMagicLink(email, tokenId);
  },
};

const mutations = {
  setSignUpInfo(currentState: RegistrationState, authInfo: AuthEntity): void {
    currentState.authInfo = authInfo;
  },
};

const namespaced = true;

const registration: Module<RegistrationState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
};

export default registration;
