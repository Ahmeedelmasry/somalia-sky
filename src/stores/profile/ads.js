import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import { authStore } from "@/stores/auth";
import axios from "axios";

export const profileAdStore = defineStore("profileAdStore", {
  state: () => ({
    ads: {},
    createAd: false,
  }),
  actions: {
    async getAds() {
      await axios
        .get(`${mainStore().apiURL}/myads`, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          res.data.data.forEach((ad) => {
            const images = [];
            for (const val of Object.entries(ad.image)) {
              const obj = {};
              for (const val_2 of Object.entries(val[1])) {
                obj[val_2[0]] = val_2[1];
                ad.image[val_2[0]] = val_2[1];
              }
              images.push(obj);
            }
            ad.images = images;
          });
          this.ads = res.data;
        })
        .catch((err) => {
          if (!err.response) {
            mainStore().handleErr(
              "error",
              `Connection Error`,
              "Something went wrong, please check your internet connection and try again later"
            );
          }
        });
    },

    async createProfileAd(data) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/ads`, data, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          mainStore().handleErr(
            "success",
            "Added Successfully",
            res.data.message
          );
          result = true;
        })
        .catch((err) => {
          console.log(err);
          mainStore().handleErr(
            "error",
            `${err.response ? "Incomplete Request" : "Connection Error"}`,
            `${
              err.response
                ? err.response.data.message
                : "Something went wrong, please check your internet connection and try again later"
            }`
          );
          result = false;
        });
      return result;
    },
    async deleteAd(id) {
      let result;
      await axios
        .delete(`${mainStore().apiURL}/ads/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          mainStore().handleErr(
            "success",
            "Added Successfully",
            res.data.message
          );
          result = true;
          this.getAds();
        })
        .catch((err) => {
          console.log(err);
          mainStore().handleErr(
            "error",
            `${err.response ? "Incomplete Request" : "Connection Error"}`,
            `${
              err.response
                ? err.response.data.message
                : "Something went wrong, please check your internet connection and try again later"
            }`
          );
          result = false;
        });
      return result;
    },
  },
});
