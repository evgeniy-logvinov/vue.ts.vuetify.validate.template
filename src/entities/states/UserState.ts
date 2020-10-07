import { RawLocation } from 'vue-router/types/router';
import UserEntity from '@/entities/UserEntity';
import UserContactEntity from '@/entities/UserContactEntity';

interface UserState {
  isAuthorize: boolean;
  user: UserEntity;
  contacts: UserContactEntity[];
  token?: string;
  toAfterLogin?: RawLocation;
}

export default UserState;
