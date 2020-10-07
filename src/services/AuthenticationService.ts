import { v4 as uuidv4 } from 'uuid';
import SignUpEntity from '@/entities/SignUpEntity';
import AuthInfoEntity from '@/entities/AuthInfoEntity';
import AuthEntity from '@/entities/AuthEntity';
import LoginEntity from '@/entities/LoginEntity';
import AuthMagicLinkEntity from '@/entities/AuthMagicLinkEntity';
import { AxiosResponse } from 'axios';
import BaseApiService from './BaseApiService';

class AuthenticationService extends BaseApiService {
  public postSignUp(data: SignUpEntity): Promise<AuthInfoEntity> {
    // Backend suggestion
    data.verifyPassword = data.password;

    return this.http.post<AuthInfoEntity>('/signup', data)
      .then((x) => x.data);
  }

  public postLogin(data: LoginEntity): Promise<AuthInfoEntity> {
    const stringToBase = `${data.email}:${data.password}`;

    return this.http.post<AuthInfoEntity>('/login', data, {
      headers: {
        Authorization: `Basic ${window.btoa(stringToBase)}`,
      },
    }).then((x) => x.data);
  }

  public postAuthMagicLink(email: string): Promise<AuthMagicLinkEntity> {
    return this.http.post<AuthMagicLinkEntity>('/auth/magicLink', { email, RqUid: uuidv4() })
      .then((x) => x.data);
  }

  public postSendMagicLink(email: string, tokenId: string): Promise<void> {
    return this.http.post<void>('/email/sendMagicLink', { email, tokenId, RqUid: uuidv4() })
      .then((x) => x.data);
  }

  public postRefreshToken(refreshToken: string): Promise<AuthEntity> {
    // @ts-ignore
    return this.http.post<AuthEntity, AxiosResponse<AuthEntity>>('/auth/refresh', { refreshToken, RqUid: uuidv4() }, { skipAuthRefresh: true })
      .then((x: AxiosResponse<AuthEntity>) => x.data);
  }
}

export default new AuthenticationService();
