<template>
  <MenuLayout>
    <div class="profile-search">
      <div class="profile-search__content">
        <h1 class="profile-search__content__h1">
          Список участников Mesto.
        </h1>
        <input
          v-model="query"
          class="profile-search__content__find-input"
          placeholder="Поиск человека по имени, username, о нём или по скиллам"
          @keyup="findProfileDebounce(true)"
        >
        <div class="profile-search__content__result">
          <UserCard
            v-for="user in profileSearchResult"
            :key="user.id"
            :user="user"
            v-bind="$attrs"
            v-on="$listeners"
          />
        </div>

        <div
          v-if="isMoreProfiles"
          v-view="viewHandler"
          class="profile-search__content__read-more"
        >
          <TButton theme="primary" @click="loadMore()">
            Показать еще
          </TButton>
        </div>
      </div>
    </div>
  </MenuLayout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import MenuLayout from '@/components/layout/MenuLayout.vue';
import UserCard from '@/components/common/UserCard.vue';
import ProfileEntity from '@/entities/ProfileEntity';
import debounce from '@/helpers/debounce';

const namespace = 'profile';

@Component({
  components: {
    MenuLayout,
    UserCard,
  },
})
export default class MainPageComponent extends Vue {
  @State('profileSearchResult', { namespace })
  profileSearchResult!: ProfileEntity[];

  @State('isMoreProfiles', { namespace })
  isMoreProfiles!: boolean;

  findProfileDebounce = debounce(this.findProfile, 350);

  currentPage = 0;

  query = '';

  loading = false;

  firstRun = true;

  // TODO(skobak), improve: it is a bit hacky, but works for MPV
  viewHandler(e: any) {
    if (e.type === 'enter' && !this.firstRun) {
      this.loadMore();
    }
  }

  async created() {
    this.firstRun = true;
    await this.findProfile(true);
    this.firstRun = false;
  }

  async loadMore() {
    this.currentPage += 1;
    await this.findProfile(false);
  }

  async findProfile(pageReset: boolean) {
    if (pageReset) {
      this.currentPage = 1;
    }
    this.loading = true;
    const data = { fullQuery: this.query, currentPage: this.currentPage };
    await this.$store.dispatch('profile/findProfile', data);
    this.loading = false;
  }
}
</script>

<style lang="postcss" scoped>
.profile-search {
  width: 100%;
  padding: 0px 61px;
  @media (max-width: 992px) {
    padding: 0px 10px;
  }
  flex-direction: column;

  &__content {
    display: flex;
    flex-direction: column;

    &__h1 {
      font-family: var(--fontFamily);
      font-style: normal;
      font-weight: bold;
      font-size: 56px;
      line-height: 68px;
      display: flex;
      align-items: center;
      text-align: center;
      color: var(--blackColor);
    }

    &__find-input {
      text-decoration: none;
      padding: 20px;
      width: 473px;
      height: 36px;
      border: 2px solid var(--primaryColor);
      font-family: var(--fontFamily);
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: -0.24px;
      color: var(--blackColor);
      display: inline;
      padding-left: 41px;
      margin-top: 40px;
      background: var(--backgroundPageColor) url(/images/svg/zoom-icon.svg)
      no-repeat scroll 11px 12px;
      @media (max-width: 992px) {
        width: 100%;
      }
    }

    &__result {
      width: 100%;
      margin-top: 50px;
      flex-wrap: wrap;
      margin-left: -9px;
      & > div {
        width: 400px;
        float: left;
        margin: 10px;
        @media (max-width: 992px) {
          margin: 10px 0px;
          width: 100%;
        }
      }
    }

    &__read-more {
      width: 100%;
      float: left;
      margin: 20px;
      text-align: center;
    }
  }

  &__form {
    width: 100%;
  }

  &__header {
    margin-bottom: 30px;
  }
}
</style>
