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
        <div class="cont" v-if="chat.type == 'text'">{{ chat.message }}</div>
        <div class="cont" v-if="chat.type == 'file'">
          <a :href="chat.file.original_url" target="_blank">
            <img
              :src="chat.file.original_url"
              alt=""
              style="
                width: 200px;
                height: 200px;
                border-radius: 12px;
                margin-top: 10px;
                cursor: pointer;
              "
            />
          </a>
        </div>
        <div class="cont" v-if="chat.type == 'audio'">
          <audio controls>
            <source :src="chat.file.original_url" type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
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
