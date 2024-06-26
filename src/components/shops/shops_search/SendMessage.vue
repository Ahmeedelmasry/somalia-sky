<template>
  <div class="send_message_modal">
    <v-dialog v-model="drawer" max-width="800">
      <v-card class="card auth_card" rounded="xl" style="overflow: hidden">
        <v-container fluid class="pa-0">
          <v-row class="align-center">
            <v-col cls="12" md="8" class="px-1">
              <v-icon size="26" class="ms-7 mt-7" @click="drawer = false"
                >mdi-close</v-icon
              >
              <v-card-title
                class="ps-10 mt-3 contact_section_title"
                style="white-space: pre-wrap; font-size: 18px"
                >Send A Message To {{ receiver.user.name }}
              </v-card-title>
              <v-card-text class="ps-10 mt-2 contact_section_text">
                if you are interested or have a questions, send a direct message
              </v-card-text>
              <form action="" @submit.prevent class="py-7 pe-5 ps-10">
                <v-textarea
                  variant="outlined"
                  no-resize
                  rows="3"
                  label="Write Your Message"
                  v-model="data.message"
                  :disabled="loading"
                ></v-textarea>
                <div class="text-center">
                  <action-button
                    text="Send Message"
                    bgColor="#013331"
                    textColor="#fff"
                    @clicked="sendMessage"
                    direction="start"
                    :loading="loading"
                  >
                  </action-button>
                </div>
              </form>
            </v-col>
            <v-col
              cols="12"
              md="4"
              class="ps-md-1 mb-5 mb-md-0 contact_info align-md-center justify-md-center pa-6"
            >
              <div class="contact_info_card" color="transparent">
                <div class="content">
                  <div class="title">Contact Information</div>
                  <div class="location d-flex mb-5" style="gap: 10px">
                    <div class="icon">
                      <v-icon color="grey-lighten-1"
                        >mdi-map-marker-outline</v-icon
                      >
                    </div>
                    <div class="cont">
                      {{ receiver.location }}
                    </div>
                  </div>
                  <div class="phone d-flex mb-5" style="gap: 10px">
                    <div class="icon">
                      <v-icon color="grey-lighten-1">mdi-phone-outline</v-icon>
                    </div>
                    <div class="cont">{{ receiver.user.phone }}</div>
                  </div>
                  <div class="email d-flex mb-5" style="gap: 10px">
                    <div class="icon">
                      <v-icon color="grey-lighten-1">mdi-email-outline</v-icon>
                    </div>
                    <div class="cont">bbffy190@gmail.com</div>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch } from "vue";
import ActionButton from "@/components/global/ActionButton.vue";
import { chatStore } from "@/stores/profile/chat";
import { authStore } from "@/stores/auth";
import { storeToRefs } from "pinia";

// Data
const { loggerData } = storeToRefs(authStore());

const data = ref({
  message: "",
});
const loading = ref(false);

// Props
const props = defineProps({
  openPopup: {
    type: Boolean,
  },
  receiver: {
    type: Object,
  },
});

// Emits
const emits = defineEmits(["close_popup", "sign_up"]);

const drawer = ref(false);

// Watchers
watch(
  () => drawer.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emits("close_popup");
      }, 200);
    }
  }
);

// Methods
const sendMessage = async () => {
  loading.value = true;
  if (data.value.message) {
    const chatId = await chatStore().createRoom({
      isPrivate: 1,
      users: [loggerData.value.id, props.receiver.user.id],
    });
    if (chatId) {
      const res = await chatStore().sendNewMessage({
        chat_id: chatId,
        type: "text",
        message: data.value.message,
      });
      if (res) {
        drawer.value = false;
      }
    }
  }
  loading.value = false;
};
// Hooks
onMounted(() => {
  drawer.value = props.openPopup;
});
</script>

<style lang="scss">
.global_icon {
  padding: 40px;
  border: 1px solid;
  border-radius: 50%;
}
.otp-input {
  width: 25px;
  height: 40px;
  padding: 5px;
  margin: 0 8px 0 0;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  background-color: #8787872b;
}
</style>
