import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Google Maps
import VueGoogleMaps from "@fawmi/vue-google-maps";

// Css
import "@/assets/css/global.scss";
import "@/assets/css/layout.scss";
import "@/assets/css/home.scss";
import "@/assets/css/auth.scss";
import "@/assets/css/profile.scss";
import "@/assets/css/product_details.scss";
import "@/assets/css/plans.scss";
import "@/assets/css/blogs.scss";
import "@/assets/css/shops.scss";

// Pinia config
import { createPinia } from "pinia";

// Emitter Config
import mitt from "mitt";
const Emitter = mitt();

// Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Phone Field
import "maz-ui/styles"; // or import 'maz-ui/css/main.css'

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

// Otp Input
import VOtpInput from "vue3-otp-input";

const vuetify = createVuetify({
  components,
  directives,
});

// Flat Picker Files
import "flatpickr/dist/flatpickr.css";

createApp(App)
  .use(vuetify)
  .use(VueGoogleMaps, {
    load: {
      libraries: "places",
      transpile: ["@fawmi/vue-google-maps"],
    },
  })
  .provide("Emitter", Emitter)
  .use(createPinia())
  .use(router)
  .component("otp-input", VOtpInput)
  .mount("#app");
