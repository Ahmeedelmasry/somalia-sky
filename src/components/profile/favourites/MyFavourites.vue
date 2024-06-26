<template>
  <div class="my_favourites" :style="`background-color: ${bgColor}`">
    <v-container class="px-0 pb-16" fluid v-if="ads.data">
      <v-row>
        <v-col cols="12" sm="6" lg="4" v-for="ad in ads.data" :key="ad.id">
          <ProductCard
            @card_clicked="
              $router.push({
                name: 'productDetails',
                params: { id: ad.id, catId: ad.subcategory.id },
              })
            "
            :ad="ad"
          />
        </v-col>
        <v-col cols="12" class="text-center mt-10" v-if="showBtn">
          <action-button
            text="View All"
            bgColor="#013331"
            textColor="#fff"
            direction="end"
            weight="400"
          >
            <img
              src="@/assets/SVGS/home/arrow_right.svg"
              alt=""
              width="20"
              class="ms-4"
            />
          </action-button>
        </v-col>
        <v-col cols="12" class="mt-15 mb-10" v-if="line">
          <v-divider></v-divider>
          <v-divider></v-divider>
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ProductCard from "@/components/global/ProductCard";
import ActionButton from "@/components/global/ActionButton";
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
    type: Object,
  },
});
</script>

<style lang="scss">
.my_favourites {
  .product_card {
    padding-top: 0 !important;
    padding-bottom: 30px !important;
  }
}
</style>
