// import ProfileEntity from '@/entities/ProfileEntity';

import BaseApiService from './BaseApiService';

class ProfileService extends BaseApiService {
  // TODO(skobak): replace it with real RqUid later
  extraRqUid = '1cd24584-6f61-444a-ad8e-1010940d799c';

  public findByQuery(query: any[], currentPage: number): Promise<any> {
    return this.http
      .post<any>('/profile/search/', {
        RqUid: this.extraRqUid,
        query,
        currentPage,
      })
      .then((x) => x.data);
  }

  public findFriendsByQuery(query: any[], currentPage: number): Promise<any> {
    return this.http
      .post<any>('/profile/search/', {
        RqUid: this.extraRqUid,
        query,
        currentPage,
        onlyFriends: true,
      })
      .then((x) => x.data);
  }
}

export default new ProfileService();
