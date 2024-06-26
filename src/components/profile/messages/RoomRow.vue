<template>
  <div class="message_row no_hover py-3 mb-1 px-8 mt-2">
    <div
      :class="[
        `parent`,
        `d-flex`,
        `flex-${alignment == 'start' ? 'row' : 'row-reverse'}`,
      ]"
    >
      <div :class="[`img`, `${alignment == 'start' ? 'me-3' : 'ms-3'}`]">
        <v-avatar>
          <img src="@/assets/SVGS/product/info_avatar.png" alt="" width="40" />
        </v-avatar>
      </div>
      <div :class="['msg', `text-${alignment}`]">
        <div class="name">{{ chat.sender.name }}</div>
        <div class="cont">{{ chat.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  alignment: {
    type: String,
  },
  chat: {
    type: Object,
    default: () => ({}),
  },
});
</script>
