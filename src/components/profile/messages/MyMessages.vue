<template>
  <div class="my_messages mt-4">
    <div
      class="search d-flex justify-space-between align-md-center flex-column flex-md-row"
    >
      <v-text-field
        prepend-icon="mdi-magnify"
        variant="underlined"
        label="Search For Messages"
        class="w-100"
      ></v-text-field>
      <div class="avatar_parent d-flex align-center">
        <v-avatar class="me-2 ms-md-4">
          <img src="@/assets/SVGS/product/info_avatar.png" alt="" width="40" />
        </v-avatar>
        <div class="name" style="white-space: nowrap">
          {{ loggerData.name }}
        </div>
      </div>
    </div>
    <!-- <div class="filters mb-7">
      <v-tabs>
        <v-tab value="Unread">Unread</v-tab>
        <v-tab value="Old">Old</v-tab>
        <v-tab value="Starred">Starred</v-tab>
      </v-tabs>
    </div> -->
    <v-row class="msgs_parent">
      <v-col cols="12" v-for="room in rooms.chats" :key="room.id">
        <MessageRow :room="room" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import MessageRow from "./MessageRow.vue";
import { defineProps } from "vue";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

// Data
const { loggerData } = storeToRefs(authStore());

defineProps(["rooms"]);
</script>
