<template>
  <div class="home_banner">
    <Swiper
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      :modules="modules"
      :slides-per-view="1"
      :space-between="0"
      class="pb-9"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
      :loop="true"
    >
      <swiper-slide
        class="w-100"
        style="max-height: 500px"
        v-for="(slider, i) in sliders"
        :key="i"
      >
        <v-card elevation="0" height="500" max-width="100%">
          <img
            :src="slider.image.original_url"
            style="
              height: 100%;
              transition: 0.5s all ease-in-out;
              cursor: pointer;
              width: 100%;
              object-fit: cover;
            "
            alt=""
          />
        </v-card>
      </swiper-slide>
      <div class="swiper-prev"></div>
      <div class="swiper-next"></div>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";
import { defineProps } from "vue";

const modules = [Pagination, Navigation, Autoplay];

// Props
defineProps(["sliders"]);
</script>
