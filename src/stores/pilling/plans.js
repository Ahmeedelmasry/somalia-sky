import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const billingStore = defineStore("billingStore", {
  state: () => ({
    plans: [],
  }),
  actions: {
    async getPlans() {
      await axios
        .get(`${mainStore().apiURL}/packages`)
        .then((res) => {
          console.log(res.data.data);
          this.plans = res.data.data;
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
