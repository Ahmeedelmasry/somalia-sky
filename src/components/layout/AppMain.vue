<template>
  <div class="app_main">
    <v-app>
      <SideDrawer />
      <AppNav
        v-if="vuetify.display.mdAndUp.value"
        :showNav="showNav"
        :currentScroll="currentScroll"
        @openLogin="openSignIn = true"
        :showSearch="showSearch"
      />
      <ResponsiveNav
        v-if="!vuetify.display.mdAndUp.value"
        @openLogin="openSignIn = true"
      />
      <v-main
        :style="`background: white; padding-top: ${
          vuetify.display.mdAndUp.value ? '178px' : '80px'
        }`"
      >
        <slot></slot>
      </v-main>
      <AppFooter />
    </v-app>

    <SignIn
      v-if="openSignIn"
      :openPopup="openSignIn"
      @close_popup="openSignIn = false"
      @sign_up="openSignUp = true"
      @verify="openVerify = true"
    />

    <SignUp
      v-if="openSignUp"
      @sign_in="
        $event
          ? mainStore().handleErr(
              'success',
              'Register Success',
              'You have registered successfulley, please login to your account',
              'Login'
            )
          : (openSignIn = true)
      "
      :openPopup="openSignUp"
      @close_popup="openSignUp = false"
      @verify="openVerify = true"
    />

    <VerifyCode
      v-if="openVerify"
      :openPopup="openVerify"
      @close_popup="openVerify = false"
      @sign_up="openSignUp = true"
    />
  </div>
</template>

<script setup>
import AppFooter from "./AppFooter.vue";
import AppNav from "./AppNav.vue";
import ResponsiveNav from "./ResponsiveNav.vue";
import SideDrawer from "./SideDrawer.vue";
import { createVuetify } from "vuetify";
import { onMounted, ref, computed } from "vue";
import SignIn from "../auth/SignIn.vue";
import SignUp from "../auth/SignUp.vue";
import VerifyCode from "../auth/VerifyCode.vue";
import { useRoute } from "vue-router";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

// Init Router
const route = useRoute();

// Init Vuetify
const vuetify = createVuetify();

// Data
const { openSignIn } = storeToRefs(mainStore());
const currentScroll = ref(0);
const showNav = ref(true);
const openSignUp = ref(false);
const openVerify = ref(false);

// Computed
const showSearch = computed(() => {
  if (route.name == "home") return true;
  return false;
});

// Hooks
onMounted(() => {
  window.onscroll = () => {
    if (currentScroll.value > window.scrollY) {
      showNav.value = true;
    } else {
      showNav.value = false;
    }
    currentScroll.value = window.scrollY;
  };
});
</script>
