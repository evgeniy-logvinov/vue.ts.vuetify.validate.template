<template>
  <div class="menu-layout">
    <MenuDesktop class="menu-layout__menu-desktop" />
    <MenuMobile class="menu-layout__menu-mobile" />
    <div class="menu-layout__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuDesktop from '@/components/common/MenuDesktop.vue';
import MenuMobile from '@/components/common/MenuMobile.vue';

@Component({
  components: { MenuDesktop, MenuMobile },
})
export default class MenuLayoutComponent extends Vue {}
</script>

<style lang="postcss" scoped>
  .menu-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    align-items: center;
    background: var(--backgroundPageColor);

    &__content {
      flex: 1;
      padding: 30px 10px 30px;
      min-width: 320px;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    &__menu {
      position: fixed;
      background: var(--secondaryColor);
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      border-top: 1.23px solid var(--borderColor);
      z-index: 2;
    }

    &__menu-desktop {
      display: none;
    }
  }

  @media (min-width: 992px) {
    .menu-layout {
      &__content {
        padding: 50px 30px 50px 290px;
      }

      &__menu-mobile {
        display: none;
      }

      &__menu-desktop {
        position: fixed;
        width: 290px;
        max-width: 290px;
        min-height: 390px;
        background: var(--secondaryColor);
        left: 0;
        top: 0;
        bottom: unset;
        height: 100%;
        border-top: 0;
        box-shadow: 1px 0 6px rgba(0, 0, 0, 0.06);
        display: flex;
      }
    }
  }

  @media (min-width: 1200px) {
    .menu-layout {
      &__menu {
        min-height: 443px;
      }
    }
  }
</style>
