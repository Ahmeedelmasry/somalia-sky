<template>
  <div class="page_banner">
    <div class="cover_img_parent position-relative">
      <img src="@/assets/product/product_details/cover.png" alt="" />
      <div class="content">
        <div class="title">{{ adDetails.name }}</div>
        <div class="breadcrumbs">
          <span>Home / </span><span>Ad List / </span
          ><span>{{ adDetails.subcategory.name }} / </span
          ><span v-if="adDetails.adDetail">
            <span
              v-for="(info, i) in adDetails.adDetail?.ad_detail.slice(0, 2)"
              :key="i"
              ><span v-for="(val, k, i) in info" :key="i"> {{ val }}/ </span>
            </span>
          </span>
          <span>{{ adDetails.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["adDetails"]);
</script>
