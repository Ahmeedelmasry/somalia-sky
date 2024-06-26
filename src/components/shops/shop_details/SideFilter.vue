<template>
  <div class="side_filters pb-5">
    <div class="first_filter mt-8 mt-md-0">
      <div class="details_card pa-5">
        <div class="sec_title">Contacts</div>
        <div class="mt-7 btns d-flex align-center" style="gap: 14px">
          <action-button
            bgColor="#013331eb"
            text="Send Message"
            @clicked="sendMessage"
            textColor="white"
            direction="start"
          >
            <img
              src="@/assets/SVGS/product/send_message.svg"
              alt=""
              width="20"
              class="me-2"
            />
          </action-button>
          <action-button
            bgColor="#013331eb"
            :text="shopDetails.phone"
            textColor="white"
            direction="start"
          >
            <img src="/shop_details/phone.svg" alt="" width="20" class="me-2" />
          </action-button>
        </div>
        <div class="social mt-7 d-flex align-center" style="gap: 10px">
          <img src="@/assets/SVGS/product/whatsapp.svg" alt="" width="35" />
          <img src="@/assets/SVGS/product/facebook.svg" alt="" width="35" />
          <img src="@/assets/SVGS/product/twitter.svg" alt="" width="35" />
          <img src="@/assets/SVGS/product/pinterest.svg" alt="" width="35" />
        </div>
      </div>
    </div>
    <div class="second_filter mt-10">
      <div class="details_card px-lg-14 px-8 px-lg-16">
        <div class="img_container text-start">
          <img src="/shop_details/open_shop.svg" alt="" class="w-100" />
        </div>
        <div class="hint ps-4">Wants To Increase Your Sells ?</div>
        <div class="img_container text-start ps-4">
          <img
            src="/shop_details/somalia_join.png"
            alt=""
            style="width: 180px"
          />
        </div>
        <div class="btn pb-7 ps-4">
          <action-button
            class="mt-10"
            bgColor="#013331eb"
            text="Open Shop Now"
            textColor="white"
            @clicked="loggerData.id ? (openShop = true) : (openSignIn = true)"
          >
          </action-button>
        </div>
      </div>
    </div>
    <SendMessage
      :openPopup="openSendMessage"
      @close_popup="(openSendMessage = false), (receiver = null)"
      v-if="openSendMessage"
      :receiver="shopDetails"
    />

    <OpenShop
      :openPopup="openShop"
      v-if="openShop"
      @close_popup="openShop = false"
    />
  </div>
</template>

<script setup>
import ActionButton from "@/components/global/ActionButton.vue";
import { defineProps, ref } from "vue";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { authStore } from "@/stores/auth";
import SendMessage from "@/components/product/products_search/SendMessage.vue";
import OpenShop from "@/components/profile/shop/OpenShop.vue";

// Data
const { loggerData } = storeToRefs(authStore());
const { openSignIn } = storeToRefs(mainStore());
const openSendMessage = ref(false);
const openShop = ref(false);

// Methods
const sendMessage = async () => {
  if (!loggerData.value.id) return (openSignIn.value = true);
  openSendMessage.value = true;
};

defineProps(["shopDetails"]);
</script>
