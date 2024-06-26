import { defineStore } from "pinia";

export const mainStore = defineStore("mainStore", {
  state: () => ({
    apiURL: "https://somaliasky.com/api",
    globalAlertType: "",
    globalAlertTitle: "",
    globalAlertText: "",
    btn_text: "Close",
    globalAlert: false,
    drawer: false,
    openSignIn: false,
  }),
  actions: {
    handleErr(type, title, text, btntxt) {
      this.globalAlertType = type;
      this.globalAlertTitle = title;
      this.globalAlertText = text;
      this.btn_text = btntxt || "Close";
      this.globalAlert = true;
    },
  },
});
