<template>
  <div class="res_nav">
    <v-app-bar density="compact" height="100" elevation="3">
      <v-container class="py-0 px-0 ps-4">
        <v-row class="align-center w-100">
          <v-col cols="2">
            <div class="nav_logo_container d-flex align-center">
              <v-app-bar-nav-icon
                style="font-size: 25px"
                color="grey"
                @click="drawer = !drawer"
                class="me-2"
              ></v-app-bar-nav-icon>
              <img
                src="@/assets/SVGS/navbar/logo.svg"
                alt=""
                width="70"
                style="cursor: pointer"
                @click="$router.push({ name: 'home' })"
              />
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4">
            <div class="register_btns d-flex justify-end" style="gap: 10px">
              <div class="profile_btn d-flex align-center" style="gap: 12px">
                <v-avatar
                  v-show="loggerData.name"
                  size="50"
                  id="profile_menu"
                  style="cursor: pointer"
                >
                  <v-icon size="50">mdi-account-circle</v-icon>
                </v-avatar>
                <v-menu
                  activator="#profile_menu"
                  transition="slide-y-transition"
                  offset="18 40"
                >
                  <v-list class="px-0" width="150">
                    <v-list-item
                      :to="{ name: 'profileOverview' }"
                      value="profileOverview"
                    >
                      <v-list-item-title
                        class="d-flex align-center"
                        style="gap: 10px"
                      >
                        <v-icon>mdi-account-circle-outline</v-icon>
                        Profile</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item
                      :to="{ name: 'profileSettings' }"
                      value="profileSettings"
                      v-show="!$route.path.includes('profile')"
                    >
                      <v-list-item-title
                        class="d-flex align-center"
                        style="gap: 10px"
                      >
                        <v-icon>mdi-cog-outline</v-icon>
                        Settings</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item @click="authModule.logOut">
                      <v-list-item-title
                        class="d-flex align-center"
                        style="gap: 10px"
                      >
                        <v-icon>mdi-logout</v-icon>
                        Logout</v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
                <action-btn
                  bgColor="#1111112B"
                  textColor="rgb(1 51 49)"
                  direction="start"
                  @click="$emit('openLogin')"
                  :height="45"
                  v-show="!loggerData.name"
                >
                  <v-icon size="25">mdi-login</v-icon>
                </action-btn>
                <action-btn
                  bgColor="rgb(1 51 49)"
                  textColor="white"
                  direction="start"
                  :height="45"
                >
                  <img
                    src="@/assets/SVGS/navbar/plus.svg"
                    alt=""
                    class="me-1"
                    width="22"
                    style="border: 1px solid white; border-radius: 50%"
                  />
                </action-btn>
              </div>
            </div>
          </v-col> </v-row
      ></v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import ActionBtn from "@/components/global/ActionButton.vue";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";

// Init Store
const mainModule = mainStore();
const authModule = authStore();

// Data
const { drawer } = storeToRefs(mainModule);
const { loggerData } = storeToRefs(authModule);
</script>

<style lang="scss">
.res_nav {
  .register_btns {
    .langs {
      button {
        background-color: #ebeff2;
        transition: color 0.3s, background 0.3s;
        font-weight: 600;
        letter-spacing: 0.2px;
        text-transform: capitalize;
        font-size: 13px;
        color: #022f5d;
        text-decoration: none;
        text-transform: capitalize;
        &:hover {
          color: rgb(255, 115, 0);
        }
      }
    }
    button {
      background-color: rgb(255, 115, 0);
      color: white;
      text-transform: capitalize;
      transition: color 0.3s, background 0.3s;
      font-weight: 600;
      letter-spacing: 0.2px;
      text-transform: capitalize;
      font-size: 13px;
      text-decoration: none;
      text-transform: capitalize;
    }
  }
  .profile_btn {
    button {
      background-color: rgba(255, 115, 0, 0.188);
      transition: color 0.3s, background 0.3s;
      font-weight: 600;
      letter-spacing: 0.2px;
      text-transform: capitalize;
      font-size: 13px;
      color: #022f5d;
      text-decoration: none;
      text-transform: capitalize;
      &:hover {
        color: rgb(255, 115, 0);
      }
    }
  }
}
</style>
