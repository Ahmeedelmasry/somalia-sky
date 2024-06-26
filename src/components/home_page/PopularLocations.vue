<template>
  <div class="popular_locations">
    <h2 class="section_title">{{ title }}</h2>
    <v-container class="px-md-16 px-5" fluid style="margin-top: 130px">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="location in locations"
          :key="location.id"
        >
          <LocationCard :location="location" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import LocationCard from "@/components/global/LocationCard";
import { defineProps } from "vue";

defineProps({
  title: {
    type: String,
  },
  num: {
    type: Number,
  },
  locations: {
    type: Array,
  },
});
</script>
