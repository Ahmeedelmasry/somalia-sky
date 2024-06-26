<template>
  <div class="product_header pb-7">
    <div class="breadcrumbs">
      <span>Somalia / </span><span>Shops / </span
      ><span>{{ shopDetails.name }} </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps(["shopDetails"]);
</script>
