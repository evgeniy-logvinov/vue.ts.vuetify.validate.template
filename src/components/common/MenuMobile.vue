<template>
  <div class="menu-mobile" :class="{'is-open': isOpen}">
    <!-- <span class="menu-mobile__logo">
      <nuxt-link class="logo" to="/">
        <MestoLogo />
      </nuxt-link>
    </span>
    <Burger class="menu-mobile__burger" @click="toogleMenu" />
    <client-only>
      <Slide :burger-icon="false" :cross-icon="false" :close-on-navigation="true" :is-open="isOpen">
        <div class="menu-mobile-inside">
          <div class="header">
            <div class="header__user">
              <nuxt-link v-if="user.fullName" class="user" :to="userLink">
                <Avatar
                  :size="40"
                  :username="user.fullName || ''"
                  :src="user.imagePath"
                  :custom-style="{ 'background-size': 'cover', 'min-width': '40px' }"
                />
                <span class="user__name">
                  {{ user.fullName }}
                </span>
              </nuxt-link>
            </div>
            <CloseLogo @click="toogleMenu" />
          </div>
          <div class="menu-mobile-items">
            <nuxt-link
              v-for="(item, index) in menuItems"
              :key="index"
              class="menu-mobile-item"
              :to="item.route"
            >
              <component :is="item.logo" />
              <span class="menu-mobile-item__label">
                {{ item.text }}
              </span>
            </nuxt-link>
          </div>
          <span class="line" />

          <div class="channels">
            <span class="channels__header">Каналы<span class="dot">.</span></span>

            <div class="menu-mobile-items">
              <a
                v-for="(contact, index) in contacts"
                :key="index"
                class="menu-mobile-item"
                :href="contact.url"
                target="_blank"
              >
                {{ contact.title }}
              </a>
            </div>
          </div>
        </div>
      </Slide>
    </client-only> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import MestoLogo from '@/static/images/svg/menu/mesto-logo.svg';
// import UsersLogo from '@/static/images/svg/menu/users-icon.svg';
// import FavoritesLogo from '@/static/images/svg/menu/friends-icon.svg';
// import Burger from '@/static/images/svg/menu/burger.svg';
// import CloseLogo from '@/static/images/svg/close.svg';
// import Avatar from 'vue-avatar';
import { State } from 'vuex-class';
import UserEntity from '@/entities/UserEntity';

@Component({
  components: {
    // MestoLogo,
    // UsersLogo,
    // Avatar,
    // Burger,
    // CloseLogo,
  },
})
export default class MenuMobileComponent extends Vue {
  @State('user', { namespace: 'user' }) user!: UserEntity;

  isOpen = false;

  toogleMenu(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.isOpen = !this.isOpen;
  }

  get userLink() {
    return {
      name: 'profile',
      query: {
        id: this.user.id,
      },
    };
  }

  menuItems = [
    // {
    //   logo: UsersLogo,
    //   text: 'Участники',
    //   route: '/',
    // },
    // {
    //   logo: FavoritesLogo,
    //   text: 'Избранное',
    //   route: '/favorites/',
    // },
  ];

  contacts = [
    {
      title: 'Mesto.',
      url: 'https://openland.com/mail/5Xmd1J763nhJvBxzza3bHQgWbJ',
    },
    {
      title: '.News',
      url: 'https://openland.com/mail/rAb139w0DKSzVzmvla44FV4p9Z',
    },
    {
      title: '.Ideas',
      url: 'https://openland.com/mail/g065jdJYAyh69eoj1JmZhepalQ',
    },
    {
      title: '.NeedHelp',
      url: 'https://openland.com/mail/g065jdJYARsA0v3AR1aMh7qeYw',
    },
    {
      title: '.Kitchen',
      url: 'https://openland.com/mail/ZYx4d9K6oMczWjd5mv9wh0rkLb',
    },
    {
      title: '.Spasibo',
      url: 'https://openland.com/mail/1pm4Xrl3MAhmX611Y3L5CWYm3a',
    },
    {
      title: '.CanHelp',
      url: 'https://openland.com/mail/rAb139w0DqsQRQQ09xwlcLe0WZ',
    },
    {
      title: '.Feedback',
      url: 'https://openland.com/mail/qljZr9WbXKhrRq6EDJXYU4Bo4b',
    },
    {
      title: '.Groups',
      url: 'https://openland.com/mail/p3BPqKmj9atOz3e0myyWHnnLKy',
    },
    {
      title: '.Jobs',
      url: 'https://openland.com/mail/VywdDrg3PocDM7rJy6xLCOkr3A',
    },
    {
      title: '.Archive',
      url: 'https://openland.com/mail/0DW7dl3r46iA9wayv5kmFxO4Be',
    },
    {
      title: '.Marketing',
      url: 'https://openland.com/mail/BPV0ZljYQjTvK4ePVpYVfOXVwl',
    },
  ];
}
</script>

<style lang="postcss">
  .menu-mobile {
    display: flex;
    flex-direction: row;
    color: #FFFFFF;
    align-items: center;
    padding: 10px;
    background: var(--secondaryColor);
    width: 100%;
    height: 70px;
    justify-content: space-between;

    &__logo {
      flex: 1;

      .logo {
        width: auto;
      }
    }

    &__burger {

    }

    & .bm-menu {
      background: var(--secondaryColor);
      padding-top: 20px;
      max-width: 420px;

      .bm-item-list {
        margin-left: 0;
      }

      .bm-item-list>* {
        padding: 0;
      }

      .menu-mobile-inside {
        display: flex;
        flex-direction: column;
      }

      .header {
        display: flex;
        align-items: center;
        width: 100%;
        white-space: nowrap;
        padding: 0 10px;
        margin-bottom: 30px;

        &__user {
          flex: 1;

          .user {
            display: flex;
            color: #FFFFFF;
            font-size: 18px;
            line-height: 22px;
            font-weight: bold;
            text-decoration: none;
            align-items: center;

            &__name {
              margin-left: 13px;
            }
          }
        }
      }

      .menu-mobile-items {
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-decoration: none;
        color: #FFFFFF;
        font-size: 18px;
        transition: all .1s ease-in;
        width: 290px;

        .menu-mobile-item {
          width: 100%;
          height: 33px;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #FFFFFF;
          font-size: 18px;
          transition: all .1s ease-in;
          line-height: 160%;

          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }

        &__label {
          font-size: 18px;
          margin-left: 9px;
          font-weight: 400;
        }
      }

      .line {
        display: flex;
        background: var(--primaryColor);
        height: 2px;
        min-height: 2px;
        margin: 20px 10px;
        width: 290px;
      }

      .channels {
        &__header {
          font-size: 28px;
          font-weight: bold;
          line-height: 160%;
          color: #FFFFFF;
          margin: 0 10px;

          .dot {
            color: var(--primaryColor);
          }
        }
      }
    }

    &.is-open .bm-menu {
      width: 100%!important;
      padding: 20px 0;
    }
  }
</style>
