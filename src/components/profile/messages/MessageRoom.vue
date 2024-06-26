<template>
  <div class="my_messages mt-4" v-if="chatDetails">
    <!-- <div
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
    </div> -->
    <!-- <div class="filters mb-7">
      <v-tabs>
        <v-tab value="Unread">Unread</v-tab>
        <v-tab value="Old">Old</v-tab>
        <v-tab value="Starred">Starred</v-tab>
      </v-tabs>
    </div> -->

    <div
      class="message_row py-3 mb-3 px-5 active"
      style="cursor: auto !important"
    >
      <div class="parent d-flex align-center">
        <div class="img me-3">
          <v-avatar>
            <img
              src="@/assets/SVGS/product/info_avatar.png"
              alt=""
              width="40"
            />
          </v-avatar>
        </div>
        <div class="msg">
          <div class="name">
            {{ chatDetails.users.find((el) => el.id != loggerData.id).name }}
          </div>
        </div>
        <div
          class="time_parent d-flex flex-column justify-center align-center ms-auto"
        >
          <v-avatar color="blue-darken-1" size="18">
            <v-icon size="12" @click="$router.push({ name: 'profileMessages' })"
              >mdi-close</v-icon
            >
          </v-avatar>
        </div>
      </div>
    </div>
    <v-row class="msgs_parent">
      <v-col cols="12" v-for="(chat, i) in chatDetails.messages" :key="i">
        <RoomRow
          :chat="chat"
          :alignment="chat.sender.id == loggerData.id ? 'end' : 'start'"
        />
      </v-col>
    </v-row>
    <v-row class="align-center pt-7">
      <!-- <v-col cols="12" sm="2" lg="1">
        <div class="attach text-center text-sm-start mb-2 mb-sm-0">
          <img
            src="@/assets/SVGS/profile/messages/plus.svg"
            alt=""
            width="25"
            class="me-2"
            style="cursor: pointer"
          />
          <img
            src="@/assets/SVGS/profile/messages/attach_img.svg"
            alt=""
            width="25"
            style="cursor: pointer"
          />
        </div>
      </v-col> -->
      <v-col cols="12">
        <form @submit.prevent="sendMessage">
          <div class="text_field">
            <input
              type="text"
              placeholder="Write...."
              v-model="message"
              :disabled="loading"
            />
            <v-btn
              rounded="xl"
              flat
              :loading="loading"
              @click="sendMessage"
              :disabled="!message"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
        </form>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from "vue";
import RoomRow from "./RoomRow.vue";
import { chatStore } from "@/stores/profile/chat";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

// Data
const { loggerData } = storeToRefs(authStore());
const loading = ref(false);
const message = ref("");

// Init ROuter
const route = useRoute();

// Props
const props = defineProps(["chatDetails"]);

watch(
  () => props.chatDetails,
  (newVal, oldVal) => {
    if (newVal != oldVal) {
      setTimeout(() => {
        const msgsParent = document.querySelector(".msgs_parent");
        msgsParent.scrollTop = msgsParent.scrollHeight;
      }, 500);
    }
  }
);

const sendMessage = async () => {
  loading.value = true;
  if (message.value) {
    const res = await chatStore().sendNewMessage(
      {
        chat_id: props.chatDetails.id,
        type: "text",
        message: message.value,
      },
      false
    );
    if (res) {
      const msgsParent = document.querySelector(".msgs_parent");
      await chatStore().getChatDetails(route.params.id);
      msgsParent.scrollTop = msgsParent.scrollHeight;

      message.value = "";
    }
  }
  loading.value = false;
};
</script>
