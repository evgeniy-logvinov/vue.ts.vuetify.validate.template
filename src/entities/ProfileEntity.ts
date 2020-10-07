class ProfileEntity {
  id!: number;

  firstName?: string;

  lastName?: string;

  middleName?: string;

  email!: string;

  location?: string;

  about?: string;

  phone?: string;

  role?: string;

  imagePath?: string;

  skills?: string[];
}

export default ProfileEntity;
