<template>
  <div class="auth_modal">
    <v-dialog v-model="drawer" max-width="700">
      <v-card class="card px-8 pt-5 auth_card pb-16" rounded="lg">
        <v-icon size="26" @click="drawer = false">mdi-close</v-icon>
        <v-container fluid class="">
          <v-row class="align-center">
            <v-col cls="12" md="6" class="px-1 order-2 order-md-1">
              <v-card-title
                class="px-0 mt-10"
                style="white-space: pre-wrap; font-size: 18px"
                >Enter Verification Code</v-card-title
              >
              <v-card-text class="px-0 mt-2">
                We have Sent a Verification Code to (+252) 88 77 990
              </v-card-text>
              <form action="" @submit.prevent class="pt-7">
                <otp-input
                  ref="otpInput"
                  input-classes="otp-input"
                  separator=""
                  :num-inputs="6"
                  :should-auto-focus="true"
                  :is-input-num="true"
                  :value="test"
                />
                <div class="mb-7 mt-3">
                  <div class="resend mb-2 mt-10">Send the code again</div>
                  <div
                    class="resend"
                    @click="$emit('sign_up'), (drawer = false)"
                  >
                    Change phone number
                  </div>
                </div>
                <div>
                  <action-button
                    text="Verify"
                    bgColor="#013331"
                    textColor="#fff"
                    direction="start"
                  >
                  </action-button>
                </div>
              </form>
            </v-col>
            <v-col
              cols="12"
              md="6"
              class="ps-1 mb-5 mb-md-0 order-1 order-md-2"
            >
              <img src="@/assets/home/auth/verify.png" class="w-100" alt="" />
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch } from "vue";
import ActionButton from "../global/ActionButton.vue";

// Props
const props = defineProps({
  openPopup: {
    type: Boolean,
  },
});

// Emits
const emits = defineEmits(["close_popup", "sign_up"]);

const drawer = ref(false);
const test = ref("");

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
