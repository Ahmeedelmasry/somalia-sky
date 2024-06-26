import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const sliderStore = defineStore("sliderStore", {
  state: () => ({
    sliders: [],
  }),
  actions: {
    async getSliders() {
      await axios
        .get(`${mainStore().apiURL}/public/slider`)
        .then((res) => {
          res.data.data.forEach((slider) => {
            for (const val of Object.entries(slider.image)) {
              for (const val_2 of Object.entries(val[1])) {
                slider.image[val_2[0]] = val_2[1];
              }
            }
          });
          this.sliders = res.data.data;
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
