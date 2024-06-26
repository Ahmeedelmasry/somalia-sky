<template>
  <div class="action_btn">
    <v-btn
      variant="elevated"
      elevation="0"
      :height="height || 50"
      :style="`text-transform: none; background: ${bgColor}; color: ${textColor}; letter-spacing: 0; font-weight: ${
        weight || 500
      }`"
      rounded="lg"
      @click="$emit('clicked')"
      :loading="loading"
    >
      <slot v-if="direction == 'start'"></slot>
      {{ text }}
      <slot v-if="direction == 'end'"></slot>
    </v-btn>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps([
  "bgColor",
  "textColor",
  "text",
  "direction",
  "height",
  "weight",
  "loading",
]);
</script>
