<template>
  <div class="pre_loaders">
    <v-container fluid class="px-3 px-md-16 py-16">
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="num in 3" :key="num" class="px-3">
          <VSkeletonLoader type="heading, text, text, table, button" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
</script>
