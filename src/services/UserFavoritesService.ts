import AllFavoritesEntity from '@/entities/AllFavoritesEntity';
import UserEntity from '@/entities/UserEntity';
import ProjectEntity from '@/entities/ProjectEntity';
import { v4 as uuidv4 } from 'uuid';
import BaseApiService from './BaseApiService';

class UserFavoritesService extends BaseApiService {
  public addFavoriteProject(id: number): Promise<number> {
    return this.http.post<number>(`/user/favorites/project/${id}`).then((x) => x.data);
  }

  public removeFavoriteProject(id: number): Promise<number> {
    return this.http.delete<number>(`/user/favorites/project/${id}`).then((x) => x.data);
  }

  public getAllFavorites(): Promise<AllFavoritesEntity> {
    return this.http.get<AllFavoritesEntity>('/user/favorites').then((x) => x.data);
  }

  public getUsersFavorites(): Promise<UserEntity[]> {
    return this.http.get<UserEntity[]>('/user/favorites/user').then((x) => x.data);
  }

  public getProjectsFavorites(): Promise<ProjectEntity[]> {
    return this.http.get<ProjectEntity[]>('/user/favorites/project').then((x) => x.data);
  }

  public async addFavoriteUser(id: string): Promise<void> {
    const RqUid = uuidv4();
    await this.http.post<number>(`/user/friend/${id}?RqUid=${RqUid}`).then((x) => x.data);
  }

  public async removeFavoriteUser(id: string): Promise<void> {
    const RqUid = uuidv4();
    await this.http.delete<number>(`/user/friend/${id}?RqUid=${RqUid}`).then((x) => x.data);
  }
}

export default new UserFavoritesService();
