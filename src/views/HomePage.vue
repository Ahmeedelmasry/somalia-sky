<template>
  <div class="home_page">
    <PreLoaders v-if="loading" />
    <HomeBanner :sliders="sliders" />
    <div v-if="!loading">
      <RecommendedAds
        title="Fresh Recommended Ads"
        bgColor="white"
        :num="7"
        :line="true"
        :showBtn="true"
        :ads="ads"
        v-if="ads.length"
      />
      <PopularLocations
        title="Popular Locations"
        :num="4"
        :locations="locations"
        v-if="locations.length"
      />
      <RecommendedAds
        title="Recently Posted Ads"
        bgColor="#1111112B"
        :num="4"
        :showBtn="false"
        :ads="ads.slice(0, 4)"
        v-if="ads.length"
      />
      <PremiumMembership />

      <DownloadApp />
    </div>
  </div>
</template>

<script setup>
import HomeBanner from "@/components/home_page/HomeBanner.vue";
import RecommendedAds from "@/components/home_page/RecommendedAds.vue";
import PopularLocations from "@/components/home_page/PopularLocations.vue";
import PremiumMembership from "@/components/home_page/PremiumMembership.vue";
import DownloadApp from "@/components/home_page/DownloadApp.vue";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import PreLoaders from "@/components/home_page/PreLoaders.vue";

// Stores
import { sliderStore } from "@/stores/home_page/slider";
import { homeAdStore } from "@/stores/home_page/ads";
import { homeLocationStore } from "@/stores/home_page/locations";

// Data
const { sliders } = storeToRefs(sliderStore());
const { ads } = storeToRefs(homeAdStore());
const { locations } = storeToRefs(homeLocationStore());
const loading = ref(true);

// Hooks
onMounted(async () => {
  loading.value = true;
  await Promise.all([
    homeAdStore().getAds(),
    sliderStore().getSliders(),
    homeLocationStore().getLocations(),
  ]);
  loading.value = false;
});
</script>
