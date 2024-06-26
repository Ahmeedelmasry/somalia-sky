<template>
  <div
    class="recommended_ads mt-5 pt-10"
    :style="`background-color: ${bgColor}`"
    v-if="ads.length"
  >
    <h2 :class="['section_title', `text-${alignment || 'center'}`]">
      {{ title }}
    </h2>
    <Swiper
      :modules="modules"
      :slides-per-view="4"
      :breakpoints="breakpoints"
      :space-between="0"
      class="pb-9"
      :navigation="{ prevIcon: '.swiper-prev', nextIcon: '.swiper-next' }"
      :autoplay="{
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide style="max-height: 500px" v-for="ad in ads" :key="ad.id">
        <ProductCard
          :ad="ad"
          @card_clicked="
            $router.push({
              name: 'productDetails',
              params: { id: $event.id, catId: $event.subcategory.id },
            })
          "
        />
      </swiper-slide>
      <!-- <div class="swiper-prev"></div> -->
      <div class="swiper-next"></div>
    </Swiper>
  </div>
</template>

<script setup>
import ProductCard from "@/components/global/ProductCard";
// import ActionButton from "@/components/global/ActionButton";
import { defineProps, ref } from "vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { Pagination, Navigation, Autoplay } from "swiper";

const modules = [Pagination, Navigation, Autoplay];

const breakpoints = ref({
  0: {
    slidesPerView: 1,
  },
  640: {
    slidesPerView: 2,
  },
  960: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
});

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
