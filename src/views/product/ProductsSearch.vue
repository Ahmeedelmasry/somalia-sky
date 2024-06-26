<template>
  <div class="product_details">
    <PreLoader v-if="loading" />
    <div v-if="!loading">
      <FilterNav />
      <PageBanner />
      <PreviewProducts
        @open_send_message="(receiver = $event), (openSendMessage = true)"
        @addFav="addToFavourits($event)"
        :ads_results="ads_results"
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
import FilterNav from "@/components/product/products_search/FilterNav.vue";
import PageBanner from "@/components/product/products_search/PageBanner.vue";
import RecommendedAds from "@/components/home_page/RecommendedAds.vue";
import PreviewProducts from "@/components/product/products_search/PreviewProducts.vue";
import SendMessage from "@/components/product/products_search/SendMessage.vue";
import PreLoader from "@/components/product/products_search/PreLoader.vue";
import { ref, onMounted, watch } from "vue";
import { adSearchStore } from "@/stores/ads/adSearch";
import { homeAdStore } from "@/stores/home_page/ads";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { profileFavStore } from "@/stores/profile/favourits";
import { authStore } from "@/stores/auth";

// Init Router
const route = useRoute();

// Data
const openSendMessage = ref(false);
const loading = ref(false);
const receiver = ref(null);
const { ads } = storeToRefs(homeAdStore());
const { favourtis } = storeToRefs(profileFavStore());
const { ads_results } = storeToRefs(adSearchStore());
const { loggerData } = storeToRefs(authStore());

// Watchers
watch(
  () => route,
  () => {
    if (route.name == "productsSearch") {
      getData();
    }
  },
  { deep: true }
);

// Methods
const getData = async () => {
  const filters = route.query;
  loading.value = true;
  await Promise.all([
    homeAdStore().getAds(),
    adSearchStore().getAdsResults(filters),
  ]);
  loading.value = false;
};

const getUserFavs = async () => {
  if (loggerData.value.id) {
    profileFavStore().getFavourits();
  }
};

const addToFavourits = async (data) => {
  await profileFavStore().addFavourit({ ad_id: data.id });
  getData();
  getUserFavs();
};

onMounted(async () => {
  getData();
  if (!favourtis.value.data) {
    await getUserFavs();
  }
});
</script>
