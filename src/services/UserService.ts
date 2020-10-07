import { v4 as uuidv4 } from 'uuid';
import LocationEntity from '@/entities/LocationEntity';
import UserEntity from '@/entities/UserEntity';
import BaseApiService from './BaseApiService';

class UserService extends BaseApiService {
  public getSelfData(): Promise<UserEntity> {
    const RqUid = uuidv4();

    return this.http.get(`/user?RqUid=${RqUid}`).then((x) => x.data.user);
  }

  public getById(id: string): Promise<UserEntity> {
    const RqUid = uuidv4();

    return this.http.get(`/users/${id}?RqUid=${RqUid}`).then((x) => x.data.user);
  }

  public update(profile: UserEntity): Promise<number | string> {
    const body = {
      ...profile,
      RqUid: uuidv4(),
      role: profile.role || undefined,
    };

    return this.http.put<UserEntity>('/user/', body).then((x) => x.data.id);
  }

  public uploadImage(file: any): Promise<number | string> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<any>(`/profile/uploadImage?RqUid=${uuidv4()}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((x) => x.data.url);
  }

  public get(): Promise<UserEntity[]> {
    return this.http.get<UserEntity[]>('/users').then((x) => x.data);
  }

  public postLocations(userInput: string): Promise<LocationEntity[]> {
    return this.http.post('/location', { userInput, RqUid: uuidv4() }).then((x) => x.data.location);
  }
}

export default new UserService();
