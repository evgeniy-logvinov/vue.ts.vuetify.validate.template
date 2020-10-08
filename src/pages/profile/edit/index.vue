<template>
  <MenuLayout>
    <div class="profile-edit-page">
      <ProfileEditForm class="profile-edit-page__form" :profile="profile" :contacts="contacts" />
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import UserEntity from '@/entities/UserEntity';
import ProfileAvatar from '@/components/profile/ProfileAvatar.vue';
import ProfileBasicInfo from '@/components/profile/ProfileBasicInfo.vue';
import ProfileAbout from '@/components/profile/ProfileAbout.vue';
import ProfileContacts from '@/components/profile/ProfileContacts.vue';
import AvatarChooser from '@/components/controls/AvatarChooser.vue';
import ProfileEditForm from '@/components/profile-edit/ProfileEditForm.vue';

@Component({
  components: {
    ProfileContacts,
    ProfileAbout,
    ProfileBasicInfo,
    ProfileAvatar,
    MenuLayout,
    AvatarChooser,
    ProfileEditForm,
  },
})
export default class MainPageComponent extends Vue {
  @State('user', { namespace: 'user' }) profile?: UserEntity;

  @State('contacts', { namespace: 'user' }) contacts?: UserEntity;

  @Action('getContacts', { namespace: 'user' }) getContacts!: () => Promise<void>;

  async created() {
    await this.getContacts();
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-page {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    flex-direction: column;

    &__content {
      display: flex;
      flex-direction: column;
    }

    &__form {
      width: 100%;
    }

    &__header {
      margin-bottom: 30px;
    }
  }

  @media (min-width: 992px) {
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
