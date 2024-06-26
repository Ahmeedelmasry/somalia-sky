<template>
  <div class="profile_main">
    <ProfileBanner />
    <v-container fluid class="px-11 px-sm-16 mt-13 mb-5">
      <v-row>
        <v-col cols="12" md="4" lg="3" class="pe-md-5">
          <ProfileSide class="d-none d-md-block" />
          <ResponsiveSide class="d-block d-md-none" />
        </v-col>
        <v-col cols="12" md="8" lg="9" class="ps-md-5">
          <RouterView />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProfileBanner from "@/components/profile/ProfileBanner.vue";
import ProfileSide from "@/components/profile/ProfileSide.vue";
import ResponsiveSide from "@/components/profile/ResponsiveSide.vue";
import { onMounted } from "vue";
import { chatStore } from "@/stores/profile/chat";
import { shopStore } from "@/stores/shops/shops";

// Init Store
const chatModule = chatStore();
const shopModule = shopStore();

// Methods
const connectChat = async () => {
  chatModule.connectPusher();
};

// Hooks
onMounted(() => {
  connectChat();
  shopModule.getProfileShops();
});
</script>
