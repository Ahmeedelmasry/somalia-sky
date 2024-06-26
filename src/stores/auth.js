import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import axios from "axios";

export const authStore = defineStore("authStore", {
  state: () => ({
    loggerData: {},
    token: null,
    signupErrs: {},
    loggerState: 0,
    drawer: false,
    countries: [],
    states: [],
  }),
  actions: {
    createCookie(time, token) {
      let expires = "; max-age=" + time + `;path=/`;
      document.cookie = "somaliaLg" + "=" + token + expires;
    },
    async createNewAccount(data) {
      this.token = null;
      let result;
      const formData = new FormData();
      for (const val of Object.entries(data)) {
        formData.append(val[0], val[1]);
      }
      await axios
        .post(`${mainStore().apiURL}/register`, formData, {
          headers: {
            "Content-Type": "form-data",
          },
        })
        .then(async (res) => {
          if (res.data.status == 200) {
            result = true;
          } else {
            mainStore().handleErr("error", `Register Error`, res.data.message);
          }
        })
        .catch((err) => {
          this.signupErrs = err.response.data.data;
          result = false;
          if (!err.response) {
            mainStore().handleErr(
              "error",
              `Connection Error`,
              "Something went wrong, please check your internet connection and try again later"
            );
          }
        });
      return result;
    },
    async doLogin(data) {
      this.token = null;
      let result;
      const formData = new FormData();
      formData.append("phone", data.phone);
      formData.append("password", data.password);
      await axios
        .post(`${mainStore().apiURL}/login`, formData)
        .then(async (res) => {
          this.token = res.data.data.token;
          // Set Cookie
          this.createCookie(60 * 60 * 24, res.data.data.token);
          result = true;
          await this.getUserData();
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong, please check your internet connection and try again later"
          );
          result = false;
        });
      return result;
    },
    async checkAuth() {
      const decodedCookie = decodeURIComponent(document.cookie);
      if (decodedCookie && decodedCookie.split("=")[0] == "somaliaLg") {
        this.token = decodedCookie.split("=")[1];
        if (this.loggerData.name) {
          this.loggerState = 1;
        } else {
          this.loggerState = 2;
        }
      } else {
        this.loggerState = 0;
      }
    },
    async getUserData() {
      let result;
      await axios
        .get(`${mainStore().apiURL}/account`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((res) => {
          this.loggerData = res.data.data;
          result = true;
          console.log(this.loggerData, "Logger Data");
        })
        .catch((err) => {
          if (err.response.status == 401) {
            this.createCookie(1, "a");
            this.token = null;
            this.loggerData = {};
          }
        });
      return result;
    },
    async updateProfileInfo(data) {
      let result;
      await axios
        .put(`${mainStore().apiURL}/update`, data, {
          headers: {
            Authorization: `Bearer ${this.loggerData.token}`,
          },
        })
        .then(() => {
          mainStore().handleErr(
            "success",
            `Updated Successfully`,
            "Your profile information has been updated successfully"
          );
          this.getUserData();
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong, please check your internet connection and try again later"
          );
          result = false;
        });
      return result;
    },
    async updateProfilePassword(data) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/change-password`, data, {
          headers: {
            Authorization: `Bearer ${this.loggerData.token}`,
          },
        })
        .then(() => {
          mainStore().handleErr(
            "success",
            `Updated Successfully`,
            "Your password has been updated successfully"
          );
          result = true;
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong, please check your internet connection and try again later"
          );
          result = false;
        });
      return result;
    },
    logOut() {
      // Set Cookie
      let expires = "";
      expires = "; max-age=" + 0.0 + `;path=/`;
      document.cookie = "somaliaLg" + "=" + "test" + expires;
      setTimeout(() => {
        location.reload();
      }, 200);
    },
    async deleteAccount() {
      let result;
      const token = decodeURIComponent(document.cookie).split("=")[1];
      await axios
        .get(`${mainStore().apiURL}/delete-account`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          this.logOut();
          result = true;
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong, please check your internet connection and try again later"
          );
          result = false;
        });
      return result;
    },
    async getCountries() {
      await axios
        .get(`${mainStore().apiURL}/countries`)
        .then((res) => {
          this.countries = res.data;
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong, please check your internet connection and try again later"
          );
        });
    },
    async getStates(countryId) {
      this.states = [];
      await axios
        .get(`${mainStore().apiURL}/states/${countryId}`)
        .then((res) => {
          this.states = res.data;
        })
        .catch((err) => {
          mainStore().handleErr(
            "error",
            `${
              err.response && err.response.data
                ? "Incomplete Request"
                : "Connection Error"
            }`,
            err.response && err.response.data
              ? err.response.data.message
              : "Something went wrong, please check your internet connection and try again later"
          );
        });
    },
  },
});
