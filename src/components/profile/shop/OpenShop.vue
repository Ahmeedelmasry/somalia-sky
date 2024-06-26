<template>
  <div class="open_shop">
    <v-dialog v-model="drawer" fullscreen>
      <v-card class="open_shop_card pb-7">
        <div
          class="navbar d-flex align-center justify-center position-relative"
        >
          <img src="/profile/logo.png" alt="" width="200" />
          <v-icon
            class="position-absolute"
            style="right: 20px"
            @click="drawer = false"
            >mdi-close</v-icon
          >
        </div>
        <div class="parent pt-10 px-5 px-md-16">
          <h3 class="title mb-10">Add A Shop</h3>
          <div class="content px-3">
            <v-container fluid class="px-0 py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                  class="pt-8 px-3 px-md-6 order-2 order-md-1"
                >
                  <div class="mb-13">
                    <p class="cont mb-2">
                      Somalia<span style="color: #1a85b8">Sky</span> Shops
                    </p>
                    <!-- <p class="cont">Browse shops listings by category</p> -->
                  </div>
                  <form action="" @submit.prevent class="w-100">
                    <!-- <v-autocomplete
                      variant="outlined"
                      label="Shop Category"
                    ></v-autocomplete> -->
                    <v-text-field
                      class="mb-2"
                      label="Shop Name"
                      variant="outlined"
                      v-model="formData.name"
                      :error="v$.name.$error"
                      :errorMessages="v$.name.$errors[0]?.$message"
                    ></v-text-field>
                    <v-text-field
                      class="mb-2"
                      label="Shop Location"
                      variant="outlined"
                      v-model="formData.location"
                      :error="v$.location.$error"
                      :errorMessages="v$.location.$errors[0]?.$message"
                    ></v-text-field>
                    <v-text-field
                      class="mb-2"
                      label="Shop Number"
                      variant="outlined"
                      v-model="formData.phone"
                      :error="v$.phone.$error"
                      :errorMessages="v$.phone.$errors[0]?.$message"
                    ></v-text-field>
                    <v-autocomplete
                      variant="outlined"
                      label="Social Media"
                      :items="socialMedia"
                      returnObject
                      multiple
                      v-model="formData.selectedSocial"
                      chips
                    ></v-autocomplete>
                    <v-text-field
                      class="mb-2"
                      variant="outlined"
                      v-for="(item, i) in formData.selectedSocial"
                      :key="i"
                      :label="item.placeholder"
                      :error="v$.selectedSocial.$error"
                      v-model="item.url"
                    ></v-text-field>
                    <v-file-input
                      label="Shop Image"
                      variant="outlined"
                      prependIcon=""
                      appendInnerIcon="mdi-camera"
                      v-model="formData.image"
                      accept="image/png, image/jpg, image/jpeg, image/webp"
                      :error="v$.image.$error"
                      :errorMessages="v$.image.$errors[0]?.$message"
                      class="mb-2"
                    ></v-file-input>
                    <v-textarea
                      label="Shop Description"
                      variant="outlined"
                      v-model="formData.description"
                    ></v-textarea>
                    <!-- <GMapMap
                      :center="coordinates"
                      :zoom="zoom"
                      @dragend="updateCoordinates()"
                      map-type-id="terrain"
                      style="height: 500px"
                      class="w-100"
                    >
                    </GMapMap> -->
                    <div class="text-center mt-5">
                      <ActionButton
                        text="Publish"
                        bgColor="#013331"
                        textColor="#fff"
                        :loading="loading"
                        @clicked="submitForm"
                      />
                    </div>
                  </form>

                  <v-divider class="mt-16"></v-divider>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-divider></v-divider>
                  <v-divider class="mb-7"></v-divider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  class="px-4 ps-md-6 py-16 py-md-0 img_parent order-1 order-md-2"
                >
                  <div class="w-100 ps-md-5">
                    <p class="cont">
                      It Takes You 5 Minutes To Add Your Shop At Somalia<span
                        style="color: #1a85b8"
                        >Sky</span
                      >
                    </p>
                    <div class="text-center mt-10">
                      <img src="profile/shop building.png" alt="" width="220" />
                    </div>
                  </div>
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
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import ActionButton from "@/components/global/ActionButton.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers, url } from "@vuelidate/validators";
import { shopStore } from "@/stores/shops/shops";

// Data
const socialMedia = ref([
  {
    title: "Facebook",
    url: "",
    placeholder: "Facebook Url",
  },
  {
    title: "X",
    url: "",
    placeholder: "X Url",
  },
  {
    title: "Instagram",
    url: "",
    placeholder: "Instagram Url",
  },
]);

const loading = ref(false);

const formData = ref({
  name: "",
  location: "",
  phone: "",
  selectedSocial: [],
  image: null,
  description: null,
  lang: "1ef",
  late: "dcsac",
});

const validationRoles = computed(() => {
  return {
    name: { required },
    location: { required },
    phone: { required },
    selectedSocial: {
      $each: helpers.forEach({
        url: {
          required,
          url,
        },
      }),
    },
    image: { required },
  };
});

// Init Validator
const v$ = useVuelidate(validationRoles, formData);

// Props
const props = defineProps({
  openPopup: {
    type: Boolean,
  },
});

// Methods
const submitForm = async () => {
  const res = await v$.value.$validate();
  if (res) {
    const social = [];
    formData.value.selectedSocial.forEach((el) => {
      const obj = {};
      obj[el.title] = el.url;
      social.push(obj);
    });
    const data = {
      ...formData.value,
      social_links: JSON.stringify(social),
      image: formData.value.image[0],
    };

    delete data.selectedSocial;

    loading.value = true;
    const newForm = new FormData();
    for (const val of Object.entries(data)) {
      newForm.append(val[0], val[1]);
    }
    const result = await shopStore().createShop(newForm);
    loading.value = false;
    if (result) {
      drawer.value = false;
    }
  }
};

// Emits
const emits = defineEmits(["close_popup"]);

// Data
const drawer = ref(false);

// Watchers
watch(
  () => drawer.value,
  (newVal) => {
    if (!newVal) {
      setTimeout(() => {
        emits("close_popup");
      }, 200);
    }
  }
);

// Hooks
onMounted(() => {
  drawer.value = props.openPopup;
});
</script>

<style lang="scss">
.global_icon {
  padding: 40px;
  border: 1px solid;
  border-radius: 50%;
}
</style>
