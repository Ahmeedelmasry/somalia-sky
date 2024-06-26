<template>
  <div
    class="message_row py-3 my-1 px-5"
    @click="$router.push({ name: 'messageRoom', params: { id: room.id } })"
  >
    <div class="parent d-flex align-center">
      <div class="img me-3">
        <v-avatar>
          <img src="@/assets/SVGS/product/info_avatar.png" alt="" width="40" />
        </v-avatar>
      </div>
      <div class="msg">
        <div class="name">
          {{ room.users.find((el) => el.id != loggerData.id).name }}
        </div>
        <div class="cont">{{ room.latest_message.message }}</div>
      </div>
      <div
        class="time_parent d-flex flex-column justify-center align-center ms-auto"
      >
        <div class="time">{{ moment(room.created_at).format("hh:mm a") }}</div>
        <!-- <div class="msgs_count">
          <v-badge content="3" color="#1A85B8"></v-badge>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import moment from "moment";

// Init Store
const authModule = authStore();

// Data
const { loggerData } = storeToRefs(authModule);

defineProps(["room"]);
</script>
