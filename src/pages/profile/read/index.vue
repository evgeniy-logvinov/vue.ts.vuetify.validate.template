<template>
  <MenuLayout>
    <div v-if="!loadingPage" class="profile">
      <div class="profile__content">
        <div class="profile__header">
          <div class="profile__wrapper">
            <div class="profile__avatar">
              <Avatar
                :username="profile.fullName || ''"
                :src="profile.imagePath"
                class="avatar"
                :custom-style="{ 'background-size': 'cover', width: '100%', height: '100%' }"
              />
            </div>
            <div class="profile-edit-form__header-info">
              <h1 class="profile-edit-form__name">
                {{ profile.fullName }}<span class="dot">.</span>
              </h1>
              <div class="profile-edit-form__buttons-wrapper">
                <div v-if="profile.role" class="profile-edit-form__role">
                  <p>
                    {{ profile.role }}
                  </p>
                </div>
                <TButton
                  v-if="profile.id === currentUser.id"
                  class="profile-edit-form__submit-btn"
                  type="submit"
                  theme="outline-primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="$router.push('/profile/edit')"
                >
                  Редактировать профиль
                </TButton>
                <TButton
                  v-if="profile.isFriend"
                  class="profile-edit-form__submit-btn"
                  type="submit"
                  theme="outline-primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="removeFriend"
                >
                  Удалить из избранных
                </TButton>

                <TButton
                  v-if="!profile.isFriend && profile.id !== currentUser.id"
                  class="profile-edit-form__submit-btn"
                  type="submit"
                  theme="outline-primary"
                  :loading="loading"
                  :disabled="loading"
                  @click="addFriend"
                >
                  Добавить в избранное
                </TButton>
              </div>
            </div>
          </div>
          <div class="profile__main-wrapper">
            <div class="profile__main-info">
              <h2 class="profile__subhead-title">
                Основная информация
              </h2>
              <ul>
                <li v-if="profile.location">
                  <LocationIcon />
                  <p>
                    {{ profile.location }}
                  </p>
                </li>
                <li v-if="websiteContact">
                  <SiteIcon />
                  <a :href="websiteContact.url" target="_blank">
                    {{ websiteContact.url }}
                  </a>
                </li> <!-- should be site field -->
                <li v-if="profile.email">
                  <EmailIcon />
                  <a :href="`mailto:${profile.email}`" target="_blank">
                    {{ profile.email }}
                  </a>
                </li>
              </ul>
            </div>
            <div v-if="contacts" class="profile__contacts-links">
              <ul>
                <li v-for="contact in contacts" :key="contact.title" class="contact-link">
                  <a :href="contact.url" target="_blank"><component :is="contact.icon" /></a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h2 class="profile__subhead-title">
              Обо мне
            </h2>
            <p class="profile__about">
              {{ profile.about }}
            </p>
          </div>
          <div>
            <h2 class="profile__subhead-title">
              Чем могу помочь / навыки
            </h2>
            <ul class="profile__skills">
              <li v-for="(item) in profile.skills" :key="item" class="skill">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Action, Mutation } from 'vuex-class';
import Avatar from 'vue-avatar';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import UserEntity from '@/entities/UserEntity';
import LocationIcon from '@/static/images/svg/profile/location-icon.svg';
import SiteIcon from '@/static/images/svg/profile/site-icon.svg';
import EmailIcon from '@/static/images/svg/profile/mail-icon.svg';
import FacebookIcon from '@/static/images/svg/social/facebook.svg';
import InstagramIcon from '@/static/images/svg/social/instagram.svg';
import LinkedinIcon from '@/static/images/svg/social/linkedin.svg';
import OpenlandIcon from '@/static/images/svg/social/openland.svg';
import TelegramIcon from '@/static/images/svg/social/telegram.svg';
import TwitterIcon from '@/static/images/svg/social/twitter.svg';
import VkIcon from '@/static/images/svg/social/vk.svg';
import UserContactEntity from '@/entities/UserContactEntity';

@Component({
  components: {
    MenuLayout,
    Avatar,
    LocationIcon,
    SiteIcon,
    EmailIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    OpenlandIcon,
    TelegramIcon,
    TwitterIcon,
    VkIcon,
  },
  // validate({ query }) {
  //   return !!query.id;
  // },
})
export default class MainPageComponent extends Vue {
  @State('user', { namespace: 'user' }) currentUser!: UserEntity;

  @State('profile', { namespace: 'profile' }) profileData!: UserEntity;

  @Mutation('setProfile', { namespace: 'profile' }) setProfile!: (profile: UserEntity) => void;

  @Mutation('resetState', { namespace: 'profile' }) resetProfileState!: () => void;

  @Action('getProfile', { namespace: 'profile' })
  getProfile!: (userId: string) => Promise<void>;

  @Action('addFavoriteUser', { namespace: 'userFavorites' })
  addFavoriteUser!: (userId: string) => Promise<void>;

  @Action('removeFavoriteUser', { namespace: 'userFavorites' })
  removeFavoriteUser!: (userId: string) => Promise<void>;

  loading = false;

  loadingPage = true;

  get isCurrentUser() {
    return this.$route.query.id === this.currentUser.id;
  }

  get websiteContact() {
    return this.profile.contacts?.find((item) => item.title === 'Website');
  }

  get profile() {
    if (this.isCurrentUser) {
      return this.currentUser;
    }

    return this.profileData;
  }

  async created() {
    if (!this.isCurrentUser) {
      await this.getProfile(this.$route.query.id as string);
    }

    this.loadingPage = false;
  }

  async addFriend() {
    this.loading = true;
    try {
      await this.addFavoriteUser(this.profile.id);
      this.setProfile({
        ...this.profile,
        isFriend: true,
      });
    } finally {
      this.loading = false;
    }
  }

  async removeFriend() {
    this.loading = true;
    try {
      await this.removeFavoriteUser(this.profile.id);
      this.setProfile({
        ...this.profile,
        isFriend: false,
      });
    } finally {
      this.loading = false;
    }
  }

  socialMedia = [
    {
      title: 'Instagram',
      icon: InstagramIcon,
    },
    {
      title: 'Telegram',
      icon: TelegramIcon,
    },
    {
      title: 'ВКонтакте',
      icon: VkIcon,
    },
    {
      title: 'Twitter',
      icon: TwitterIcon,
    },
    {
      title: 'Facebook',
      icon: FacebookIcon,
    },
    {
      title: 'LinkedIn',
      icon: LinkedinIcon,
    },
  ];

  get contacts() {
    return this.profile.contacts?.reduce(
            (accumulator: any[], currentValue: UserContactEntity) => {
              const social = this.socialMedia.find(({ title }) => currentValue.title === title);

              if (social) {
                return [
                  ...accumulator,
                  {
                    ...social,
                    url: currentValue.url,
                  },
                ];
              }

              return accumulator;
            }, []);
  }

  destroy() {
    this.resetProfileState();
  }
}
</script>

<style lang="postcss" scoped>

.profile {
  width: 100%;
  min-width: 300px;
  max-width: 500px;
  flex-direction: column;
  align-items: center;

  h2 {
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .dot {
    color: var(--primaryColor);
  }
  &__skills {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    //width: 600px;
    margin-left: -15px;
  }
  &__skills li {
    background: var(--lightGrayColor);
    float: left;
    border-radius: 5px;
    padding: 10px;
    color: var(--greyColor);
    margin: 0 0 20px 15px;
   }

  &__avatar {
     margin-bottom: 30px;
     width: 100px;
     min-width: 100px;
     height: 100px;
     min-height: 100px;

    .avatar {
      background-size: cover!important;
    }
   }

  &__content {
     display: flex;
     flex-direction: column;
     //width: 100%;
   }

  &__header {
     margin-bottom: 30px;
   }

  &__wrapper {
    display: flex;
  }

  &__subhead-title {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 30px !important;
  }

  &__main-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }

  &__main-info {
    li {
      font-size: 16px;
      font-weight: 400;
      display: flex;
      align-items: center;
      margin-bottom: 25px;

      p {
        margin-left: 20px;
      }

      a {
        margin-left: 20px;
      }
    }
  }

  &__about {
    margin-bottom: 30px;
    white-space: pre-line;
  }

  &__contacts-links {
    width: 360px;
    height: 23px;
    margin-top: 4px;
    ul {
      display: flex;

      .contact-link {
        margin-left: 20px;
        //width: 24px;
        //height: 24px;
      }
    }
  }
}

.profile-edit-form {
  &__header-info {
    margin: 0 auto auto 20px;
  }
  &__name {
    font-size: 30px;
    line-height: 100%;
    font-weight: 700;
  }

  &__buttons-wrapper {
    display: flex;
    align-items: flex-start;
    margin-top: 0px;
    flex-direction: column;
  }

  &__role {
    height: 20px;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    text-align: center;
    color: var(--greyColor);
    margin-right: 30px;
  }

  &__submit-btn {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 700;
  }
}

@media (min-width: 992px) {
  .profile {
    max-width: 60vw;

    &__skills {
      width: 600px;
    }

    &__avatar {
      width: 200px;
      min-width: 200px;
      height: 200px;
      min-height: 200px;
    }
  }

  .profile-edit-form {
    &__header-info {
      margin: 15px auto auto 25px;
    }

    &__name {
      font-size: 68px;
      line-height: 85%;
    }
    &__buttons-wrapper {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 40px;
    }

    &__submit-btn {
      margin-top: 0;
      font-size: 18px;
    }
  }

  .profile-edit-page {
    max-width: 930px;
    display: flex;

    &__content {
       display: flex;
       flex-direction: row;
     }

    &__form {
       max-width: 980px;
     }

    &__header {
       margin-bottom: 50px;
     }

    &__avatar {
       margin-bottom: 50px;
       width: 100px;
       min-width: 100px;
       height: 100px;
       min-height: 100px;
     }

    &__block {
       margin-bottom: 50px;
       max-width: 800px;
     }
  }
}

@media (min-width: 1200px) {
  .profile-edit-page {
    display: flex;
    max-width: 1108px;
  }
}

@media (min-width: 1200px) {
  .profile-edit-page {
    display: flex;
    max-width: 1400px;
  }
}
</style>
