import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import { authStore } from "@/stores/auth";
import axios from "axios";

export const profileFavStore = defineStore("profileFavStore", {
  state: () => ({
    favourtis: {},
  }),
  actions: {
    async getFavourits() {
      await axios
        .get(`${mainStore().apiURL}/favs`, {
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
          this.favourtis = res.data;
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
    async addFavourit(ad) {
      await axios
        .post(`${mainStore().apiURL}/favs`, ad, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          mainStore().handleErr(
            "success",
            `${
              res.data.message == "Unlike"
                ? "Removed Successfully"
                : "Added Successfully"
            } `,
            `Ad was ${
              res.data.message == "Unlike"
                ? "removed from your"
                : "added to your"
            } favourites successfully`
          );
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
  },
});
