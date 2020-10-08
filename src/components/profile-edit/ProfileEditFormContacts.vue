<template>
  <div class="profile-edit-social-network__form-blocks">
    <!-- Contacts -->
    <div class="profile-edit-social-network__block">
      <div class="profile-edit-social-network__inputs">
        <TFormControl
          v-for="(contact, index) in newContacts"
          :key="index"
          class="form-control"
          maxlength="255"
        >
          <span class="profile-edit-social-network__input-icon">
            <span class="profile-edit-social-network__form-input-icon">
              <component :is="getIcon(contact.title)" class="profile-edit-social-network__icon" />
            </span>
            <TInput v-model="contact.url" :placeholder="contact.placeholder" class="form-input" @input="contactChanged" />
          </span>

          <!-- <template slot="errors">
            <template v-if="!$v.newContacts.$each.$iter[index].url.url">
              Некорректный URL
            </template>
          </template> -->
        </TFormControl>
        <!-- <TFormControl
          v-for="(contact, index) in newContacts"
          :key="index"
          :is-error="$v.newContacts.$each.$iter[index].url.$error"
          class="form-control"
          maxlength="255"
          @blur="$v.newContacts.$each.$iter[index].url.$touch()"
        >
          <span class="profile-edit-social-network__input-icon">
            <span class="profile-edit-social-network__form-input-icon">
              <component :is="getIcon(contact.title)" class="profile-edit-social-network__icon" />
            </span>
            <TInput v-model="contact.url" :placeholder="contact.placeholder" class="form-input" @input="contactChanged" />
          </span>

          <template slot="errors">
            <template v-if="!$v.newContacts.$each.$iter[index].url.url">
              Некорректный URL
            </template>
          </template>
        </TFormControl> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import UserEntity from '@/entities/UserEntity';
import TFormControl from '@/components/controls/TFormControl.vue';
import TInput from '@/components/controls/TInput.vue';
import deepCopyFunction from '@/helpers/deepCopy';
import UserContactEntity from '@/entities/UserContactEntity';
import { url } from '@/helpers/validators';
import { Mutation } from 'vuex-class';
import FacebookIcon from '@/static/images/svg/social/facebook.svg';
import InstagramIcon from '@/static/images/svg/social/instagram.svg';
import LinkedinIcon from '@/static/images/svg/social/linkedin.svg';
import OpenlandIcon from '@/static/images/svg/social/openland.svg';
import TelegramIcon from '@/static/images/svg/social/telegram.svg';
import TwitterIcon from '@/static/images/svg/social/twitter.svg';
import VkIcon from '@/static/images/svg/social/vk.svg';
import WebsiteIcon from '@/static/images/svg/social/website.svg';

const namespace = 'user';

@Component({
  components: {
    TFormControl,
    TInput,
  },

  // validations: {
  //   newContacts: {
  //     $each: {
  //       url: {
  //         url,
  //       },
  //     },
  //   },
  // },
} as any)
export default class ProfileEditFormContactsComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Prop({ type: Array, required: true }) contacts!: UserContactEntity[];

  @Prop({ type: Boolean, default: false }) isMy!: boolean;

  @Mutation('setContacts', { namespace }) setContacts!: (contacts: UserContactEntity[]) => void;

  newContacts = [
    {
      id: '',
      title: 'Instagram',
      url: '',
      placeholder: 'http://instagram.com/login',
    },
    {
      id: '',
      title: 'Telegram',
      url: '',
      placeholder: 'http://t.me',
    },
    {
      id: '',
      title: 'ВКонтакте',
      url: '',
      placeholder: 'http://vk.com/login',
    },
    {
      id: '',
      title: 'Twitter',
      url: '',
      placeholder: 'http://twitter.com/login',
    },
    {
      id: '',
      title: 'Facebook',
      url: '',
      placeholder: 'https://www.facebook.com/login',
    },
    {
      id: '',
      title: 'LinkedIn',
      url: '',
      placeholder: 'https://www.linkedin.com/login',
    },
  ];

  getIcon(contactTypeTitle: string) {
    switch (contactTypeTitle.toLowerCase()) {
      case 'instagram': return InstagramIcon;
      case 'telegram': return TelegramIcon;
      case 'вконтакте': return VkIcon;
      case 'twitter': return TwitterIcon;
      case 'facebook': return FacebookIcon;
      case 'openland': return OpenlandIcon;
      case 'linkedin': return LinkedinIcon;
      default: return WebsiteIcon;
    }
  }

  contactChanged() {
    const newContacts = [
      ...this.newContacts.filter((contact) => contact.id || contact.url),
      ...this.contacts.filter((item) => !this.newContacts.some((newContact) => item.title === newContact.title)),
    ];

    this.setContacts(JSON.parse(JSON.stringify(newContacts)));
  }

  @Watch('contacts', { immediate: true })
  private onContacts(newVal: UserContactEntity[]): void {
    this.newContacts = this.newContacts.map((contact) => {
      const newContact: UserContactEntity | undefined = newVal.find(({ title }) => title === contact.title);

      return deepCopyFunction(newContact || contact);
    });
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-social-network {
    display: flex;
    flex-direction: column;

    &__block {
      &:not(:first-child) {
        margin-top: 15px;
      }
    }

    &__inputs {
      margin-top: 20px;
      display: grid;
      grid-template-columns: 1fr;
      grid-column-gap: 10px;
      grid-row-gap: 10px;

      .form-control {
        display: flex;
        color: var(--greyColor);
        width: 100%;
      }

      .form-input {
        margin-top: 4px;
        //width: 100%;
        flex: 1;
      }
    }

    &__about-me {
      width: 100%;
      height: 200px;
      margin-top: 20px;
    }

    &__submit-btn {
      margin-top: 10px;
    }

    &__avatar {
      margin-bottom: 30px;
      width: 70px;
      min-width: 70px;
      height: 70px;
      min-height: 70px;
    }

    &__input-icon {
        display: flex;
        align-items: center;
    }

    &__form-input-icon {
      display: inline-block;
      vertical-align: middle;
      width: 35px;
      height: 35px;
      margin-right: 15px;
      color: var(--blackColor);
    }

    &__icon {
      width: 100%;
      height: 100%;
    }

    &__form-blocks {
      width: 100%;
    }

    &__submit-btn-wrap {
      display: flex;
      flex-direction: column-reverse;
      margin-top: 20px;
    }

    .label {
      white-space: nowrap;
      height: 17px;

      .label-success {
        color: #61C9A8;
      }

      .label-error {
        color: rgba(#FF4B3E, .7);
      }
    }
  }

  @media (min-width: 992px) {
    .profile-edit-social-network {
      display: flex;
      flex-direction: row;

      &__block {
        &:not(:first-child) {
          margin-top: 30px;
        }
      }

      &__inputs {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        width: 525px;

        .form-control {
            width: 575px;
        }
      }

      &__about-me {
        height: 290px;
        margin-top: 30px;
      }

      &__submit-btn {
        width: 140px;
        margin-top: 0;
        margin-right: 20px;
      }

      &__avatar {
        margin-bottom: 50px;
        width: 100px;
        min-width: 100px;
        height: 100px;
        min-height: 100px;
      }

      &__submit-btn-wrap {
        flex-direction: row;
        align-items: center;
      }

      .label {
        white-space: nowrap;
        height: 17px;

        .label-success {
          color: #61C9A8;
        }

        .label-error {
          color: rgba(#FF4B3E, .7);
        }
      }
    }
  }
</style>
