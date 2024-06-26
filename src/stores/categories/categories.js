import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const categoryStore = defineStore("categoryStore", {
  state: () => ({
    categories: [],
  }),
  actions: {
    async getCategories() {
      await axios
        .get(`${mainStore().apiURL}/public/category`)
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
          this.categories = res.data.data;
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
