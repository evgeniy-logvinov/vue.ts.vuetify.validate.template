<template>
  <div class="menu-desktop">
    <v-btn class="plr-30" to="/">
      <MestoLogo class="logo" />
    </v-btn>

    <div class="menu-desktop__items">
      <v-btn
        v-for="(item, index) in menuItems"
        :key="index"
        class="menu-item"
        :to="item.route"
      >
        <component :is="item.logo" />
        <span class="menu-item__label">
          {{ item.text }}
        </span>
      </v-btn>
    </div>

    <span class="menu-desktop__line" />

    <div class="menu-desktop__channels">
      <span class="channels-header plr-30">Каналы<span class="dot">.</span></span>

      <div class="menu-desktop__items">
        <a
          v-for="(contact, index) in contacts"
          :key="index"
          class="menu-item"
          :href="contact.url"
          target="_blank"
        >
          {{ contact.title }}
        </a>
      </div>
    </div>

    <v-btn v-if="user.fullName" class="menu-desktop__user plr-30" :to="userLink">
      <!-- <Avatar
        :size="40"
        :username="user.fullName || ''"
        :src="user.imagePath"
        :custom-style="{ 'background-size': 'cover', 'min-width': '40px' }"
      /> -->
      <span class="user__name">
        {{ user.fullName }}
      </span>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MestoLogo from '@/static/images/svg/menu/mesto-logo.svg';
import UsersLogo from '@/static/images/svg/menu/users-icon.svg';
// import Avatar from 'vue-avatar';
import { State } from 'vuex-class';
import UserEntity from '@/entities/UserEntity';

@Component({
  components: {
    MestoLogo,
    UsersLogo,
    // Avatar,
  },
})
export default class MenuDesktopComponent extends Vue {
  @State('user', { namespace: 'user' }) user!: UserEntity;

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
    //   text: 'Избранноe',
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
  .menu-desktop {
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    padding: 30px 0;

    .logo {
      width: 230px;
      height: 60px;
      margin-bottom: 50px;
    }

    .plr-30 {
      margin: 0 30px;
    }

    &__items {
      .menu-item {
        width: 100%;
        height: 33px;
        padding: 0 30px;
        display: flex;
        align-items: center;
        text-decoration: none;
        color: #FFFFFF;
        font-size: 18px;
        transition: all .1s ease-in;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        &__label {
          font-size: 18px;
          margin-left: 9px;
          font-weight: 400;
        }
      }
    }

    &__line {
      display: flex;
      background: var(--primaryColor);
      height: 2px;
      min-height: 2px;
      margin: 40px 30px 10px;
    }

    &__channels {
      margin-bottom: 20px;
      flex: 1;

      .channels-header {
        font-size: 42px;
        font-weight: bold;
        line-height: 160%;

        .dot {
          color: var(--primaryColor);
        }
      }
    }

    &__user {
      display: flex;
      color: #FFFFFF;
      font-size: 18px;
      line-height: 22px;
      font-weight: bold;
      text-decoration: none;
      align-items: center;

      .user {
        &__name {
          margin-left: 13px;
        }
      }
    }
  }
</style>
