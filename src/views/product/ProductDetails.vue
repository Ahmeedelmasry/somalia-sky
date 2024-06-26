<template>
  <div class="product_details">
    <PreLoader v-if="loading" />
    <PageBanner :adDetails="adDetails" v-if="adDetails.id && !loading" />
    <v-container fluid class="px-7 px-md-16" v-if="adDetails.id && !loading">
      <v-row>
        <v-col cols="12">
          <ProductHeader :adDetails="adDetails" />
        </v-col>
        <v-col cols="12" md="8">
          <ProductGallary :adDetails="adDetails" />
          <ProductDescription :adDetails="adDetails" />
          <ProductFeatures :adDetails="adDetails" />
        </v-col>
        <v-col cols="12" md="4" class="ps-md-7">
          <SideFilter :adDetails="adDetails" />
        </v-col>
        <v-col cols="12" v-if="relatedAds.length">
          <RelatedAds
            title="Related Ads"
            bgColor="#fff"
            :num="4"
            :showBtn="false"
            alignment="start"
            :ads="relatedAds"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import PageBanner from "@/components/product/product_details/PageBanner.vue";
import ProductHeader from "@/components/product/product_details/ProductHeader.vue";
import ProductGallary from "@/components/product/product_details/ProductGallary.vue";
import ProductDescription from "@/components/product/product_details/ProductDescription.vue";
import ProductFeatures from "@/components/product/product_details/ProductFeatures.vue";
import SideFilter from "@/components/product/product_details/SideFilter.vue";
import RelatedAds from "@/components/product/product_details/RelatedAds.vue";
import { adDetailStore } from "@/stores/ads/adDetails";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import PreLoader from "@/components/product/product_details/PreLoader.vue";

// Init Router
const route = useRoute();

// Data
const { adDetails, relatedAds } = storeToRefs(adDetailStore());
const loading = ref(true);

// Watchers
watch(
  () => route,
  () => {
    console.log(route.name);
    if (route.name == "productDetails") {
      getData();
    }
  },
  { deep: true }
);

// Methods
const getData = async () => {
  loading.value = true;
  await Promise.all([
    adDetailStore().getRelatedAds(route.params.catId, route.params.id),
    adDetailStore().getAdDetails(route.params.id),
  ]);
  loading.value = false;
};

onMounted(() => {
  getData();
});
</script>
