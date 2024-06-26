<template>
  <div class="overview pt-3">
    <AnalyticsNums v-if="ads.data && !loading" />
    <v-row>
      <v-col cols="12" v-if="loading">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            class="pa-2 mb-3"
            v-for="num in 3"
            :key="num"
          >
            <VSkeletonLoader type="image" />
          </v-col>
          <v-col cols="12" lg="6" class="pa-2 mb-3">
            <VSkeletonLoader type="table" />
          </v-col>
          <v-col cols="12" lg="6" class="pa-2 mb-3">
            <VSkeletonLoader type="list-item@9" />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            lg="4"
            class="pa-2"
            v-for="num in 3"
            :key="num"
          >
            <VSkeletonLoader type="card, text" />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        cols="12"
        lg="7"
        class="ps-sm-4 pe-sm-4 pe-lg-3"
        v-if="ads.data && !loading"
      >
        <StatisticalsCard />
      </v-col>
      <v-col
        cols="12"
        lg="5"
        class="pe-sm-4 ps-sm-4 ps-lg-3"
        v-if="ads.data && !loading"
      >
        <RecentActivities />
      </v-col>
      <v-col cols="12" v-if="ads.data && !loading">
        <RecentAds
          title="Recently Posted Ads"
          bgColor="#fff"
          :num="4"
          :showBtn="false"
          :ads="ads.data.slice(0, 3)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import AnalyticsNums from "@/components/profile/overview/AnalyticsNums.vue";
import StatisticalsCard from "@/components/profile/overview/StatisticalsCard.vue";
import RecentActivities from "@/components/profile/overview/RecentActivities.vue";
import RecentAds from "@/components/profile/overview/RecentAds.vue";
import { profileAdStore } from "@/stores/profile/ads";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";

// Data
const { ads } = storeToRefs(profileAdStore());
const loading = ref(true);

onMounted(async () => {
  await profileAdStore().getAds();
  loading.value = false;
});
</script>
