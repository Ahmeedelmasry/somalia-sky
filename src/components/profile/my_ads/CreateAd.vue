<template>
  <div class="open_shop">
    <v-dialog v-model="createAd" fullscreen>
      <v-card class="open_shop_card pb-7">
        <div
          class="navbar d-flex align-center justify-center position-relative"
        >
          <img src="/profile/logo.png" alt="" width="200" />
          <v-icon
            class="position-absolute"
            style="right: 20px"
            @click="createAd = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="parent pt-10 px-5 px-md-16">
          <h3 class="title mb-10">What Do You Want To Sell Or Advertise?</h3>
          <div
            class="content"
            style="background-color: #e5e4e4; box-shadow: unset !important"
          >
            <v-container
              fluid
              class="px-0 py-0"
              style="background-color: #e5e4e4"
            >
              <v-row>
                <v-col cols="12" md="8" class="px-3 order-2 order-md-1">
                  <v-card class="ad_card_shadow pa-5">
                    <v-window v-model="step">
                      <v-window-item>
                        <div class="mb-7">
                          <p class="cont" style="color: #013331">
                            Select The Section That Best Suite Your Listing
                          </p>
                        </div>
                        <form action="" @submit.prevent class="w-100">
                          <v-autocomplete
                            variant="outlined"
                            label="Ad Category"
                            :items="categories"
                            item-title="name"
                            item-value="id"
                            v-model="formData.subcategory_id"
                            :error="v$.subcategory_id.$error"
                            :errorMessages="
                              v$.subcategory_id.$errors[0]?.$message
                            "
                            clearable
                            class="mb-2"
                          ></v-autocomplete>
                          <v-autocomplete
                            variant="outlined"
                            label="Ad Shop"
                            :items="profileShops"
                            item-title="name"
                            item-value="id"
                            v-model="formData.shop_id"
                            clearable
                            class="mb-2"
                          ></v-autocomplete>
                          <v-text-field
                            class="mb-2"
                            label="Ad Name"
                            variant="outlined"
                            v-model="formData.name"
                            :error="v$.name.$error"
                            :errorMessages="v$.name.$errors[0]?.$message"
                          ></v-text-field>
                          <v-text-field
                            class="mb-2"
                            label="Ad Location"
                            variant="outlined"
                            v-model="formData.location"
                            :error="v$.location.$error"
                            :errorMessages="v$.location.$errors[0]?.$message"
                          ></v-text-field>
                          <v-text-field
                            class="mb-2"
                            label="Ad Price"
                            variant="outlined"
                            v-model="formData.price"
                            :error="v$.price.$error"
                            :errorMessages="v$.price.$errors[0]?.$message"
                          ></v-text-field>
                          <v-autocomplete
                            variant="outlined"
                            label="Ad Details"
                            :items="socialMedia"
                            returnObject
                            multiple
                            v-model="formData.ad_detail"
                            chips
                            :error="v$.ad_detail.$error"
                            :errorMessages="v$.ad_detail.$errors[0]?.$message"
                          ></v-autocomplete>
                          <v-text-field
                            class="mb-2"
                            variant="outlined"
                            v-for="(item, i) in formData.ad_detail"
                            :key="i"
                            :label="item.placeholder"
                            :error="v$.ad_detail.$error"
                            v-model="item.url"
                          >
                          </v-text-field>
                          <v-textarea
                            label="Ad Description"
                            v-model="formData.description"
                            variant="outlined"
                            :error="v$.description.$error"
                            :errorMessages="v$.description.$errors[0]?.$message"
                          ></v-textarea>
                          <div class="text-center mt-5">
                            <ActionButton
                              text="Next"
                              bgColor="#013331"
                              textColor="#fff"
                              @clicked="submitFirstForm"
                            />
                          </div>
                        </form>
                      </v-window-item>
                      <v-window-item>
                        <div class="mb-7">
                          <p class="cont" style="color: #013331">
                            Ad pictures (You can add up to 15 pictures)
                          </p>
                        </div>
                        <form action="" @submit.prevent class="w-100">
                          <div class="text-center mt-5">
                            <v-file-input
                              label="Ad Pictures"
                              multiple
                              chips
                              variant="outlined"
                              prependIcon=""
                              appendInnerIcon="mdi-camera"
                              v-model="formDataTwo.images"
                              accept="image/png, image/jpg, image/jpeg, image/webp"
                              class="mb-2 text-start"
                              :error="v_2$.images.$error"
                              :errorMessages="v_2$.images.$errors[0]?.$message"
                            ></v-file-input>
                            <div
                              class="d-flex ga-2 justify-center align-center"
                            >
                              <ActionButton
                                text="Back"
                                bgColor="indianred"
                                textColor="#fff"
                                @clicked="step = 0"
                                class="me-2"
                              />
                              <ActionButton
                                text="Publish"
                                bgColor="#013331"
                                textColor="#fff"
                                :loading="loading"
                                @clicked="submitForm"
                              />
                            </div>
                          </div>
                        </form>
                      </v-window-item>
                    </v-window>
                  </v-card>
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                  class="px-3 py-16 py-md-0 order-1 order-md-2"
                >
                  <v-card class="pa-5 ad_card_shadow">
                    <div class="w-100">
                      <v-card-title
                        style="color: #013331"
                        class="pa-0 font-weight-bold"
                        >Do You Need Help?</v-card-title
                      >
                      <v-card-text class="px-0">Contact Us Now</v-card-text>
                      <div>
                        <v-btn
                          variant="outlined"
                          color="#013331"
                          class="me-2 w-100"
                        >
                          <v-icon class="pe-2" color="#013331"
                            >mdi-email-outline</v-icon
                          >
                          E-Mail</v-btn
                        >
                        <v-btn
                          variant="outlined"
                          color="#013331"
                          class="w-100 mt-4"
                        >
                          <v-icon class="pe-2" color="#013331"
                            >mdi-phone-outline</v-icon
                          >
                          (+252) 87 980 0077</v-btn
                        >
                      </div>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ActionButton from "@/components/global/ActionButton.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
import { shopStore } from "@/stores/shops/shops";
import { profileAdStore } from "@/stores/profile/ads";
import { storeToRefs } from "pinia";
import { categoryStore } from "@/stores/categories/categories";

// Init Stores
const adsModule = profileAdStore();
const shopModule = shopStore();
const categoryModule = categoryStore();

// Data
const { createAd } = storeToRefs(adsModule);
const { categories } = storeToRefs(categoryModule);
const { profileShops } = storeToRefs(shopModule);

const socialMedia = ref([
  {
    title: "Model",
    url: "",
    placeholder: "Ad Model",
  },
  {
    title: "Brand",
    url: "",
    placeholder: "Ad Brand",
  },
  {
    title: "Year",
    url: "",
    placeholder: "Ad Year",
  },
]);

const loading = ref(false);
const step = ref(0);

const formData = ref({
  name: "",
  location: "",
  price: "",
  ad_detail: [],
  subcategory_id: null,
  lang: "1ef",
  late: "dcsac",
  description: null,
  shop_id: null,
});

const formDataTwo = ref({
  images: [],
});

const validationRoles = computed(() => {
  return {
    subcategory_id: { required },
    name: { required },
    location: { required },
    description: { required },
    price: { required, numeric },
    ad_detail: {
      required,
      $each: helpers.forEach({
        url: {
          required,
        },
      }),
    },
  };
});
const validationRolesTwo = computed(() => {
  return {
    images: { required },
  };
});

// Init Validator
const v$ = useVuelidate(validationRoles, formData);
const v_2$ = useVuelidate(validationRolesTwo, formDataTwo);

const submitFirstForm = async () => {
  const res = await v$.value.$validate();
  if (res) {
    step.value = 1;
  }
};

// Methods
const submitForm = async () => {
  const res = await v_2$.value.$validate();
  if (res) {
    const details = [];
    formData.value.ad_detail.forEach((el) => {
      const obj = {};
      obj[el.title.toLowerCase()] = el.url;
      details.push(obj);
    });
    const data = {
      ...formData.value,
      ad_detail: details.length ? JSON.stringify(details) : null,
      images: formDataTwo.value.images,
    };

    loading.value = true;
    const newForm = new FormData();

    for (const val of Object.entries(data)) {
      if (val[0] != "images") {
        if (val[1]) {
          newForm.append(val[0], val[1]);
        }
      }
    }

    data.images.forEach((el, i) => {
      newForm.append(`image[${i}]`, el);
    });

    const result = await adsModule.createProfileAd(newForm);
    loading.value = false;
    if (result) {
      adsModule.getAds();
      createAd.value = false;
    }
  }
};
</script>

<style lang="scss">
.global_icon {
  padding: 40px;
  border: 1px solid;
  border-radius: 50%;
}
</style>
