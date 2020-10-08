<template>
  <div class="user-card__wrap" style="display: flex">
    <div class="user-card">
      <router-link :to="userLink" class="user-card__link-block">
        <div class="user-card__content">
          <div class="user-card__header">
            <div class="user-card__author">
              <Avatar
                class="user-card__author-avatar"
                :size="40"
                :username="user.username || ''"
                :src="user.imagePath"
                :custom-style="{ 'background-size': 'cover' }"
              />
              <div class="user-card__name-block">
                <div class="user-card__author-name">
                  <span>{{ user.fullName }}</span>
                </div>
                <div class="user-card__role">
                  <span class="user-card__role-text">
                    {{ user.role || '' }}
                  </span>
                </div>
                <div class="user-card__author-location">
                  <span class="icon" v-if="user.location"></span
                  ><span class="text"> {{ user.location || '' }}</span>
                </div>
              </div>
              <!-- <div class="user-card__bookmark" @click="changeFavorites">
                <BookmarkFilledIcon v-if="user.isFavorite" />
                <BookmarkIcon v-else />
              </div> -->
            </div>
            <!-- <div class="user-card__icons">
              <InstagramIcon class="user-card__icon" />
              <FacebookIcon class="user-card__icon" />
              <TelegramIcon class="user-card__icon" />
            </div> -->
          </div>

          <div class="user-card__footer">
            <div class="user-card__about">
              <span class="user-card__about-text">
                {{ user.about || '' }}
              </span>
            </div>

            <div class="user-card__skills">
              <TTag
                v-for="skill in user.skills"
                :key="skill"
                class="user-card__skills-text"
                :tag="skill"
              />
            </div>
            <!-- <div class="user-card__active-projects">
              Активные проекты:
              <span class="user-card__active-projects-text">
                {{ user.active-projects || '' }}
              </span>
            </div> -->
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import UserEntity from '@/entities/UserEntity';
import EditIcon from '@/static/images/svg/edit.svg';
import ProfileIcon from '@/static/images/svg/profile-icon.svg';
import CloseIcon from '@/static/images/svg/close.svg';
import DotsIcon from '@/static/images/svg/dots.svg';
import BookmarkIcon from '@/static/images/svg/bookmark-icon.svg';
import BookmarkFilledIcon from '@/static/images/svg/bookmark-filled-icon.svg';
import PolygonIcon from '@/static/images/svg/polygon-icon.svg';
import Avatar from 'vue-avatar';
import FacebookIcon from '@/static/images/svg/social/facebook.svg';
import InstagramIcon from '@/static/images/svg/social/instagram.svg';
import TelegramIcon from '@/static/images/svg/social/telegram.svg';
import ProfileEntity from '@/entities/ProfileEntity';
import TTag from '@/components/controls/TTag.vue';

@Component({
  components: {
    ProfileIcon,
    EditIcon,
    CloseIcon,
    DotsIcon,
    BookmarkIcon,
    BookmarkFilledIcon,
    PolygonIcon,
    FacebookIcon,
    InstagramIcon,
    TelegramIcon,
    Avatar,
    TTag,
  },
})
export default class UserCardComponent extends Vue {
  @Prop() readonly user!: ProfileEntity;

  userLink = {
    name: 'profile',
    query: {
      id: this.user.id,
    },
  };

  changeFavorites() {
    // if (this.user.isFavorite) {
    //   this.$emit('remove-from-favorite', this.user.id);
    // } else {
    //   this.$emit('add-to-favorite', this.user.id);
    // }
  }
}
</script>

<style lang="postcss">
.user-card {
  position: relative;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.06);
  border-radius: var(--defaultBorderRadius);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: var(--greyColor);
  line-height: 17px;
  width: 100%;
  text-decoration: none;
  transition: all 0.15s ease-in;

  &:hover {
    box-shadow: var(--hoverBlockBoxShadow);
  }

  &__content {
    padding: 0 10px;
    z-index: 1;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    margin-top: 20px;
    line-height: 17px;
    text-decoration: none;
    transition: all 0.15s ease-in;
  }

  &__author {
    display: flex;
    align-items: center;

    width: 100%;
  }

  &__author-avatar {
    height: 40px;
    width: 40px;
    min-width: 40px;
    margin: 0 5px;
  }

  &__name-block {
    flex-direction: row;
    width: calc(100% - 70px);
  }
  &__author-name {
    white-space: nowrap;

    font-weight: bold;
    margin-left: 5px;
    font-family: var(--fontFamily);
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    width: 100%;
    float: left;

    color: var(--blackColor);
    & > span {
      width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
      float: left;
    }
  }

  &__author-location {
    width: 100%;
    float: left;
    padding: 0px 5px;
    height: 20px;
    span.icon {
      width: 13px;
      height: 20px;
      background: #fff url(/images/svg/geo-icon.svg) no-repeat scroll 0px 4px;
      background-size: 10px 10px;
      float: left;
    }
    span.text {
      width: calc(90% - 10px);
      overflow: hidden;
      float: left;
      font-size: 12px;
      padding-top: 1px;
      height: 20px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__icons {
    display: flex;
    align-items: center;
    display: none;
  }

  &__icon {
    width: 15px;
    color: var(--primaryColor);
    margin-left: 10px;
  }

  &__link-block {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    color: var(--greyColor);
    text-decoration: none;
  }

  &__footer {
    margin-bottom: 10px;
    padding: 10px;
  }

  &__location {
    margin-top: 15px;

    margin-right: 30px;
    color: var(--blackColor);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--blackColor);
  }
  &__about {
    color: var(--blackColor);
    font-family: var(--fontFamily);
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 21px;
    display: flex;
    text-align: left;

    height: 40px;
    margin: 5px 0px 15px 0px;
    overflow: hidden;
  }

  &__location-text {
    color: var(--greyColor);
  }

  &__role {
    width: 100%;
    padding: 0px 5px;
    color: var(--blackColor);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 18px;
    display: none;
  }

  &__role-text {
    color: var(--greyColor);
  }
  &__skills {
    margin-top: 10px;
    margin-right: 30px;
    color: var(--blackColor);
    flex-wrap: wrap;
    margin-left: -3px;
    max-height: 62px;
    overflow: hidden;
  }

  &__skills-text {
    background: gray;
    margin-right: 5px;
    color: white;
    padding: 10px;
    margin: 3px;
  }

  &__active-projects {
    display: none;
    margin-top: 15px;
    color: var(--blackColor);
    max-width: 280px;
    margin-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__active-projects-text {
    color: var(--greyColor);
  }

  &__bookmark {
    float: right;
    width: 40px;
    height: 100%;
  }
}
</style>
