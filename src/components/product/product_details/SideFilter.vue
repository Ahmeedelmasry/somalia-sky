<template>
  <div class="side_filters">
    <div class="first_filter mt-8 mt-md-0">
      <div class="price d-flex justify-space-between align-center">
        <span>$ {{ adDetails.price }}</span>
        <v-icon size="17">mdi-heart-outline</v-icon>
      </div>
      <v-divider class="mt-8"></v-divider>
      <v-divider></v-divider>
      <v-divider class="mb-8"></v-divider>
      <div class="phone">
        <div class="parent py-5">
          <v-icon size="18" class="me-2">mdi-phone-outline</v-icon>
          <span class="num">{{ adDetails.user.phone }}</span>
          <!-- <div class="reveal">Click Here To Reveal Phone Number</div> -->
        </div>
      </div>
      <div class="text-center mt-7 send_msg_btn px-3">
        <action-button
          bgColor="#013331eb"
          text="Send Message"
          @clicked="sendMessage"
          textColor="white"
          direction="start"
        >
          <img src="@/assets/SVGS/product/send_message.svg" alt="" />
        </action-button>
      </div>

      <v-divider class="mt-8"></v-divider>
      <v-divider></v-divider>
      <v-divider class="mb-8"></v-divider>

      <div class="avatar_parent px-3 d-flex align-center" style="gap: 10px">
        <v-avatar size="80" style="border: 1px solid">
          <img
            src="@/assets/SVGS/product/info_avatar.png"
            alt=""
            v-if="adDetails.user.image.length"
          />
          <v-icon size="50" v-else>mdi-account-outline</v-icon>
        </v-avatar>
        <div class="cont">
          <span>Add By:</span>
          <div>{{ adDetails.user.name }}</div>
        </div>
      </div>
      <div
        class="email d-flex align-center px-5 mt-10"
        style="gap: 10px"
        v-if="adDetails.user.email"
      >
        <v-icon color="blue-lighten-2">mdi-email-outline</v-icon>
        <span>{{ adDetails.user.email }}</span>
      </div>
      <div class="location d-flex align-center px-5 mt-4" style="gap: 10px">
        <v-icon color="blue-lighten-2">mdi-map-marker-outline</v-icon>
        <span>{{ adDetails.location }}</span>
      </div>

      <v-divider class="mt-12"></v-divider>
      <v-divider></v-divider>
      <v-divider class="mb-8"></v-divider>

      <div class="ad_location px-6">
        <div class="sec_title mb-8">Ad Location:</div>
        <img src="@/assets/SVGS/product/location.png" alt="" class="w-100" />
      </div>
    </div>
    <div class="second_filter mt-10" v-if="adDetails.adDetail">
      <div class="overview px-6">
        <div class="sec_title pb-5">Overview:</div>
        <div
          class="row_parent mt-5 d-flex justify-space-between align-center"
          v-if="adDetails.adDetail.ad_detail.find((el) => el.brand)"
        >
          <div class="row_title">Brand:</div>
          <div class="row_desc">
            {{ adDetails.adDetail.ad_detail.find((el) => el.brand).brand }}
          </div>
        </div>
        <div
          class="row_parent mt-5 d-flex justify-space-between align-center"
          v-if="adDetails.adDetail.ad_detail.find((el) => el.model)"
        >
          <div class="row_title">Model:</div>
          <div class="row_desc">
            {{ adDetails.adDetail.ad_detail.find((el) => el.model).model }}
          </div>
        </div>
        <div
          class="row_parent mt-5 d-flex justify-space-between align-center"
          v-if="adDetails.adDetail.ad_detail.find((el) => el.year)"
        >
          <div class="row_title">Year:</div>
          <div class="row_desc">
            {{ adDetails.adDetail.ad_detail.find((el) => el.year).year }}
          </div>
        </div>
        <!-- <div class="row_parent mt-5 d-flex justify-space-between align-center">
          <div class="row_title">Color:</div>
          <div class="row_desc">Purple</div>
        </div> -->
        <!-- <div class="row_parent mt-5 d-flex justify-space-between align-center">
          <div class="row_title">Authenticity:</div>
          <div class="row_desc">Original</div>
        </div> -->
      </div>
      <!-- 
      <v-divider class="mt-12"></v-divider>
      <v-divider></v-divider>
      <v-divider class="mb-5"></v-divider> -->

      <!-- <div class="report px-6 d-flex align-center">
        <img
          src="@/assets/SVGS/product/abuse.svg"
          alt=""
          class="me-5"
          width="27"
        />
        <span>Report Abuse</span>
      </div>

      <v-divider class="mt-5"></v-divider>
      <v-divider></v-divider>
      <v-divider class="mb-8"></v-divider> -->

      <!-- <div class="social_media px-6">
        <div class="sec_title d-flex align-center">
          <img
            src="@/assets/SVGS/product/share.svg"
            alt=""
            class="me-5"
            width="27"
          />
          <span>Share Ad</span>
        </div>
        <div class="icons mt-10">
          <img
            src="@/assets/SVGS/product/facebook.svg"
            alt=""
            class="me-2"
            width="38"
          />
          <img
            src="@/assets/SVGS/product/whatsapp.svg"
            alt=""
            class="me-2"
            width="38"
          />
          <img
            src="@/assets/SVGS/product/linkedin.svg"
            alt=""
            class="me-2"
            width="38"
          />
          <img
            src="@/assets/SVGS/product/pinterest.svg"
            alt=""
            class="me-2"
            width="38"
          />
          <img
            src="@/assets/SVGS/product/twitter.svg"
            alt=""
            class="me-2"
            width="38"
          />
          <img
            src="@/assets/SVGS/product/sharer.svg"
            alt=""
            class="me-2"
            width="38"
          />
        </div>
      </div> -->
    </div>
    <SendMessage
      :openPopup="openSendMessage"
      @close_popup="(openSendMessage = false), (receiver = null)"
      v-if="openSendMessage"
      :receiver="adDetails"
    />
  </div>
</template>

<script setup>
import ActionButton from "@/components/global/ActionButton.vue";
import { defineProps, onMounted, ref } from "vue";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import SendMessage from "@/components/product/products_search/SendMessage.vue";

// Data
const { loggerData } = storeToRefs(authStore());
const { openSignIn } = storeToRefs(mainStore());
const openSendMessage = ref(false);

const props = defineProps(["adDetails"]);

// Methods
const sendMessage = async () => {
  if (!loggerData.value.id) return (openSignIn.value = true);
  openSendMessage.value = true;
};
</script>
