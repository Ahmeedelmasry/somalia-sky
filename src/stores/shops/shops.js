import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import { authStore } from "@/stores/auth";
import axios from "axios";

export const shopStore = defineStore("shopStore", {
  state: () => ({
    shops: {},
    shopDetails: {},
    profileShops: [],
  }),
  actions: {
    async getShops() {
      await axios
        .get(`${mainStore().apiURL}/public/shops`)
        .then((res) => {
          res.data.data.forEach((shop) => {
            const images = [];
            for (const val of Object.entries(shop.image)) {
              const obj = {};
              for (const val_2 of Object.entries(val[1])) {
                obj[val_2[0]] = val_2[1];
                shop.image[val_2[0]] = val_2[1];
              }
              images.push(obj);
            }
            shop.images = images;

            // Shop Ads Image Handle
            shop.shopAd.forEach((ad) => {
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
          });
          this.shops = res.data;
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
    async getProfileShops() {
      await axios
        .get(`${mainStore().apiURL}/shops`, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          res.data.data.forEach((shop) => {
            const images = [];
            for (const val of Object.entries(shop.image)) {
              const obj = {};
              for (const val_2 of Object.entries(val[1])) {
                obj[val_2[0]] = val_2[1];
                shop.image[val_2[0]] = val_2[1];
              }
              images.push(obj);
            }
            shop.images = images;

            // Shop Ads Image Handle
            shop.shopAd.forEach((ad) => {
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
          });
          this.profileShops = res.data.data;
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
    async getShopDetails(id) {
      await axios
        .get(`${mainStore().apiURL}/public/shops/${id}`)
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

          // Shop Ads Image Handle
          res.data.data.shopAd.forEach((ad) => {
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
          this.shopDetails = res.data.data;
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
    async createShop(data) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/shops`, data, {
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
          if (!err.response) {
            mainStore().handleErr(
              "error",
              `${err.response ? "Incomplete Request" : "Connection Error"}`,
              `${
                err.response
                  ? err.response.data.message
                  : "Something went wrong, please check your internet connection and try again later"
              }`
            );
          }
          result = false;
        });
      return result;
    },
  },
});
