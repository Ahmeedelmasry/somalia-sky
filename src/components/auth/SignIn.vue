<template>
  <div class="auth_modal">
    <v-dialog v-model="drawer" max-width="700">
      <v-card class="card pa-8 auth_card" rounded="lg">
        <v-card-title class="px-0">Sign In</v-card-title>
        <form action="" @submit.prevent class="px-md-10 pt-7">
          <v-text-field
            variant="outlined"
            label="Phone Number"
            v-model="data.phone"
            :error-messages="
              v$.phone.$errors.length ? v$.phone.$errors[0].$message : ''
            "
          ></v-text-field>
          <v-text-field
            variant="outlined"
            label="Password"
            v-model="data.password"
            type="password"
            class="mt-4"
            :error-messages="
              v$.password.$errors.length ? v$.password.$errors[0].$message : ''
            "
          ></v-text-field>
          <div class="text-center">
            <action-button
              text="Sign In"
              bgColor="#013331"
              textColor="#fff"
              direction="start"
              @clicked="submitForm"
              :loading="loading"
            >
            </action-button>
          </div>
        </form>
        <v-divider class="mt-5"></v-divider>
        <div class="label text-center mt-5">Sign In Using</div>
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
          Don't Have An Account?
          <strong @click="$emit('sign_up'), (drawer = false)">Sign Up</strong>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watch, computed } from "vue";
import ActionButton from "../global/ActionButton.vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { authStore } from "@/stores/auth";

// Init Stores
const authModule = authStore();

// Props
const props = defineProps({
  openPopup: {
    type: Boolean,
  },
});

// Emits
const emits = defineEmits(["close_popup", "sign_up", "verify"]);

// Data
const drawer = ref(false);

const data = ref({
  phone: "+201211297338",
  password: "12345678",
});

const loading = ref(false);

const validationRoles = computed(() => {
  return {
    phone: { required, minLength: minLength(6) },
    password: { required, minLength: minLength(6) },
  };
});

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

// Init Validator
const v$ = useVuelidate(validationRoles, data);

// Methods
const submitForm = async () => {
  const res = await v$.value.$validate();
  if (res) {
    loading.value = true;
    const result = await authModule.doLogin(data.value);
    loading.value = false;
    if (result) {
      drawer.value = false;
      location.reload();
    }
  }
};

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
