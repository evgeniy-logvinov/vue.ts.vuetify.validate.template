import UserEntity from '@/entities/UserEntity';
import ProfileEntity from '@/entities/ProfileEntity';

interface ProfileState {
  profile: UserEntity;
  profileSearchResult: ProfileEntity[];
  friendsSearchResult: ProfileEntity[];
  isMoreProfiles: boolean;
  isMoreFriends: boolean;
}

export default ProfileState;
