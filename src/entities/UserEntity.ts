import UserContactEntity from '@/entities/UserContactEntity';

class UserEntity {
  id!: string;

  fullName!: string;

  username?: string;

  email?: string;

  imagePath?: string;

  location!: string;

  about?: string;

  role?: string;

  skills?: string[];

  isFriend?: boolean;

  contacts?: UserContactEntity[];
}

export default UserEntity;
