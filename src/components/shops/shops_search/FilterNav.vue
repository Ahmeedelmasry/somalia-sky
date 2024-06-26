<template>
  <div class="filter_nav">
    <v-container fluid class="px-md-14">
      <v-row class="filter_container align-center">
        <v-col cols="12" md="5">
          <div class="all_cats">
            <action-btn
              text="All Categories"
              bgColor="#1111112B"
              textColor="#013331"
              direction="end"
              height="40"
              id="all_cats"
            >
              <v-icon size="20">mdi-chevron-down</v-icon>
            </action-btn>

            <v-menu
              activator="#all_cats"
              transition="slide-y-transition"
              offset="2"
            >
              <v-list class="px-0" width="200" mandatory>
                <v-list-item
                  v-for="cat in categories"
                  :key="cat.id"
                  :value="cat.name"
                  :class="[
                    `px-0`,
                    `${cat.name == $route.query.cn ? 'active_category' : ''}`,
                  ]"
                >
                  <router-link
                    class="nav_link d-block py-2 px-3 w-100"
                    :to="{
                      name: 'productsSearch',
                      query: { ...$route.query, cn: cat.name, ci: cat.id },
                    }"
                    style="color: black"
                    ><v-icon>mdi-circle-small</v-icon>
                    {{ cat.name }}</router-link
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <span class="separator"></span>
            <span>{{ $route.query.cn || "All Categories" }}</span>
          </div>
        </v-col>
        <v-col cols="12" md="7" class="mt-5 mt-md-0">
          <div class="filters flex-column flex-md-row py-5 py-md-0">
            <v-btn variant="text" color="grey-lighten-2" id="type_menu">
              Type
              <v-icon size="26" color="grey" class="ms-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
            <v-menu activator="#type_menu" transition="slide-y-transition">
              <v-list class="px-3">
                <v-list-item>
                  <v-list-item-title>Apple</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Samsung</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Nokia</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn variant="text" color="grey-lighten-2" id="price_menu">
              Price
              <v-icon size="26" color="grey" class="ms-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
            <v-menu
              activator="#price_menu"
              transition="slide-y-transition"
              :closeOnContentClick="false"
              width="300"
              v-model="priceMenu"
            >
              <v-list>
                <v-list-item>
                  <v-range-slider
                    class="px-4 pt-10"
                    v-model="priceRange"
                    step="10"
                    color="green-darken-4"
                    thumb-label="always"
                    min="0"
                    max="1000"
                  ></v-range-slider>
                </v-list-item>
                <v-list-item class="text-center">
                  <v-btn
                    style="
                      color: white;
                      background-color: rgb(1, 51, 49);
                      text-transform: none;
                    "
                    @click="
                      $router.push({
                        name: 'productsSearch',
                        query: {
                          ...$route.query,
                          mi: priceRange[0],
                          ma: priceRange[1],
                        },
                      }),
                        (priceMenu = false)
                    "
                    >Search</v-btn
                  >
                </v-list-item>
              </v-list>
            </v-menu>
            <v-btn variant="text" color="grey-lighten-2" id="location_menu">
              Location
              <v-icon size="26" color="grey" class="ms-1"
                >mdi-chevron-down</v-icon
              >
            </v-btn>
            <v-menu activator="#location_menu" transition="slide-y-transition">
              <v-list class="px-3">
                <v-list-item>
                  <v-list-item-title>Egyp</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Jordan</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Saudi Arabia</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
        <v-col cols="12" class="breadcrumbs">
          <span>Somalia</span>
          <span v-if="$route.query.cn"> /{{ $route.query.cn }}</span>
          <span v-else> /All Categories</span>
          <span v-if="$route.query.kw"> /{{ $route.query.kw }}</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import ActionBtn from "@/components/global/ActionButton.vue";
import { storeToRefs } from "pinia";
import { categoryStore } from "@/stores/categories/categories";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const { categories } = storeToRefs(categoryStore());

// Data
const category = ref({});
const priceRange = ref([0, 100]);
const priceMenu = ref(false);

onMounted(() => {
  if (useRoute().query.mi) {
    priceRange.value[0] = useRoute().query.mi;
  }
  if (useRoute().query.ma) {
    priceRange.value[1] = useRoute().query.ma;
  }
});
</script>
