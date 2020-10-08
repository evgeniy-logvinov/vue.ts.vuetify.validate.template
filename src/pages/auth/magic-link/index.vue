<template>
  <div class="magic-link-main">
    <MestoLogoSmall class="logo" />
    <SpinnerComponent v-if="loading" key="spinner" />
    <div v-else class="expired">
      <span class="expired__text">Срок действия вашей ссылки истек</span>
      <router-link :to="toGetLink" class="expired__to-new-token">
        Получить новую ссылку
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import SpinnerComponent from '@/components/common/SpinnerComponent.vue';
import MagicLinkEntity from '@/entities/MagicLinkEntity';
import MestoLogoSmall from '@/static/images/svg/menu/mesto-logo.svg';

const namespace = 'registration';

@Component({
  components: {
    MestoLogoSmall,
    SpinnerComponent,
  },
  // validate({ query }) {
  //   return !!query.token;
  // },
})
export default class MagicLinkComponent extends Vue {
  @Action('signUpByMagicLink', { namespace }) signUpByMagicLink!: (magicLink: MagicLinkEntity) => void;

  magicLink: MagicLinkEntity = {
    token: '',
    redirect: '/',
  };

  toGetLink = {
    name: 'auth-get-link',
  };

  loading = true;

  async mounted() {
    this.magicLink.token = this.$route.query.token as string;
    this.magicLink.redirect = this.$route.query.redirect as string;

    if (this.magicLink.token) {
      try {
        await this.signUpByMagicLink(this.magicLink);
      } catch {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.magic-link-main {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  align-items: center;
  background-color: var(--secondaryColor);
  padding: 30px 10px;
  .logo {
    width: 92px;
    height: 25px;
  }

  .expired {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 60px;
    align-items: center;
    justify-content: center;
    &__text {
      color: #FFFFFF;
      font-size: 20px;
    }
    &__to-new-token {
      margin-top: 30px;
      padding: 15px 20px;
      text-decoration: none;
      display: flex;
      background: var(--primaryColor);
      font-size: 16px;
      font-weight: 700;
      color: #000000;
    }
  }
}

@media (min-width: 992px) {
  .magic-link-main {
    width: 100%;
    max-width: none;
    align-items: flex-start;

    .logo {
      margin: 50px 0 0 130px;
    }

    .expired {
      margin-top: 20%;
      &__text {
        font-size: 26px;
      }
      &__to-new-token {
        padding: 20px 40px;
        font-size: 20px;
      }
    }
  }
}
</style>
