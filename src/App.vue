<template>
  <app-main>
    <router-view />
    <GlobalAlert @clicked="btn_text == 'Login' ? (openSignIn = true) : false" />
    <CreateAd v-if="createAd" />
  </app-main>
</template>

<script setup>
import AppMain from "./components/layout/AppMain.vue";
import GlobalAlert from "./components/global/GlobalAlert.vue";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import CreateAd from "@/components/profile/my_ads/CreateAd.vue";
import { profileAdStore } from "./stores/profile/ads";
import { watch } from "vue";
import { shopStore } from "@/stores/shops/shops";

const { openSignIn, btn_text } = storeToRefs(mainStore());
const { createAd } = storeToRefs(profileAdStore());

// Watchers
watch(
  () => createAd.value,
  (newVal) => {
    if (newVal) {
      shopStore().getProfileShops();
    }
  }
);
</script>

<style lang="scss">
#app {
  overflow: hidden;
}

@font-face {
  font-family: RailwayRegular;
  src: url(./assets/fonts/static/Raleway-Regular.ttf);
}

@font-face {
  font-family: RailwaySemi;
  src: url(./assets/fonts/static/Raleway-SemiBold.ttf);
}

@font-face {
  font-family: RailwayBold;
  src: url(./assets/fonts/static/Raleway-Bold.ttf);
}

* {
  font-family: RailwayRegular, sans-serif;
}

.v-col,
.v-col-lg-12,
.v-col-lg-11,
.v-col-lg-10,
.v-col-lg-9,
.v-col-lg-8,
.v-col-lg-7,
.v-col-lg-6,
.v-col-lg-5,
.v-col-lg-4,
.v-col-lg-3,
.v-col-lg-2,
.v-col-lg-1,
.v-col-md-12,
.v-col-md-11,
.v-col-md-10,
.v-col-md-9,
.v-col-md-8,
.v-col-md-7,
.v-col-md-6,
.v-col-md-5,
.v-col-md-4,
.v-col-md-3,
.v-col-md-2,
.v-col-md-1,
.v-col-sm-12,
.v-col-sm-11,
.v-col-sm-10,
.v-col-sm-9,
.v-col-sm-8,
.v-col-sm-7,
.v-col-sm-6,
.v-col-sm-5,
.v-col-sm-4,
.v-col-sm-3,
.v-col-sm-2,
.v-col-sm-1 {
  padding-inline-start: 0 !important;
  padding-inline-end: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.err_message {
  color: indianred;
  font-size: 12px;
  font-weight: bold;
  display: block;
}
a {
  text-decoration: unset;
}
.profile_menu {
  .v-list {
    border-radius: 7px !important;
    padding: 0;
    .v-list-item {
      padding: 0 !important;
      .v-list-item-title {
        display: flex;
        align-items: center;
        padding: 10px 0;
        font-size: 14px;
        font-weight: 500;
        color: #06325d !important;
        position: relative;
        padding: 1rem 1.2rem;
        border-bottom: 1px solid #edf0f3;
      }
      &.v-list-item--active {
        .v-list-item-title {
          color: rgb(255, 115, 0) !important;
          background-color: rgba(250, 140, 50, 0.04);
        }
      }
    }
    .top_bar {
      background-color: rgb(255, 115, 0);
      padding: 15px 0 !important;
      .v-list-item-title {
        font-size: 18px;
        font-weight: bold !important;
        border-bottom: unset;
        color: #ffffff !important;
      }
    }
  }
}
</style>
