<template>
  <div class="shop_details">
    <PreLoader v-if="loading" />
    <PageBanner :shopDetails="shopDetails" v-if="shopDetails.id && !loading" />
    <v-container
      fluid
      class="px-7 px-md-16 pb-10"
      v-if="shopDetails.id && !loading"
    >
      <v-row>
        <v-col cols="12">
          <ProductHeader :shopDetails="shopDetails" />
        </v-col>
        <v-col cols="12" md="7" lg="8">
          <ProductGallary :shopDetails="shopDetails" />
          <ProductDescription :shopDetails="shopDetails" />
        </v-col>
        <v-col cols="12" md="5" lg="4" class="ps-md-7">
          <SideFilter :shopDetails="shopDetails" />
        </v-col>
      </v-row>
    </v-container>

    <RelatedAds
      :title="`${shopDetails.name} Crafts Items`"
      class="mt-16"
      bgColor="#fff"
      v-if="shopDetails.shopAd && shopDetails.shopAd.length && !loading"
      :num="4"
      :showBtn="false"
      alignment="start"
      :ads="shopDetails.shopAd"
      bg-color="#1111112B"
    />
    <div v-if="!loading" class="pt-10">
      <PremiumMembership />
      <DownloadApp />
    </div>
  </div>
</template>

<script setup>
import PageBanner from "@/components/shops/shop_details/PageBanner.vue";
import ProductHeader from "@/components/shops/shop_details/ProductHeader.vue";
import ProductGallary from "@/components/shops/shop_details/ProductGallary.vue";
import ProductDescription from "@/components/shops/shop_details/ProductDescription.vue";
import SideFilter from "@/components/shops/shop_details/SideFilter.vue";
import RelatedAds from "@/components/shops/shop_details/RelatedAds.vue";
import { shopStore } from "@/stores/shops/shops";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import PreLoader from "@/components/shops/shop_details/PreLoader.vue";
import PremiumMembership from "@/components/home_page/PremiumMembership.vue";
import DownloadApp from "@/components/home_page/DownloadApp.vue";

// Init Stores
const shopsModule = shopStore();

// Init Router
const route = useRoute();

// Data
const { shopDetails } = storeToRefs(shopsModule);
const loading = ref(true);

// Methods
const getData = async () => {
  loading.value = true;
  await shopsModule.getShopDetails(route.params.id);
  loading.value = false;
};

onMounted(() => {
  getData();
});
</script>
