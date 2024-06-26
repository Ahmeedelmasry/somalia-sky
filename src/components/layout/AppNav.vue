<template>
  <div class="app_nav">
    <transition>
      <v-app-bar
        density="compact"
        height="120"
        :elevation="0"
        style="border-bottom: 1px solid black"
        v-if="showNav || currentScroll < 200"
      >
        <v-container class="py-0 px-16" fluid>
          <v-row class="align-center">
            <v-col :cols="3">
              <div class="nav_logo_container">
                <img
                  src="@/assets/SVGS/navbar/logo.svg"
                  alt=""
                  width="80"
                  height="80"
                  style="cursor: pointer"
                  @click="$router.push({ name: 'home' })"
                />
              </div>
            </v-col>
            <v-col cols="6">
              <div class="nav_search position-relative">
                <div
                  class="position-relative mx-auto"
                  style="width: fit-content"
                >
                  <form
                    action=""
                    @submit.prevent="
                      $router.push({
                        name: 'productsSearch',
                        query: { ...$route.query, kw: keyword },
                      })
                    "
                  >
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Ads Title, Keywords..."
                      v-model="keyword"
                    />
                    <v-icon
                      style="
                        position: absolute;
                        left: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #00000069;
                      "
                      @click="
                        $router.push({
                          name: 'productsSearch',
                          query: { ...$route.query, kw: keyword },
                        })
                      "
                      >mdi-magnify</v-icon
                    >
                  </form>
                </div>
              </div>
            </v-col>

            <v-col :cols="3" class="d-flex justify-end">
              <div class="register_btns d-flex align-center" style="gap: 10px">
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
                  offset="23"
                >
                  <v-list class="px-0" width="200">
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
                    <v-list-item @click="authStore().logOut">
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
                <ActionBtn
                  text="Sign In"
                  bgColor="#1111112B"
                  textColor="rgb(1 51 49)"
                  @click="$emit('openLogin')"
                  v-show="!loggerData.name"
                />
                <action-btn
                  text="Post Ads"
                  bgColor="#013331"
                  textColor="#fff"
                  direction="start"
                  @clicked="
                    !loggerData.name ? $emit('openLogin') : (createAd = true)
                  "
                >
                  <img
                    src="@/assets/SVGS/navbar/plus.svg"
                    alt=""
                    class="me-1"
                    width="17"
                    style="border: 1px solid white; border-radius: 50%"
                  />
                </action-btn>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
    </transition>
    <v-app-bar
      density="compact"
      class="py-3"
      elevation="3"
      style="border-bottom: 1px solid #e9ecef"
    >
      <v-container class="py-0 px-16" fluid>
        <v-row class="align-center">
          <v-col cols="2" class="all_cats_btn">
            <action-btn
              text="All Categories"
              bgColor="#1111112B"
              textColor="#013331"
              direction="end"
              height="40"
              id="all_cats_lg"
            >
              <v-icon size="20">mdi-chevron-down</v-icon>
            </action-btn>
            <v-menu
              activator="#all_cats_lg"
              transition="slide-y-transition"
              offset="2"
            >
              <v-list class="px-0" width="200" mandatory>
                <v-list-item
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.name"
                  class="px-0"
                >
                  <router-link
                    class="nav_link d-block py-2 px-3 w-100"
                    :to="{
                      name: 'productsSearch',
                      query: { ...$route.query, cn: cat.name, ci: cat.id },
                    }"
                    style="color: black"
                    ><v-icon>mdi-circle-small</v-icon>
                    {{ cat.name }}</router-link
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="10">
            <ul class="links">
              <li>
                <router-link
                  :to="{
                    name: 'home',
                  }"
                  class="link_hover"
                >
                  Home</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'productsSearch',
                  }"
                  class="link_hover"
                >
                  Ads</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'shopsSearch',
                  }"
                  class="link_hover"
                >
                  Shops</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'blogsListing',
                  }"
                  class="link_hover"
                >
                  Blogs</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    name: 'choosePlan',
                  }"
                  class="link_hover"
                >
                  Get Membership</router-link
                >
              </li>
              <!-- <li>
                <router-link
                  :to="{
                    name: 'home',
                  }"
                  class="link_hover"
                >
                  Contact</router-link
                >
              </li> -->
            </ul>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import ActionBtn from "@/components/global/ActionButton.vue";
import { defineProps, onMounted, watch } from "vue";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { categoryStore } from "@/stores/categories/categories";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { profileAdStore } from "@/stores/profile/ads";

// Init router
const route = useRoute();

// Data
const { loggerData } = storeToRefs(authStore());
const { categories } = storeToRefs(categoryStore());
const { createAd } = storeToRefs(profileAdStore());

const keyword = ref(null);

// Props
defineProps({
  showNav: {
    type: Boolean,
  },
  showSearch: {
    type: Boolean,
  },
  currentScroll: {
    type: Number,
  },
});

watch(
  () => route,
  () => {
    if (route.query.kw) {
      keyword.value = route.query.kw;
    } else {
      keyword.value = null;
    }
  },
  { deep: true }
);

onMounted(async () => {
  await categoryStore().getCategories();
});
</script>

<style lang="scss">
.app_nav {
  .v-enter-active,
  .v-leave-active {
    transition: 0.1s all ease-in-out;
  }

  .v-enter-from,
  .v-leave-to {
    transform: scaleY(0);
  }
}
</style>
