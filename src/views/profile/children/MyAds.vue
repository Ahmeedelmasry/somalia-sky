<template>
  <div class="my_ads">
    <PostedAds
      title="Posted Ads"
      bgColor="#fff"
      :num="4"
      :showBtn="false"
      :ads="ads"
      v-if="ads.data && !loading"
    />
    <v-container fluid v-if="loading">
      <v-row>
        <v-col cols="12" sm="6" lg="4" class="pa-2" v-for="num in 6" :key="num">
          <VSkeletonLoader type="card, text" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import PostedAds from "@/components/profile/my_ads/PostedAds.vue";
import { profileAdStore } from "@/stores/profile/ads";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

// Data
const { ads } = storeToRefs(profileAdStore());
const loading = ref(true);

onMounted(async () => {
  await profileAdStore().getAds();
  loading.value = false;
});
</script>
