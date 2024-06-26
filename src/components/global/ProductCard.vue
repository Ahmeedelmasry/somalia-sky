<template>
  <div class="product_card px-3 py-5 h-100">
    <v-card elevation="0" class="h-100">
      <div class="card position-relative h-100 d-flex flex-column">
        <div
          class="img_parent"
          @click="$emit('card_clicked', ad)"
          style="cursor: pointer"
        >
          <img
            :src="ad.image.original_url"
            alt=""
            v-if="ad && ad.image.original_url"
            class="w-100"
            style="
              height: 193px;
              object-fit: cover;
              border-top-right-radius: 14px;
              border-top-left-radius: 14px;
            "
          />
          <img
            src="@/assets/home/recommended/Rectangle_121.png"
            alt=""
            v-else
            class="w-100"
            style="height: 193px"
          />
        </div>
        <v-icon
          color="red"
          class="like_icon"
          size="25"
          v-if="
            (showLike && !loggerData.id) ||
            (showLike &&
              loggerData.id &&
              showLike &&
              loggerData.id != ad.user.id)
          "
          @click="adFav"
          >mdi-heart{{
            favourtis.data?.find((el) => el.id == ad.id) ? "" : "-outline"
          }}</v-icon
        >
        <div class="card_body px-3 pt-4">
          <div
            class="category d-flex justify-start align-center"
            style="gap: 12px"
          >
            <img src="@/assets/SVGS/home/card/category.svg" alt="" />
            <span class="cat_label">{{
              ad ? ad.subcategory.category.name : "Cars"
            }}</span>
          </div>
          <span class="ad_desc ps-1 mt-2">{{
            ad
              ? ad.description ||
                `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            itaque`
              : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            itaque`
          }}</span>
        </div>
        <div
          class="btns d-flex px-3 my-5 flex-wrap"
          style="gap: 7px"
          v-if="show_btns"
        >
          <action-btn
            text="Send Message"
            bgColor="#FCFCFC"
            textColor="#013331"
            height="40"
            @clicked="sendMessage"
            v-if="loggerData.id && loggerData.id != ad.user.id"
          >
          </action-btn>
          <action-btn
            text="Send Offer"
            bgColor="#FCFCFC"
            textColor="#013331"
            @clicked="sendMessage"
            height="40"
            v-if="loggerData.id && loggerData.id != ad.user.id"
          >
          </action-btn>
        </div>
        <v-spacer></v-spacer>
        <v-divider class="mt-3"></v-divider>
        <v-divider></v-divider>
        <div
          class="card_body ps-4 pe-3 d-flex justify-space-between flex-wrap py-4"
        >
          <div
            class="location d-flex align-center"
            style="gap: 15px"
            v-if="!profile"
          >
            <img src="@/assets/SVGS/home/card/location.svg" alt="" width="18" />
            <span class="location_label">{{
              `${
                ad && ad.location
                  ? ad.location.split("").slice(0, 17).join("")
                  : "Somalia"
              } ${ad && ad.location && ad.location.length > 17 ? "..." : ""}`
            }}</span>
          </div>
          <div class="price">
            <span>${{ ad ? ad.price : "200.00" }}</span>
          </div>
          <v-icon
            v-if="profile"
            color="grey"
            style="cursor: pointer"
            :id="`profile_ad_edit_${num || ad.id}`"
            >mdi-dots-horizontal</v-icon
          >
          <v-menu
            :activator="`#profile_ad_edit_${num || ad.id}`"
            transition="slide-y-transition"
            offset="10 20"
          >
            <v-list class="px-0" width="200">
              <!-- <v-list-item
                :to="{ name: 'profileFavourites' }"
                value="profileFavourites"
              >
                <v-list-item-title
                  class="d-flex align-center"
                  style="gap: 10px"
                >
                  <v-icon size="18" color="grey">mdi-pencil-outline</v-icon>
                  <span style="font-size: 13px"
                    >Edie Ads Details</span
                  ></v-list-item-title
                >
              </v-list-item> -->
              <v-list-item
                :to="{ name: 'profileMyAds' }"
                value="profileMyAds"
                v-if="$route.name != 'profileMyAds'"
              >
                <v-list-item-title
                  class="d-flex align-center"
                  style="gap: 10px"
                >
                  <v-icon size="18" color="grey">mdi-eye-outline</v-icon>
                  <span style="font-size: 13px"
                    >View Ad</span
                  ></v-list-item-title
                >
              </v-list-item>
              <!-- <v-list-item
                :to="{ name: 'profileFavourites' }"
                value="profileFavourites"
              >
                <v-list-item-title
                  class="d-flex align-center"
                  style="gap: 10px"
                >
                  <v-icon size="18" color="grey"
                    >mdi-check-circle-outline</v-icon
                  >
                  <span style="font-size: 13px"
                    >Mark it Expire</span
                  ></v-list-item-title
                >
              </v-list-item> -->
              <v-list-item @click="profileAdStore().deleteAd(ad.id)">
                <v-list-item-title
                  class="d-flex align-center"
                  style="gap: 10px"
                >
                  <v-icon size="18" color="grey">mdi-delete-outline</v-icon>
                  <span style="font-size: 13px"
                    >Delete Ads</span
                  ></v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ActionBtn from "@/components/global/ActionButton.vue";
import { authStore } from "@/stores/auth";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { profileAdStore } from "@/stores/profile/ads";
import { profileFavStore } from "@/stores/profile/favourits";

const { loggerData } = storeToRefs(authStore());
const { openSignIn } = storeToRefs(mainStore());
const { favourtis } = storeToRefs(profileFavStore());

const props = defineProps(["show_btns", "showLike", "profile", "num", "ad"]);

const emits = defineEmits(["send_message", "add_fav"]);

// Methods
const sendMessage = async () => {
  if (!loggerData.value.id) return (openSignIn.value = true);
  emits("send_message", props.ad);
};

const adFav = async () => {
  if (!loggerData.value.id) return (openSignIn.value = true);
  emits("add_fav", props.ad);
};
</script>
