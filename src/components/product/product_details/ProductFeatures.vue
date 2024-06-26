<template>
  <div class="product_features mt-9 mb-5">
    <div class="title mb-8">Features</div>
    <div class="features">
      <v-row class="ps-md-3">
        <v-col cols="12" sm="5" v-for="num in 13" :key="num">
          <v-icon color="green-darken-3" class="me-2">mdi-check</v-icon>
          <span>Super Retina XDR display6</span>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["adDetails"]);
</script>
