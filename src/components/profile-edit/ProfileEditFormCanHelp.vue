<template>
  <div class="profile-edit-can-help__form-blocks">
    <!-- Contacts -->
    <div class="profile-edit-can-help__block">
      <div class="profile-edit-can-help__inputs">
        <span class="profile-edit-can-help__title">Навыки и ваши возможности необходимо вводить через Enter.</span>
        <TFormControl class="profile-edit-can-help__about-me">
          <multiselect
            v-model="value"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="name"
            track-by="name"
            :options="options"
            :multiple="true"
            :taggable="true"
            @input="optionChanged"
            @tag="addTag"
          >
            <template slot="tag" slot-scope="{ option, remove }">
              <span class="multiselect-tag">
                <span>{{ option.name }}</span>
                <span class="multiselect-remove" @click="remove(option)"><CrossIcon class="multiselect-remove-icon" /></span>
              </span>
            </template>
          </multiselect>
        </TFormControl>
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
import CrossIcon from '@/static/images/svg/cross.svg';
import { Mutation } from 'vuex-class';

const namespace = 'user';

type Option = {
  code: string;
  name: string;
};

@Component({
  components: {
    TFormControl,
    CrossIcon,
  },
} as any)
export default class ProfileEditFormCanHelpComponent extends Vue {
  @Prop({ type: Object, required: true }) profile!: UserEntity;

  @Mutation('setSkills', { namespace }) setSkills!: (skills: string[]) => void;

  value: Option[] = [];

  options: Option[] = [];

  addTag(newTag: string) {
    const tag = {
      name: newTag,
      code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
    };
    this.options.push(tag);
    this.value.push(tag);
    this.setSkills(this.convertValueToSkills(this.value));
  }

  optionChanged() {
    this.setSkills(this.convertValueToSkills(this.value));
  }

  convertValueToSkills(value: Option[]): string[] {
    return value.map((el: Option) => el.name);
  }

  @Watch('profile.skills', { immediate: true })
  private onProfileSkills(newVal: string[]): void {
    if (newVal) {
      this.value = newVal.map((el: string) => ({ name: el, code: el }));
      this.options = newVal.map((el: string) => ({ name: el, code: el }));
    }
  }
}
</script>

<style lang="postcss" scoped>
  .profile-edit-can-help {
    display: flex;
    flex-direction: column;

    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
    }

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
        width: 500px;
      }
    }

    &__about-me {
      width: 100%;
      height: 200px;
      margin-top: 20px;

      & >>> .multiselect-tag {
        display: inline-flex;
        align-items: center;
        margin-right: 5px;
      }

      & >>> .multiselect-remove {
        display: flex;
      }

      & >>> div:not(.multiselect--active) .multiselect__tags {
        padding: 8px 40px 8px 8px;
      }
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
        float: right;;
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
    .profile-edit-can-help {
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

    .multiselect-tag {
      padding: 3px 12px;
      margin-right: 8px;
      margin-bottom: 8px;
      border-radius: 10px;
      cursor: pointer;
    }

    .multiselect-remove-icon {
      width: 13px;
      height: 12px;
      color: var(--blackColor);
    }
  }
</style>
