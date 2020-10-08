<template>
  <form class="profile-edit-form" @submit.prevent="submitForm">
    <!-- Шапка профиля -->
    <div class="profile-edit-form__header">
      <AvatarChooser
        class="profile-edit-form__avatar"
        name="avatar-logo-chooser"
        :base-src="profile.imagePath"
        :username="profile.fullName"
        @change="avatarChanged"
      />
      <div class="profile-edit-form__header-info">
        <TButton
          class="profile-edit-form__submit-btn"
          type="submit"
          theme="outline-primary"
          :loading="loading"
          :disabled="loading"
        >
          Применить
        </TButton>
        <div
          class="profile-edit-form__info-about-request-text"
          :style="{visibility: isSaved || serverError ? 'visible' : 'hidden'}"
        >
          <span v-if="isSaved" class="profile-edit-form__saved-text">
            Успешно сохранено!
          </span>
          <span v-else-if="serverError" class="profile-edit-form__error-text">
            {{ serverError }}
          </span>
        </div>
      </div>
    </div>

    <!-- Табы с изменяемой информацией -->
    <div class="profile-edit-form__tabs">
      <span
        v-for="tab in tabs"
        :key="tab.value"
        class="profile-edit-form__tab"
        :class="{'active': tab.value === selectedTab}"
        @click="selectedTab = tab.value"
      >
        {{ tab.title }}
      </span>
    </div>
    <div class="profile-edit-form__content">
      <ProfileEditFormBasicInfo v-if="selectedTab === 'main-info'" :profile="profile" :contacts="contacts" />
      <ProfileEditFormContacts v-else-if="selectedTab === 'links'" :profile="profile" :contacts="contacts" />
      <ProfileEditFormCanHelp v-else-if="selectedTab === 'can-help'" :profile="profile" :contacts="profile.contacts" />
    </div>
  </form>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import TButton from '@/components/controls/TButton.vue';
import deepCopyFunction from '@/helpers/deepCopy';
import AvatarChooser from '@/components/controls/AvatarChooser.vue';
import ProfileEditFormBasicInfo from '@/components/profile-edit/ProfileEditFormBasicInfo.vue';
import ProfileEditFormContacts from '@/components/profile-edit/ProfileEditFormContacts.vue';
import ProfileEditFormCanHelp from '@/components/profile-edit/ProfileEditFormCanHelp.vue';
import TabEntity from '@/entities/TabEntity';
import FileEntity from '@/entities/FileEntity';
import { Action } from 'vuex-class';
import UserContactEntity from '@/entities/UserContactEntity';

const namespace = 'user';

@Component({
  components: {
    TButton,
    AvatarChooser,
    ProfileEditFormBasicInfo,
    ProfileEditFormContacts,
    ProfileEditFormCanHelp,
  },
} as any)
export default class ProfileEditFormComponent extends Vue {
  @Action('saveUser', { namespace }) saveUser!: () => Promise<void>;

  @Action('saveContacts', { namespace }) saveContacts!: () => Promise<void>;

  @Action('saveAvatar', { namespace }) saveAvatar!: (avatar: FileEntity) => Promise<string>;

  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Prop({ type: Array, required: true }) contacts!: UserContactEntity[];

  newProfile: UserEntity = {
    id: '',
    email: '',
    contacts: [],
    fullName: '',
    location: '',
  };

  newAvatar?: FileEntity;

  loading = false;

  isSaved = false;

  serverError = '';

  selectedTab = 'main-info';

  tabs: TabEntity[] = [
    {
      value: 'main-info',
      title: 'Основная информация',
    },
    {
      value: 'links',
      title: 'Социальные сети',
    },
    {
      value: 'can-help',
      title: 'Чем я могу помочь / навыки',
    },
  ];

  @Watch('profile', { immediate: true })
  private onProfile(newVal: UserEntity): void {
    this.newProfile = deepCopyFunction(newVal);
  }

  avatarChanged(file: FileEntity) {
    this.newAvatar = file;
  }

  async submitForm() {
    try {
      this.serverError = '';
      this.isSaved = false;
      this.loading = true;

      if (this.newAvatar) {
        await this.saveAvatar(this.newAvatar);
      }

      await this.saveUser();
      await this.saveContacts();

      this.isSaved = true;
      this.loading = false;
    } catch (e) {
      this.loading = false;
      this.serverError = 'Oops, что-то пошло не так';
    }
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-form {
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      flex-direction: row;
    }

    &__header-info {
      margin-left: 20px;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }

    &__name {
      font-style: normal;
      font-weight: bold;
      font-size: 30px;
      line-height: 160%;
    }

    &__submit-btn {
      width: 100%;
      max-width: 226px;
    }

    &__avatar {
      width: 100px;
      min-width: 100px;
      height: 100px;
      min-height: 100px;
    }

    &__tabs {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin: 20px 0 10px;
    }

    &__tab {
      cursor: pointer;
      height: 22px;
      margin-top: 8px;

      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;

      display: flex;
      align-self: flex-start;
      text-align: center;

      color: var(--greyColor);

      &.active {
        color: var(--blackColor);
      }
    }

    &__info-about-request-text {
      display: flex;
      align-items: flex-end;
      height: 30px;
    }

    &__saved-text {
      color: #61C9A8;
    }

    &__error-text {
      color: rgba(#FF4B3E, .7);
    }

    .dot {
      color: var(--primaryColor);
    }
  }

  @media (min-width: 992px) {
    .profile-edit-form {
      display: flex;
      flex-direction: column;

      margin-left: 130px;

      &__header {
        display: flex;
        flex-direction: row;
      }

      &__header-info {
        margin-left: 20px;
      }

      &__name {
        font-style: normal;
        font-weight: bold;
        font-size: 80px;
        line-height: 98px;
      }

      &__submit-btn {
        margin-top: 24px;
        width: 329px;
        max-width: none;
      }

      &__avatar {
        margin-bottom: 30px;
        width: 200px;
        min-width: 200px;
        height: 200px;
        min-height: 200px;
      }

      &__tabs {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        width: 100%;
        margin-top: 50px;
      }

      &__tab {
        cursor: pointer;
        height: 22px;
        margin-right: 66px;

        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;

        display: flex;
        align-self: flex-start;
        text-align: center;

        color: var(--greyColor);

        &.active {
          color: var(--blackColor);
        }
      }

      &__info-about-request-text {
      }

      &__saved-text {
        color: #61C9A8;
      }

      &__error-text {
        color: rgba(#FF4B3E, .7);
      }

      .dot {
        color: var(--primaryColor);
      }
    }
  }
</style>
