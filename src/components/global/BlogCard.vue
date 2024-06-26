<template>
  <div class="blog_card">
    <v-card
      elevation="0"
      style="border-top-left-radius: 12px; border-top-right-radius: 12px"
    >
      <img
        src="/blogs/blog_post.png"
        alt=""
        class="w-100"
        style="height: 250px; object-fit: cover"
      />
      <div class="labels">
        <span class="author">Ahmed Elmasry</span>
        <span class="date">25/4/2024</span>
      </div>
      <div class="title">Lorem ipsum dolor sit amet consectetur.</div>
      <div class="content">
        Lorem ipsum dolor sit amet consectetur. Augue vitae morbi id varius
        dictum lorem sapien. Quisque enim mattis cras et ut leo aenean tempor
        in.
      </div>
      <ActionButton
        bgColor="#013331"
        textColor="white"
        text="Read Full Article"
      />
    </v-card>
  </div>
</template>

<script setup>
import ActionButton from "./ActionButton.vue";
</script>
