<template>
  <div class="product_gallary">
    <div
      class="gallary_main_img_parent px-md-16"
      style="background-color: #d8d8d8"
    >
      <img :src="currentImg" alt="" class="w-100" />
    </div>
    <v-tabs
      class="my-5 px-0 mx-0"
      density="compact"
      height="110"
      :show-arrows="true"
      center-active
      v-model="currentImg"
    >
      <v-tab
        v-for="(img, i) in adDetails.images"
        :key="i"
        :value="img.original_url"
      >
        <img class="gallary_primary_img" :src="img.original_url" alt="" />
      </v-tab>
    </v-tabs>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(["adDetails"]);

const currentImg = ref(null);

onMounted(() => {
  currentImg.value = props.adDetails.images[0]?.original_url || null;
});
</script>
