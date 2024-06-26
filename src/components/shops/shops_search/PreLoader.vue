<template>
  <div class="pre_loaders">
    <VSkeletonLoader type="image, image, image" />
    <v-container fluid class="px-5 px-md-16 mt-10">
      <v-row>
        <v-col cols="12" sm="4" md="3" class="px-3">
          <VSkeletonLoader type="list-item@17" class="mt-5" />
        </v-col>
        <v-col cols="12" sm="8" md="9" class="px-3">
          <v-row class="mt-1">
            <v-col
              cols="12"
              sm="6"
              md="4"
              class="ps-3"
              v-for="num in 9"
              :key="num"
            >
              <VSkeletonLoader type="card" class="mt-5" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          class="px-3"
          v-for="num in 4"
          :key="num"
        >
          <VSkeletonLoader type="card" class="mt-5" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
</script>
