<template>
  <div class="profile-edit-main-info__form-blocks">
    <!-- Основная информация-->
    <div class="profile-edit-main-info__block">
      <div class="profile-edit-main-info__inputs">
        <!-- Роль-->
        <TFormControl class="form-control">
          <span class="profile-edit-main-info__input-icon">
            <span class="profile-edit-main-info__form-input-icon">
              <RoleIcon />
            </span>
            <TInput
              v-model="newProfile.fullName"
              maxlength="255"
              class="form-input"
              placeholder="Введите имя"
              @input="changed"
            />
          </span>
        </TFormControl>

        <!--    Имя фамилия-->
        <!-- <TFormControl
            class="form-control"
            :is-error="$v.newProfile.name.$error"
          >
            Имя Фамилия
            <TInput
              v-model="newProfile.name"
              maxlength="255"
              class="form-input"
              @blur="$v.newProfile.name.$touch()"
            />

            <template slot="errors">
              <template v-if="!$v.newProfile.name.required">
                Заполните имя
              </template>
            </template>
          </TFormControl> -->

        <!-- Локация -->
        <TFormControl class="form-control">
          <span class="profile-edit-main-info__input-icon">
            <span class="profile-edit-main-info__form-input-icon">
              <LocationIcon />
            </span>
            <multiselect
              v-model="currentLocation"
              class="form-input"
              label="city"
              placeholder="Выбирете город"
              track-by="city"
              open-direction="bottom"
              :options="locations"
              :searchable="true"
              :loading="isLoading"
              :internal-search="false"
              :options-limit="300"
              :max-height="600"
              :show-no-results="false"
              @search-change="asyncFindWithDebounce"
              @input="changedLocation"
            >
              <span slot="noResult">Ничего не найдено</span>
              <span slot="noOptions">Ничего не найдено</span>
            </multiselect>
          </span>
        </TFormControl>

        <!-- Site -->
        <TFormControl
          class="form-control"
        >
          <span class="profile-edit-main-info__input-icon">
            <span class="profile-edit-main-info__form-input-icon">
              <SiteIcon />
            </span>
            <TInput
              v-model="site.url"
              maxlength="255"
              class="form-input"
              placeholder="Введите ваш сайт"
              @input="changedContacts"
            />
          </span>
        </TFormControl>

        <!-- Email -->
        <TFormControl
          class="form-control"
        >
          <span class="profile-edit-main-info__input-icon">
            <span class="profile-edit-main-info__form-input-icon">
              <MailIcon />
            </span>
            <TInput
              v-model="newProfile.email"
              maxlength="255"
              class="form-input"
              placeholder="lakedeworld@gmail.com"
              disabled
              @blur="$v.newProfile.email.$touch()"
              @input="changed"
            />
          </span>
        </TFormControl>
        <!-- <TFormControl
          class="form-control"
          :is-error="$v.newProfile.email.$error"
        >
          <span class="profile-edit-main-info__input-icon">
            <span class="profile-edit-main-info__form-input-icon">
              <MailIcon />
            </span>
            <TInput
              v-model="newProfile.email"
              maxlength="255"
              class="form-input"
              placeholder="lakedeworld@gmail.com"
              disabled
              @blur="$v.newProfile.email.$touch()"
              @input="changed"
            />
          </span>
          <template slot="errors">
            <template v-if="!$v.newProfile.email.required">
              Заполните email
            </template>
            <template v-else-if="!$v.newProfile.email.email">
              Некорректный email
            </template>
          </template>
        </TFormControl> -->
      </div>
    </div>

    <!--    About me-->
    <div class="profile-edit-main-info__block">
      <h3>Обо мне</h3>
      <TFormControl class="profile-edit-main-info__about-me">
        <TTextArea
          v-model="newProfile.about"
          maxlength="3000"
          @input="changed"
        />
      </TFormControl>
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
import TTextArea from '@/components/controls/TTextArea.vue';
import TButton from '@/components/controls/TButton.vue';
import deepCopyFunction from '@/helpers/deepCopy';
// import {
//   email, required,
// } from 'vuelidate/lib/validators';
import { url } from '@/helpers/validators';
import { Action, Mutation } from 'vuex-class';
import MailIcon from '@/static/images/svg/profile/mail-icon.svg';
import SiteIcon from '@/static/images/svg/profile/site-icon.svg';
import LocationIcon from '@/static/images/svg/profile/location-icon.svg';
import RoleIcon from '@/static/images/svg/profile/role-icon.svg';
import LocationEntity from '@/entities/LocationEntity';
import UserContactEntity from '@/entities/UserContactEntity';
import debounce from '@/helpers/debounce';

const namespace = 'user';

@Component({
  components: {
    TFormControl,
    TInput,
    TTextArea,
    TButton,
    MailIcon,
    SiteIcon,
    LocationIcon,
    RoleIcon,
  },

  // validations: {
  //   newProfile: {
  //     name: {
  //       required,
  //     },
  //     email: {
  //       required,
  //       email,
  //     },
  //   },
  //   newContacts: {
  //     $each: {
  //       link: {
  //         url,
  //       },
  //     },
  //   },
  // },
} as any)
export default class ProfileEditFormBasicInfo extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Action('postLocations', { namespace }) postLocations!: (userInput: string) => LocationEntity[];

  @Mutation('setBasicInfo', { namespace }) setBasicInfo!: (profile: UserEntity) => void;

  @Prop({ type: Array, required: true }) contacts!: UserEntity[];

  @Mutation('setContacts', { namespace }) setContacts!: (contacts: UserContactEntity[]) => void;

  asyncFindWithDebounce = debounce(this.asyncFind, 200);

  newProfile: UserEntity = {
    id: '',
    fullName: '',
    email: '',
    contacts: [],
    location: '',
  };

  isLoading = false;

  locations: LocationEntity[] = [];

  currentLocation?: LocationEntity;

  site = {
    id: '',
    title: 'Website',
    url: '',
  };

  changed() {
    this.setBasicInfo(this.newProfile);
  }

  changedLocation() {
    this.newProfile.location = this.currentLocation?.city || '';
    this.changed();
  }

  changedContacts() {
    const newContacts = deepCopyFunction(this.contacts).filter((item: UserContactEntity) => item.title !== this.site.title);

    if (this.site.id || this.site.url) newContacts.push(this.site);

    this.setContacts(newContacts);
  }

  async asyncFind(query: string) {
    this.isLoading = true;
    const locations: LocationEntity[] = query ? await this.postLocations(query) : [];
    this.locations = locations;
    this.isLoading = false;
  }

  @Watch('profile', { immediate: true })
  private onProfile(newVal: UserEntity): void {
    this.newProfile = deepCopyFunction(newVal);
  }

  @Watch('profile.location', { immediate: true })
  private onProfileLocation(newVal: string): void {
    this.currentLocation = { city: newVal, country: newVal };
  }

  @Watch('contacts', { immediate: true })
  private onContacts(newVal: UserContactEntity[]): void {
    const newWebsite = newVal.find((item) => item.title === this.site.title);
    this.site = newWebsite ? { ...newWebsite } : this.site;
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-main-info {
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
        color: var(--greyColor);
      }

      .form-input {
        margin-top: 4px;
        width: 209px;

        &.multiselect {
          display: inline-block;
        }
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
        display: inline-block;
        float: right;
        white-space: nowrap;;
    }

    &__form-input-icon {
      display: inline-block;
      vertical-align: middle;
      width: 35px;
      height: 35px;
      margin-right: 20px;
      color: var(--blackColor);
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
    .profile-edit-main-info {
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
        width: 221px;

        .form-control {
            width: 271px;
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
