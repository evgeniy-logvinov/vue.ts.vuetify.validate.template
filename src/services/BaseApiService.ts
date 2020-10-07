import axios, { AxiosInstance } from 'axios';
import TokenHelper from '@/helpers/TokenHelper';
import { v4 as uuidv4 } from 'uuid';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

const { API_URL: apiUrl } = process.env;

class BaseApiService {
  public http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: `${apiUrl}/v1`,
    });

    this.http.interceptors.request.use((config) => {
      const token = TokenHelper.getToken('accessToken') || undefined;

      if (token) {
        config.headers.Authorization = token && `Bearer ${token}`;
      }

      return config;
    });

    const refreshAuthLogic = (failedRequest: any) => this.http.post('/auth/refresh/', { RqUid: uuidv4(), refreshToken: TokenHelper.getToken('refreshToken') })
      .then((tokenRefreshResponse) => {
        const { accessToken, refreshToken } = tokenRefreshResponse.data;
        TokenHelper.setToken('accessToken', accessToken);
        TokenHelper.setToken('refreshToken', refreshToken);

        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;

        return Promise.resolve();
      })
      .catch((e) => {
        TokenHelper.removeToken('refreshToken');
        window.location.href = '/auth/get-link';

        return Promise.reject(e);
      });

    createAuthRefreshInterceptor(this.http, refreshAuthLogic, {
      pauseInstanceWhileRefreshing: true, // default: false
    });
  }
}

export default BaseApiService;
