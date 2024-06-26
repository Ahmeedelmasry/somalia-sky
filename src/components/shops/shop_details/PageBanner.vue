<template>
  <div class="page_banner">
    <div class="cover_img_parent position-relative">
      <img src="@/assets/product/product_details/cover.png" alt="" />
      <!-- <div class="content">
        <div class="title">Shops</div>
        <div class="breadcrumbs">
          <span>Home / </span><span>Shops / </span
          ><span>{{ shopDetails.name }} </span>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["shopDetails"]);
</script>
