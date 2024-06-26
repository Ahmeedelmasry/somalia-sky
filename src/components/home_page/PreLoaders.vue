<template>
  <div class="pre_loaders">
    <VSkeletonLoader type="image, image, image, image" />
    <v-container fluid class="px-3 px-md-16 mt-10">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="num in 4"
          :key="num"
          class="px-3"
        >
          <VSkeletonLoader type="image, image, heading, text, text" />
        </v-col>
        <v-col cols="12">
          <v-divider class="mt-10"></v-divider>
          <v-divider></v-divider>
          <v-divider class="mb-10"></v-divider>
        </v-col>
      </v-row>
      <v-row class="pt-10">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="num in 4"
          :key="num"
          class="px-3"
        >
          <VSkeletonLoader type="image, image, heading, text, text" />
        </v-col>
        <v-col cols="12">
          <v-divider class="mt-10"></v-divider>
          <v-divider></v-divider>
          <v-divider class="mb-10"></v-divider>
        </v-col>
      </v-row>
      <v-row class="pt-10">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="num in 4"
          :key="num"
          class="px-3"
        >
          <VSkeletonLoader type="image, image, heading, text, text" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
</script>
