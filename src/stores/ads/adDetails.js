import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const adDetailStore = defineStore("adDetailStore", {
  state: () => ({
    adDetails: {},
    relatedAds: [],
  }),
  actions: {
    async getAdDetails(id) {
      await axios
        .get(`${mainStore().apiURL}/public/ads/${id}`)
        .then((res) => {
          const images = [];
          for (const val of Object.entries(res.data.data.image)) {
            const obj = {};
            for (const val_2 of Object.entries(val[1])) {
              obj[val_2[0]] = val_2[1];
              res.data.data.image[val_2[0]] = val_2[1];
            }
            images.push(obj);
          }
          res.data.data.images = images;
          console.log(res.data.data, "Ad Details");
          this.adDetails = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          if (!err.response) {
            mainStore().handleErr(
              "error",
              `Connection Error`,
              "Something went wrong, please check your internet connection and try again later"
            );
          }
        });
    },

    async getRelatedAds(id, currentId) {
      await axios
        .get(
          `${mainStore().apiURL}/public/ads/sort/filteration?category_id=${id}`
        )
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
          this.relatedAds = res.data.data.filter((el) => el.id != currentId);
        })
        .catch((err) => {
          console.log(err);
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
