<template>
  <div class="product_details">
    <PreLoader v-if="loading" />
    <div v-if="!loading">
      <!-- <FilterNav /> -->
      <PageBanner />
      <PreviewProducts
        @open_send_message="(receiver = $event), (openSendMessage = true)"
        @addFav="profileFavStore().addFavourit({ ad_id: $event.id })"
        :ads_results="ads_results"
        :shops="shops"
      />
      <SendMessage
        :openPopup="openSendMessage"
        @close_popup="(openSendMessage = false), (receiver = null)"
        v-if="openSendMessage"
        :receiver="receiver"
      />
      <RecommendedAds
        title="Hot Deals For Today"
        bgColor="#1111112B"
        :num="4"
        :ads="ads.slice(0, 4)"
        :showBtn="false"
      />
    </div>
  </div>
</template>

<script setup>
// import FilterNav from "@/components/shops/shops_search/FilterNav.vue";
import PageBanner from "@/components/shops/shops_search/PageBanner.vue";
import RecommendedAds from "@/components/home_page/RecommendedAds.vue";
import PreviewProducts from "@/components/shops/shops_search/PreviewProducts.vue";
import SendMessage from "@/components/shops/shops_search/SendMessage.vue";
import PreLoader from "@/components/shops/shops_search/PreLoader.vue";
import { ref, onMounted, watch } from "vue";
import { adSearchStore } from "@/stores/ads/adSearch";
import { homeAdStore } from "@/stores/home_page/ads";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { profileFavStore } from "@/stores/profile/favourits";
import { shopStore } from "@/stores/shops/shops";

// Init Router
const route = useRoute();

// Data
const openSendMessage = ref(false);
const loading = ref(false);
const receiver = ref(null);
const { ads } = storeToRefs(homeAdStore());
const { shops } = storeToRefs(shopStore());
const { ads_results } = storeToRefs(adSearchStore());

// Watchers
watch(
  () => route,
  () => {
    if (route.name == "shopsSearch") {
      getData();
    }
  },
  { deep: true }
);

// Methods
const getData = async () => {
  loading.value = true;
  await Promise.all([homeAdStore().getAds(), shopStore().getShops()]);
  loading.value = false;
};

onMounted(() => {
  getData();
});
</script>
