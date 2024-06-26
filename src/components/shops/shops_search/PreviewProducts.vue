<template>
  <div class="preview_products py-16 my-10">
    <v-container fluid class="px-md-16 px-7">
      <v-row>
        <v-col
          cols="12"
          class="d-flex justify-space-between flex-column flex-md-row align-md-center mb-16"
        >
          <h2 class="title">Shops</h2>
          <div class="btns mt-5 mt-md-0 d-flex flex-wrap" style="gap: 20px">
            <!-- <action-btn
              text="Like List"
              bgColor="#013331"
              textColor="#FCFCFC"
              direction="start"
              height="40"
            >
              <v-icon size="20" class="me-2">mdi-heart</v-icon>
            </action-btn> -->
            <action-btn
              text="Like List"
              bgColor="#013331"
              textColor="#FCFCFC"
              direction="end"
              height="40"
            >
              <v-icon size="20" class="ms-2">mdi-chevron-down</v-icon>
            </action-btn>
            <!-- <action-btn
              text="Filters"
              bgColor="#013331"
              textColor="#FCFCFC"
              direction="end"
              height="40"
            >
              <v-icon size="20" class="ms-2">mdi-filter</v-icon>
            </action-btn> -->
          </div>
        </v-col>
        <!-- <v-col cols="12" sm="4" md="3" class="pe-sm-4 mb-10 mb-md-0">
          <div class="filters">
            <div class="model">
              <div class="label">Model</div>
              <v-autocomplete
                variant="outlined"
                label="Search for model"
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-divider></v-divider>
            </div>
            <div class="storage">
              <div class="label">Storage Size</div>
              <v-autocomplete
                variant="outlined"
                label="Search for storage size"
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-divider></v-divider>
            </div>
            <div class="color">
              <div class="label">Color</div>
              <v-autocomplete
                variant="outlined"
                label="Search for color"
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-divider></v-divider>
            </div>
            <div class="condition">
              <div class="label">Condition</div>
              <v-autocomplete
                variant="outlined"
                label="Search for condition"
              ></v-autocomplete>
              <v-divider></v-divider>
              <v-divider></v-divider>
            </div>
          </div>
          <div class="filters mt-10">
            <div class="model">
              <div class="label">Filters</div>
              <v-chip class="me-2 mb-3">I Phone 14 pro</v-chip>
              <v-chip class="me-2 mb-3">256 GB</v-chip>
              <v-chip class="me-2 mb-3">128 GB</v-chip>
              <v-chip class="me-2 mb-3">Blue</v-chip>
              <v-chip class="me-2 mb-3">Used - Excellent Condition</v-chip>
            </div>
          </div>
        </v-col> -->
        <v-col cols="12" class="ps-sm-4">
          <v-row v-if="shops && shops.data">
            <v-col cols="12" v-for="shop in shops.data" :key="shop.id">
              <ShopCard
                :show_btns="true"
                :showLike="true"
                @send_message="$emit('open_send_message', $event)"
                @ad_clicked="
                  $router.push({
                    name: 'productDetails',
                    params: { id: $event.id, catId: $event.subcategory.id },
                  })
                "
                :shop="shop"
              />
            </v-col>
          </v-row>
          <div
            class="no_results"
            v-else
            style="
              font-size: 25px;
              text-align: center;
              font-family: 'RailwaySemi', sans-serif;
              color: #0000008f;
              border: 2px solid #0000004a;
              border-radius: 10px;
              height: 500px;
              display: flex;
              align-items: center;
              justify-content: center;
            "
          >
            No ads available for this search!
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ActionBtn from "@/components/global/ActionButton.vue";
import { defineProps } from "vue";
import ShopCard from "@/components/global/ShopCard.vue";

defineProps(["ads_results", "shops"]);
</script>
