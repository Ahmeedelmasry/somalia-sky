<template>
  <div
    class="shop_ads mt-5 py-10 px-5 px-md-13"
    :style="`background-color: ${bgColor}`"
    v-if="ads.length"
  >
    <h2 :class="['section_title', `text-${alignment || 'center'}`]">
      {{ title }}
    </h2>
    <v-container fluid class="mt-10 px-md-9">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="ad in ads" :key="ad.id">
          <ProductCard
            :ad="ad"
            @card_clicked="
              $router.push({
                name: 'productDetails',
                params: { id: $event.id, catId: $event.subcategory.id },
              })
            "
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProductCard from "@/components/global/ProductCard";
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
  },
  bgColor: {
    type: String,
  },
  num: {
    type: Number,
  },
  line: {
    type: Boolean,
  },
  showBtn: {
    type: Boolean,
  },
  alignment: {
    type: String,
  },
  ads: {
    type: Array,
  },
});
</script>
