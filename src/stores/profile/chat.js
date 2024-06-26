import { defineStore } from "pinia";
import { mainStore } from "@/stores/main.js";
import { authStore } from "@/stores/auth";
import axios from "axios";
import PusherJs from "pusher-js";

export const chatStore = defineStore("chatStore", {
  state: () => ({
    rooms: {},
    pusher: null,
    channel: null,
    chatDetails: null,
  }),
  actions: {
    async createRoom(data) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/chat/create`, data, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          result = res.data.chat.id;
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
      return result;
    },
    async sendNewMessage(data, showSuccess = true) {
      let result;
      await axios
        .post(`${mainStore().apiURL}/chat/send`, data, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then(() => {
          result = true;
          if (showSuccess) {
            mainStore().handleErr(
              "success",
              `Message Sent Success`,
              "Your message has been sent successfully"
            );
          }
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
      return result;
    },
    async getRooms() {
      await axios
        .get(`${mainStore().apiURL}/chats`, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          this.rooms = res.data;
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    async getChatDetails(id) {
      await axios
        .get(`${mainStore().apiURL}/chat/${id}`, {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        })
        .then((res) => {
          this.chatDetails = res.data.chat;
          console.log(res.data.chat, "chatDetails");
        })
        .catch((err) => console.log(err));
    },
    async connectPusher() {
      this.pusher = new PusherJs("8708e4c81a47b8e95072", {
        cluster: "eu",
        app_id: "1757574",
        key: "8708e4c81a47b8e95072",
        secret: "2042bc511d9d51689d25",
        encrypted: true,
        authEndpoint: `${mainStore().apiURL}/pusher/auth`,
        auth: {
          headers: {
            Authorization: `Bearer ${authStore().token}`,
          },
        },
      });

      //   Connect Pusher
      this.pusher.connection.bind("connected", async () => {
        this.channel = this.pusher.subscribe(`private-chat.4`);

        // Receive Messages
        // this.pusher.bind("ChatMessageSent", () => {
        //   console.log("message sent");
        // });
      });
    },
  },
});
