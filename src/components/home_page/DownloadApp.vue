<template>
  <div class="download_app">
    <v-container class="px-md-16 px-5 pb-0" fluid style="margin-top: 50px">
      <v-row class="align-center">
        <v-col cols="12" md="6">
          <div class="img_parent ps-4 text-center text-md-end">
            <img
              src="@/assets/home/download_app/download_app.png"
              alt=""
              style="object-fit: contain; max-width: 100%"
            />
          </div>
        </v-col>
        <v-col
          cols="12"
          md="6"
          class="ps-md-5 text-center text-md-start mt-7 mt-md-0"
        >
          <v-card elevation="0" class="w-100 pb-9 pb-md-0">
            <div class="title mb-5">Download Our Mobile App</div>
            <div class="desc mb-7">
              Lorem ipsum dolor sit amet consectetur. Aenean blandit volutpat
              sit parturient posuere.
            </div>
            <div
              class="btns d-flex flex-column flex-sm-row align-center justify-center justify-md-start w-100"
              style="gap: 20px"
            >
              <action-button
                text="Google Play"
                direction="start"
                textColor="#111111"
              >
                <img
                  src="@/assets/SVGS/home/download_app/google.svg"
                  alt=""
                  width="22"
                  class="me-2"
                />
              </action-button>
              <action-button
                text="App Store"
                direction="start"
                textColor="#111111"
              >
                <img
                  src="@/assets/SVGS/home/download_app/apple.svg"
                  alt=""
                  width="22"
                  class="me-2"
                />
              </action-button>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ActionButton from "@/components/global/ActionButton";
</script>
