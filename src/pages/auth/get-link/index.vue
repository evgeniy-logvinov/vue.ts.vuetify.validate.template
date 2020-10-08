<template>
  <div class="get-magic-link">
    <MestoLogoSmall class="logo" />
    <MagicLinkInfoComponent class="get-magic-link__content" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MagicLinkInfoComponent from '@/components/magicLink/MagicLinkInfoComponent.vue';
import MestoLogoSmall from '@/static/images/svg/menu/mesto-logo.svg';

@Component({
  components: {
    MestoLogoSmall,
    MagicLinkInfoComponent,
  },
})
export default class GetMagicLinkComponent extends Vue {
}
</script>

<style lang="postcss" scoped>
.get-magic-link {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  //max-width: 356px;
  min-height: 100vh;
  background-color: var(--secondaryColor);
  .logo {
    width: 130px;
    height: 50px;
    margin-top: 30px;
  }
  &__content {
    margin-top: 20px;
  }
}

@media (min-width: 992px) {
  .get-magic-link {
    width: 100%;
    height: 100%;
    max-width: none;
    align-items: flex-start;

    &__content {
      margin-top: 7%;
    }

    .logo {
      margin: 50px 0 0 130px;
    }
  }
}
</style>
