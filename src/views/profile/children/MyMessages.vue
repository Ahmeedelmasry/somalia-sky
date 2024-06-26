<template>
  <div class="my_messages">
    <MyMessages v-if="rooms.chats" :rooms="rooms" />
  </div>
</template>

<script setup>
import MyMessages from "@/components/profile/messages/MyMessages.vue";
import { chatStore } from "@/stores/profile/chat";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

// Init Store
const chatModule = chatStore();

const { rooms } = storeToRefs(chatModule);

// Hooks
onMounted(() => {
  chatModule.getRooms();
});
</script>
