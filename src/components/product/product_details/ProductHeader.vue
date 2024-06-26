<template>
  <div class="product_header py-7">
    <div class="labels d-flex align-center flex-wrap" style="gap: 10px">
      <v-chip color="orange">Featured</v-chip>
      <v-chip color="red">
        <v-icon size="16" class="me-2">mdi-star-circle</v-icon> Member</v-chip
      >
      <v-chip color="green">
        <v-icon size="16" class="me-2">mdi-check-circle</v-icon>
        Verified Seller</v-chip
      >
    </div>
    <div class="title my-4">
      {{ adDetails.name }}
    </div>
    <div
      class="location_parent d-flex align-center flex-wrap"
      style="gap: 10px"
    >
      <div class="location d-flex align-center" style="gap: 5px">
        <v-icon size="16">mdi-map-marker-outline</v-icon>
        <span>{{ adDetails.location }}</span>
      </div>
      <div class="time d-flex align-center" style="gap: 5px">
        <v-icon size="16">mdi-clock-outline</v-icon>
        <span>{{ moment(adDetails.updated_at).format("DD-MM-YYYY") }}</span>
      </div>
      <!-- <div class="views d-flex align-center" style="gap: 5px">
        <v-icon size="16">mdi-eye-outline</v-icon>
        <span>999 Viewed</span>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import moment from "moment";

defineProps(["adDetails"]);
</script>
