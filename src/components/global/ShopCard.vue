<template>
  <div class="parent px-3 px-md-0 pb-5">
    <div class="shop_card px-3 py-5 h-100">
      <v-card elevation="0" class="h-100">
        <v-row class="align-center pb-5">
          <v-col cols="12" md="4" class="ps-0 ps-md-3 mb-7 mb-md-0">
            <v-card elevation="0" class="pa-3 pb-0">
              <img
                :src="shop.images[0].original_url"
                alt=""
                class="w-100"
                style="
                  height: 300px;
                  object-fit: cover;
                  border-radius: 14px !important;
                "
              />
              <div class="shop_name text-center">{{ shop.name }}</div>
            </v-card>
          </v-col>
          <v-col cols="12" md="8" class="px-8 pb-5">
            <div class="d-flex justify-space-between align-center pb-10">
              <div class="title pt-2">{{ shop.name }} Shop Ads</div>
              <div class="view_all">
                <router-link
                  :to="{ name: 'shopDetails', params: { id: shop.id } }"
                  class="d-flex align-center"
                  ><span>View All</span>
                  <img
                    src="/svgs/profile/overview/arrow_right.svg"
                    alt=""
                    width="18"
                    class="ms-4"
                /></router-link>
              </div>
            </div>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                lg="4"
                class="pa-3"
                v-for="item in shop.shopAd.slice(0, 3)"
                :key="item.id"
              >
                <div class="card h-100 d-flex flex-column">
                  <div
                    class="img_parent"
                    @click="$emit('ad_clicked', item)"
                    style="cursor: pointer"
                  >
                    <img
                      :src="item.images[0].original_url"
                      alt=""
                      v-if="item.images && item.images.length"
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
                  <div class="card_body px-3">
                    <span class="ad_desc ps-1 mt-2">{{
                      item
                        ? item.description ||
                          `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              itaque`
                        : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              itaque`
                    }}</span>
                  </div>
                  <div
                    class="btns d-flex px-3 my-5 flex-wrap"
                    style="gap: 7px"
                    v-if="
                      show_btns &&
                      loggerData.id &&
                      loggerData.id != shop.user.id
                    "
                  >
                    <action-btn
                      text="Send Message"
                      bgColor="#FCFCFC"
                      textColor="#013331"
                      height="40"
                      @clicked="sendMessage"
                      v-if="loggerData.id && loggerData.id != shop.user.id"
                    >
                    </action-btn>
                    <action-btn
                      text="Send Offer"
                      bgColor="#FCFCFC"
                      textColor="#013331"
                      @clicked="sendMessage"
                      height="40"
                      v-if="loggerData.id && loggerData.id != shop.user.id"
                    >
                    </action-btn>
                  </div>
                  <v-spacer
                    v-if="loggerData.id && loggerData.id != shop.user.id"
                  ></v-spacer>

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
                      <img
                        src="@/assets/SVGS/home/card/location.svg"
                        alt=""
                        width="18"
                      />
                      <span class="location_label">{{
                        `${
                          item && item.location
                            ? item.location.split("").slice(0, 10).join("")
                            : "Somalia"
                        } ${
                          item && item.location && item.location.length > 10
                            ? "..."
                            : ""
                        }`
                      }}</span>
                    </div>
                    <div class="price">
                      <span>${{ item ? item.price : "200.00" }}</span>
                    </div>
                    <v-icon
                      v-if="profile"
                      color="grey"
                      style="cursor: pointer"
                      :id="`profile_ad_edit_${num || shop.id}`"
                      >mdi-dots-horizontal</v-icon
                    >
                    <v-menu
                      :activator="`#profile_ad_edit_${num || shop.id}`"
                      transition="slide-y-transition"
                      offset="10 20"
                    >
                      <v-list class="px-0" width="200">
                        <v-list-item
                          :to="{ name: 'profileFavourites' }"
                          value="profileFavourites"
                        >
                          <v-list-item-title
                            class="d-flex align-center"
                            style="gap: 10px"
                          >
                            <v-icon size="18" color="grey"
                              >mdi-pencil-outline</v-icon
                            >
                            <span style="font-size: 13px"
                              >Edie Ads Details</span
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item
                          :to="{ name: 'profileMyAds' }"
                          value="profileMyAds"
                          v-if="$route.name != 'profileMyAds'"
                        >
                          <v-list-item-title
                            class="d-flex align-center"
                            style="gap: 10px"
                          >
                            <v-icon size="18" color="grey"
                              >mdi-eye-outline</v-icon
                            >
                            <span style="font-size: 13px"
                              >View Ads</span
                            ></v-list-item-title
                          >
                        </v-list-item>
                        <v-list-item value="profileFavourites">
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
                        </v-list-item>
                        <v-list-item value="profileFavourites">
                          <v-list-item-title
                            class="d-flex align-center"
                            style="gap: 10px"
                          >
                            <v-icon size="18" color="grey"
                              >mdi-delete-outline</v-icon
                            >
                            <span style="font-size: 13px"
                              >Delete Ads</span
                            ></v-list-item-title
                          >
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import ActionBtn from "@/components/global/ActionButton.vue";
import { authStore } from "@/stores/auth";
import { mainStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const { loggerData } = storeToRefs(authStore());
const { openSignIn } = storeToRefs(mainStore());

const props = defineProps([
  "show_btns",
  "showLike",
  "profile",
  "num",
  "ad",
  "shop",
]);

const emits = defineEmits(["send_message", "add_fav"]);

// Methods
const sendMessage = async () => {
  if (!loggerData.value.id) return (openSignIn.value = true);
  emits("send_message", props.ad);
};

// const adFav = async () => {
//   if (!loggerData.value.id) return (openSignIn.value = true);
//   emits("add_fav", props.ad);
// };
</script>
