<template>
  <div class="blogs_listing_com mb-16">
    <div
      class="banner_parent d-flex align-center justify-center mb-10 px-10"
      style="height: 500px; background-color: #e6e6e6ab"
    >
      <div class="cont text-center">
        <img
          src="/blogs/banner.png"
          alt=""
          style="max-width: 400px; width: 100%"
        />
        <p style="font-family: RailwaySemi, sans-serif" class="mt-1">
          Lorem ipsum dolor sit amet consectetur. Dignissim ut vel lacus id id
          pulvinar amet
        </p>
      </div>
    </div>
    <v-container fluid class="px-5 px-md-16">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          lg="3"
          v-for="num in 8"
          :key="num"
          class="px-4 py-7"
        >
          <BlogCard
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import BlogCard from "../global/BlogCard.vue";
</script>
