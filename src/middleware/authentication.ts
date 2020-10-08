import TokenHelper from '@/helpers/TokenHelper';
import AuthenticationService from '@/services/AuthenticationService';

export default async function ({ next, store }: any) {
  if (TokenHelper.getToken('accessToken')) {
    await store.dispatch('user/getSelf');

    return;
  }

  if (TokenHelper.getToken('refreshToken')) {
    try {
      const { accessToken, refreshToken } = await AuthenticationService.postRefreshToken(TokenHelper.getToken('refreshToken'));
      TokenHelper.setToken('accessToken', accessToken);
      TokenHelper.setToken('refreshToken', refreshToken);
      await store.dispatch('user/getSelf');

      return;
    } catch (e) {
      // eslint-disable-next-line consistent-return
      return next('/auth/get-link');
    }
  }

  // eslint-disable-next-line consistent-return
  return next('/auth/get-link');
}
