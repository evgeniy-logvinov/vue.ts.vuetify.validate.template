import CookieHelper from '@/helpers/CookieHelper';
import jwtDecode from 'jwt-decode';

type TokenType = 'accessToken' | 'refreshToken';

class TokenHelper {
  static getToken = (tokenType: TokenType) => CookieHelper.getCookie(tokenType);

  static setToken = (tokenType: TokenType, jwtToken: string) => {
    const { exp } = jwtDecode(jwtToken);

    CookieHelper.setCookie(tokenType, jwtToken, exp);
  };

  static removeToken = (tokenType: TokenType) => CookieHelper.removeCookie(tokenType);
}

export default TokenHelper;
