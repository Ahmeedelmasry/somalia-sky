<template>
  <div class="my_messages">
    <MessageRoom :chatDetails="chatDetails" />
  </div>
</template>

<script setup>
import MessageRoom from "@/components/profile/messages/MessageRoom.vue";
import { chatStore } from "@/stores/profile/chat";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// Data
const { chatDetails } = storeToRefs(chatStore());

// Init Router
const route = useRoute();

// Hooks
onMounted(() => {
  chatStore().getChatDetails(route.params.id);
});
</script>
