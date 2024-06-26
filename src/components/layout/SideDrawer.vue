<template>
  <div class="side_drawer">
    <v-navigation-drawer
      v-model="drawer"
      location="left"
      :width="breakPoints.display.xs ? '270' : 350"
    >
      <v-card elevation="0">
        <v-list>
          <v-list-item class="text-end py-4">
            <v-icon size="30" color="grey-darken-1" @click="drawer = false"
              >mdi-close</v-icon
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            value="Home"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{ name: 'home' }"
              >Home</router-link
            >
          </v-list-item>
          <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            value="Ads"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{ name: 'productsSearch' }"
              >Ads</router-link
            >
          </v-list-item>
          <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            value="Shops"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{ name: 'shopsSearch' }"
              >Shops</router-link
            >
          </v-list-item>
          <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            value="Blogs"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{ name: 'blogsListing' }"
              >Blogs</router-link
            >
          </v-list-item>
          <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            value="Get Membership"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{ name: 'choosePlan' }"
              >Get Membership</router-link
            >
          </v-list-item>
          <v-list-group value="التقارير">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                title="All Categories"
                class="px-7 drawer_group_activator"
              >
              </v-list-item>
            </template>
            <v-list-item
              base-color="rgb(1, 51, 49)"
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.name"
            >
              <router-link
                class="nav_link d-block py-4 ps-7 w-100"
                :to="{
                  name: 'productsSearch',
                  query: { cn: cat.name, ci: cat.id },
                }"
                >{{ cat.name }}</router-link
              >
            </v-list-item>
          </v-list-group>
          <!-- <v-list-item
            class="px-0 py-0"
            base-color="rgb(1, 51, 49)"
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.name"
            @click="drawer = false"
          >
            <router-link
              class="nav_link d-block py-4 ps-7 w-100"
              :to="{
                name: 'productsSearch',
                query: { cn: cat.name, ci: cat.id },
              }"
              >{{ cat.name }}</router-link
            >
          </v-list-item> -->
          <v-divider></v-divider>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { createVuetify } from "vuetify";
import { ref, onMounted } from "vue";
import { categoryStore } from "@/stores/categories/categories";
import { mainStore } from "@/stores/main";

// Init Vuetify
const vuetify = createVuetify();

// Init Store
const mainModule = mainStore();
const breakPoints = ref(vuetify);

// Data
const { drawer } = storeToRefs(mainModule);
const { categories } = storeToRefs(categoryStore());

onMounted(async () => {
  await categoryStore().getCategories();
});
</script>

<style lang="scss">
.side_drawer {
  a.nav_link {
    display: inline-block;
    transition: color 0.3s, background 0.3s;
    font-weight: 600;
    letter-spacing: 0.2px;
    text-transform: capitalize;
    font-size: 17px;
    color: #022f5d;
    text-decoration: none;
    font-family: RailwaySemi, sans-serif;
    &:hover {
      color: rgb(1, 51, 49);
    }

    &.router-link-exact-active {
      color: rgb(1, 51, 49);
    }
  }
  .drawer_group_activator {
    .v-list-item-title {
      font-family: RailwaySemi, sans-serif;
      color: #022f5d;
    }
  }
  @media (max-width: 660px) {
    a.nav_link {
      font-size: 15px;
    }
    .drawer_group_activator {
      .v-list-item-title {
        font-size: 15px;
      }
    }
  }
}
</style>
