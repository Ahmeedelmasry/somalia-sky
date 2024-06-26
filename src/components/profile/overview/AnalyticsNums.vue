<template>
  <div class="analytic_nums mt-8 mt-md-0">
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="4"
        class="px-sm-3 px-lg-4 mb-6 mb-lg-0"
        v-for="(card, i) in cards"
        :key="i"
      >
        <v-card class="px-6 py-7 num_card" elevation="0" :color="card.bg">
          <div class="parent d-flex justify-space-between align-center">
            <div class="left">
              <div class="num">{{ card.num }}</div>
              <div class="name mt-2">{{ card.name }}</div>
            </div>
            <div class="right">
              <div class="img_container">
                <img :src="card.img" alt="" />
              </div>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Data
const cards = ref([
  {
    img: "/svgs/profile/overview/posted_ads.svg",
    num: "30",
    name: "Posted Ads",
    bg: "#3EC3FF2E",
  },
  {
    img: "/svgs/profile/overview/favourit.svg",
    num: "50",
    name: "Favorite Ads",
    bg: "#ADE79252",
  },
  {
    img: "/svgs/profile/overview/expire.svg",
    num: "20",
    name: "Expire Ads",
    bg: "#FF89897A",
  },
]);
</script>
