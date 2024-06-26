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
          <div class="images text-center py-3">
            <v-icon v-if="files.length" size="15" @click="files = []"
              >mdi-close</v-icon
            >
            <v-icon size="30" v-if="files.length">mdi-image</v-icon>
            <div v-if="files.length" class="text-center">
              {{ files[0].name }}
            </div>
          </div>
          <div class="text_field d-flex align-center" style="gap: 10px">
            <img
              src="/svgs/profile/overview/mingcute_pic-line.svg"
              alt=""
              width="30"
              @click="fileInp.click()"
            />
            <v-icon
              size="30"
              @click="isRecording ? stopRecording() : startRecording()"
              >mdi-microphone-outline</v-icon
            >
            <input
              type="text"
              placeholder="Write...."
              v-model="message"
              :disabled="loading || files.length"
            />
            <v-btn
              rounded="xl"
              flat
              :loading="loading"
              @click="sendMessage"
              :disabled="!message && !files.length"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </div>
          <v-file-input
            class="d-none"
            v-model="files"
            ref="fileInp"
            accept="image/png, image/jpg, image/jpeg, image/webp"
          ></v-file-input>
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
const isRecording = ref(false);
const mediaRecorder = ref(null);
const audioChunks = ref([]);
const audioUrl = ref(null);
const files = ref([]);
const fileInp = ref(null);

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

// Methods
const startRecording = async () => {
  isRecording.value = true;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder.value = new MediaRecorder(stream);
  mediaRecorder.value.ondataavailable = (event) => {
    audioChunks.value.push(event.data);
  };
  mediaRecorder.value.onstop = async () => {
    const audioBlob = new Blob(audioChunks.value, { type: "audio/wav" });
    audioUrl.value = URL.createObjectURL(audioBlob);
    audioChunks.value = [];

    const audioFile = new File([audioBlob], "recording.wav", {
      type: "audio/wav",
      lastModified: Date.now(),
    });

    const fromData = new FormData();
    fromData.append("chat_id", props.chatDetails.id);
    fromData.append("type", "audio");
    fromData.append("attach", audioFile);

    loading.value = true;
    const res = await chatStore().sendNewMessage(fromData, false);
    if (res) {
      const msgsParent = document.querySelector(".msgs_parent");
      await chatStore().getChatDetails(route.params.id);
      msgsParent.scrollTop = msgsParent.scrollHeight;

      message.value = "";
    }
    loading.value = false;
  };
  mediaRecorder.value.start();
};

const stopRecording = async () => {
  isRecording.value = false;
  mediaRecorder.value.stop();
};

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
  } else {
    const fromData = new FormData();
    fromData.append("chat_id", props.chatDetails.id);
    fromData.append("type", "file");
    fromData.append("attach", files.value[0]);

    const res = await chatStore().sendNewMessage(fromData, false);
    if (res) {
      const msgsParent = document.querySelector(".msgs_parent");
      await chatStore().getChatDetails(route.params.id);
      msgsParent.scrollTop = msgsParent.scrollHeight;
      files.value = [];
    }
  }
  loading.value = false;
};
</script>
