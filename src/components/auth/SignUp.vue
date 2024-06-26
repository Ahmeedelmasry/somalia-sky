<template>
  <div class="auth_modal">
    <v-dialog v-model="drawer" max-width="700">
      <v-card class="card pa-8 auth_card" rounded="lg">
        <v-card-title class="px-0">Sign Up</v-card-title>
        <form action="" @submit.prevent class="px-md-10 pt-7">
          <v-text-field
            variant="outlined"
            label="Full Name"
            v-model="data.name"
            class="mt-3"
            :error-messages="
              v$.name.$errors.length ? v$.name.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-row class="px-3 pb-2">
            <v-col cols="3">
              <v-autocomplete
                variant="outlined"
                label="Country"
                item-title="name"
                item.value="id"
                return-object
                :items="authModule.countries"
                @update:model-value="
                  $event
                    ? ((data.code_phone = `${$event.phonecode}`),
                      (data.state = null),
                      authModule.getStates($event.id))
                    : false
                "
                v-model="data.country"
                class="mt-3"
                :error-messages="
                  v$.country.$errors.length
                    ? v$.country.$errors[0].$message
                    : ''
                "
              >
                <template v-slot:selection="{ item }"
                  ><span style="font-size: 13px"
                    >{{ item.value.code }} (+{{ item.value.phonecode }})</span
                  ></template
                >
              </v-autocomplete>
            </v-col>
            <v-col cols="9">
              <v-text-field
                variant="outlined"
                label="Phone"
                v-model="data.phone"
                class="mt-3"
                :error-messages="
                  v$.phone.$errors.length ? v$.phone.$errors[0].$message : ''
                "
              ></v-text-field>
            </v-col>
          </v-row>
          <v-autocomplete
            variant="outlined"
            label="State"
            item-title="name"
            item.value="id"
            return-object
            :items="authModule.states"
            v-model="data.state"
            class="mt-3"
            :error-messages="
              v$.state.$errors.length ? v$.state.$errors[0].$message : ''
            "
          ></v-autocomplete>
          <v-text-field
            variant="outlined"
            label="Password"
            v-model="data.password"
            type="password"
            class="mt-3"
            :error-messages="
              v$.password.$errors.length ? v$.password.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Confirm Password"
            v-model="data.confirm_password"
            type="password"
            class="mt-3"
            :error-messages="
              v$.confirm_password.$errors.length
                ? v$.confirm_password.$errors[0].$message
                : ''
            "
          ></v-text-field>
          <div class="text-center mt-5">
            <action-button
              text="Sign Up"
              bgColor="#013331"
              @clicked="submitForm"
              textColor="#fff"
              :loading="loading"
              direction="start"
            >
            </action-button>
          </div>
        </form>
        <v-divider class="mt-5"></v-divider>
        <div class="label text-center mt-5">Sign Up Using</div>
        <div
          class="btns d-flex flex-column flex-sm-row justify-center align-center mt-7"
          style="gap: 30px"
        >
          <action-button
            text="Google"
            bgColor="#111111"
            textColor="#fff"
            direction="start"
          >
            <img
              src="@/assets/SVGS/home/google.svg"
              alt=""
              width="23"
              class="me-5"
            />
          </action-button>
          <action-button
            text="Apple"
            bgColor="#111111"
            textColor="#fff"
            direction="start"
          >
            <img
              src="@/assets/SVGS/home/apple.svg"
              alt=""
              width="23"
              class="me-5"
            />
          </action-button>
        </div>
        <div class="no_acc mt-7 text-center">
          Have An Account?
          <strong @click="$emit('sign_in', false), (drawer = false)"
            >Sign In</strong
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import ActionButton from "../global/ActionButton.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, sameAs, numeric } from "@vuelidate/validators";
import { authStore } from "@/stores/auth";

// Init Stores
const authModule = authStore();

const data = ref({
  phone: null,
  name: null,
  password: null,
  confirm_password: null,
  country: null,
  state: null,
  code_phone: null,
});

const loading = ref(false);

// Props
const props = defineProps({
  openPopup: {
    type: Boolean,
  },
});

// Emits
const emits = defineEmits(["close_popup", "sign_in", "verify"]);

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

const validationRoles = computed(() => {
  return {
    phone: { required, minLength: minLength(6), numeric },
    name: { required, minLength: minLength(6) },
    country: { required },
    state: { required },
    password: { required, minLength: minLength(8) },
    confirm_password: { required, sameAs: sameAs(data.value.password) },
  };
});

// Init Validator
const v$ = useVuelidate(validationRoles, data);

// Methods
const submitForm = async () => {
  const res = await v$.value.$validate();
  if (res) {
    const obj = {
      ...data.value,
      country: data.value.country.name,
      state: data.value.state.name,
    };
    if (obj.phone.startsWith(0)) {
      obj.phone = obj.phone.substring(1);
    }
    loading.value = true;
    const result = await authModule.createNewAccount(obj);
    loading.value = false;
    if (result) {
      emits("sign_in", true);
      drawer.value = false;
    }
  }
};

// Hooks
onMounted(() => {
  drawer.value = props.openPopup;
  authModule.getCountries();
});
</script>

<style lang="scss">
.global_icon {
  padding: 40px;
  border: 1px solid;
  border-radius: 50%;
}
</style>
