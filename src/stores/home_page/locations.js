import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const homeLocationStore = defineStore("homeLocationStore", {
  state: () => ({
    locations: [],
  }),
  actions: {
    async getLocations() {
      await axios
        .get(`${mainStore().apiURL}/public/poplocations`)
        .then((res) => {
          if (res.data.data.image && res.data.data.image.length) {
            res.data.data.forEach((ad) => {
              for (const val of Object.entries(ad.image)) {
                for (const val_2 of Object.entries(val[1])) {
                  ad.image[val_2[0]] = val_2[1];
                }
              }
            });
          }
          this.locations = res.data.data;
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
