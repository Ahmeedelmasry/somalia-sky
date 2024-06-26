<template>
  <div class="location_card px-3 py-5">
    <div class="card pb-7">
      <div
        class="img_parent"
        style="cursor: pointer"
        @click="
          $router.push({
            name: 'productsSearch',
            query: { lcn: location.country },
          })
        "
      >
        <img src="@/assets/home/locations/Rectangle_134.png" alt="" />
      </div>
      <div class="card_body px-3">
        <div class="title">{{ location.country }}</div>
        <div class="ads">{{ location.ads_count }} Ads</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  location: {
    type: Object,
  },
});
</script>
