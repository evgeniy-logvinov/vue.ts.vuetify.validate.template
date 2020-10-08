<template>
  <validation-observer class="magic-link-form" @submit.prevent="submitForm" tag="form" ref="form" v-slot="{ errors }">
    <div v-if="isSaved" class="magic-link-form__form-blocks">
      <div class="magic-link-form__block">
        <span class="label">
          <span class="label-success">
            Мы выслали вам письмо с ссылкой на почту.
            <br>
            Перейдите по ссылке в письме, чтобы войти на сайт.
          </span>
        </span>
      </div>
    </div>
    <div v-else class="magic-link-form__form-blocks">
      <!-- Получить ссылку -->
      <div class="magic-link-form__block">
        <h1 class="magic-link-form__title">
          Вход в сообщество MESTO<span class="magic-link-form__dot">.</span>
        </h1>
        <span class="magic-link-form__subtitle">Мы отправим на твой e-mail ссылку для входа</span>
        <div class="magic-link-form__info">
          <div class="magic-link-form__inputs">
            <validation-provider name="email" class="form-control" rules="required|email">
              <div class="form-control__input-button">
                <v-text-field
                  v-model="email"
                  outlined
                  color="white"
                  class="my-text-style form-input"
                  placeholder="Email"
                  append-icon="mdi-arrow-right"
                  @click:append="submitForm"
                ></v-text-field>
              </div>
              <template v-if="!!errors.email || !!serverError">
                <span class="form-control__errors">
                  <template v-for="error in Object.keys(errors)">
                    <span v-for="message in errors[error]" class="form-control__error-message" :key="message">
                      {{message}}
                    </span>
                  </template>
                  <span v-if="serverError" class="form-control__error-message">
                    {{ serverError }}
                  </span>
                </span>
              </template>
            </validation-provider>
          </div>
        </div>
      </div>
    </div>
  </validation-observer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import RightArrow from '@/static/images/svg/right-arrow.svg';
import TFormControl from '@/components/controls/TFormControl.vue';
import TRadioButton from '@/components/controls/TRadioButton.vue';
import TCheckbox from '@/components/controls/TCheckbox.vue';
import TInput from '@/components/controls/TInput.vue';
import TButton from '@/components/controls/TButton.vue';
import {
  ValidationObserver,
} from 'vee-validate';

const namespace = 'registration';

@Component({
  components: {
    RightArrow,
    TFormControl,
    TRadioButton,
    TCheckbox,
    TInput,
    TButton,
  },
} as any)
export default class MagicLinkInfoComponent extends Vue {
  @Action('getMagicLink', { namespace }) getMagicLink!: (email: string) => void;

  public $refs!: {
      form: InstanceType<typeof ValidationObserver>;
  };

  serverError = '';

  isSaved = false;

  loading = false;

  isAccept = false;

  email = '';

  async submitForm() {
    try {
      this.serverError = '';
      this.isSaved = false;
      const success = await this.$refs.form.validate();

      if (!success) return;

      this.loading = true;

      await this.getMagicLink(this.email);

      this.isSaved = true;
      this.loading = false;

      // Wait until the models are updated in the UI
      this.$nextTick(() => {
        this.$refs.form.reset();
      });
    } catch (e) {
      if (e.response && e.response.status === 404) {
        this.serverError = 'Пользователь с таким email не найден';
      } else {
        this.serverError = 'Oops, что-то пошло не так';
      }

      this.loading = false;
    }
  }
}
</script>

<style lang="postcss" scoped>
.magic-link-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 356px;

  &__block {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-style: normal;
    font-weight: bold;
    font-size: 28px;
    line-height: 160%;
    text-align: center;
    color: white;
    margin-top: 20px;
  }

  &__dot {
    color: var(--primaryColor);
  }

  &__subtitle {
    display: inline-block;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 160%;
    margin: 50px 0;
    color: white;
  }

  &__info {
    width: 100%;
  }

  &__inputs {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;

    .form-control {
      color: white;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;

      &__errors {
        display: inline-block;
        width: 100%;
        max-width: 500px;
        background-color: #FE4F4F;
        border-radius: 10px;
        color: white;
        margin-top: 30px;
      }

      &__error-message {
        display: inline-block;
        margin: 16px 30px;
        &:not(:first-child) {
          margin-top: 0;
        }
      }

      &__input-button {
        display: flex;
      }
    }

    .form-input {
      max-width: 440px;
      width: 100%;
      height: 56px;
      border-radius: 5px 0 0 5px;
      border-color: transparent;
      font-style: normal;
      font-weight: normal;
      font-size: 26px;
      line-height: 31px;
      color: #C5C5C5;
      background-color:#472652;

      &.my-text-style >>> .v-text-field__slot input {
        color: #C5C5C5;
        /* do not group these rules */
        &::-webkit-input-placeholder {
            color: #C5C5C5;
        }
        &:-moz-placeholder {
            color: #C5C5C5;
            opacity: 1;
        }
        &::-moz-placeholder {
            color: #C5C5C5;
            opacity: 1;
        }
        &:-ms-input-placeholder {
            color: #C5C5C5;
        }
        &::-ms-input-placeholder {
            color: #C5C5C5;
        }
        &::placeholder {
            color: #C5C5C5;
        }
      }

      &.my-text-style >>> .v-input__append-inner button {
        color: #C5C5C5;
      }
    }
  }

  .label {
    padding: 0 10px;
    font-size: 16px;
    line-height: 160%;
    text-align: center;
    margin-top: 10%;

    .label-success {
      color: #FFFFFF;
    }

    .label-error {
      color: rgba(var(--errorColor), .7);
    }
  }
}

@media (min-width: 992px) {
  .magic-link-form {
    flex-direction: row;
    max-width: none;
    align-items: center;
    justify-content: center;

    &__title {
      width: 809px;
      font-style: normal;
      font-weight: bold;
      font-size: 76px;
      line-height: 93px;
      text-align: center;
      color: white;
    }

    &__subtitle {
      display: inline-block;
      font-style: normal;
      font-weight: normal;
      font-size: 36px;
      line-height: 43px;
      margin: 50px 0;
      color: white;
    }

    &__inputs {
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      justify-content: flex-start;
    }

    .label {
      white-space: nowrap;
      font-size: 32px;
      line-height: 160%;
      text-align: center;
      margin-top: 10%;

      .label-success {
        color: #FFFFFF;
      }

      .label-error {
        color: rgba(var(--errorColor), .7);
      }
    }
  }
}
</style>
