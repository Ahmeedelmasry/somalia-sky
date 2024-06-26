<template>
  <div class="favourites">
    <MyFavourites
      title="My Favourites"
      bgColor="#fff"
      :num="4"
      :showBtn="false"
      :ads="favourtis"
      v-if="favourtis.data && !loading"
    />
    <v-container fluid v-if="loading">
      <v-row>
        <v-col cols="12" sm="6" lg="4" class="pa-2" v-for="num in 6" :key="num">
          <VSkeletonLoader type="card, text" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import MyFavourites from "@/components/profile/favourites/MyFavourites.vue";
import { profileFavStore } from "@/stores/profile/favourits";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

// Data
const { favourtis } = storeToRefs(profileFavStore());
const loading = ref(true);

onMounted(async () => {
  await profileFavStore().getFavourits();
  loading.value = false;
});
</script>
