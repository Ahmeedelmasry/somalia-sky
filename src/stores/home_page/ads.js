import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const homeAdStore = defineStore("homeAdStore", {
  state: () => ({
    ads: [],
  }),
  actions: {
    async getAds() {
      await axios
        .get(`${mainStore().apiURL}/public/ads/filter/date`)
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
          this.ads = res.data.data;
          console.log("Homepage Ads", res.data.data);
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
