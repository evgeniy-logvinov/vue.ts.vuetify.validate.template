import { RawLocation } from 'vue-router/types/router';

class MagicLinkEntity {
  token!: string;

  redirect?: RawLocation;
}

export default MagicLinkEntity;
