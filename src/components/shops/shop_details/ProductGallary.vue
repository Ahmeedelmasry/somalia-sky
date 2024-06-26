<template>
  <div class="product_gallary">
    <div class="shop_img_card">
      <v-card
        class="d-flex flex-column flex-md-row align-center pa-7 details_card"
        style="gap: 25px"
      >
        <div class="img_parent">
          <img
            :src="shopDetails.images[0].original_url"
            alt=""
            width="200"
            style="border-radius: 12px; max-height: 200px"
          />
        </div>
        <div class="cont">
          <div class="title mb-5">{{ shopDetails.name }}</div>
          <div class="location">{{ shopDetails.location }}</div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["shopDetails"]);
</script>
