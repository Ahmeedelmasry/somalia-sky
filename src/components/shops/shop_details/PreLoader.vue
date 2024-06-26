<template>
  <div class="pre_loaders">
    <VSkeletonLoader type="image, image, image" />
    <v-container fluid class="px-3 px-md-16 mt-10">
      <v-row>
        <v-col cols="12" md="8" class="px-3">
          <VSkeletonLoader type="image, image" />
          <v-row class="mt-1">
            <v-col cols="6" sm="4" md="3" class="ps-3">
              <VSkeletonLoader type="image" class="mt-5" />
            </v-col>
            <v-col cols="6" sm="4" md="3" class="ps-3">
              <VSkeletonLoader type="image" class="mt-5" />
            </v-col>
            <v-col cols="12">
              <VSkeletonLoader type="article, text@9" class="mt-5" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" class="px-3">
          <VSkeletonLoader type="list-item@17" class="mt-5" />
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
