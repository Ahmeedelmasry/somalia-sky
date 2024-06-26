<template>
  <div class="app_footer">
    <v-footer class="pt-7 px-0 pb-0" :app="true" absolute>
      <v-container class="pt-5 px-0 pb-0" fluid>
        <v-row class="px-16">
          <v-col cols="12" sm="6" md="4" lg="3" class="logo_col pe-5">
            <div
              class="logo_parent d-flex align-center"
              style="gap: 10px; height: 100px; cursor: pointer"
              @click="$router.push({ name: 'home' })"
            >
              <img
                src="@/assets/SVGS/navbar/footer_logo.svg"
                alt=""
                width="80"
                height="80"
              />
              <span
                style="
                  color: #1a85b8;
                  font-size: 20px;
                  font-family: RailwayBold, sans-serif;
                "
                >SomaliaSky</span
              >
            </div>
            <div class="cont">
              <p>9931 Lorem ipsum dolor sit, amet consectetur 4469.</p>
              <p>Phone: (+252) 99 70397</p>
              <p>Mail: SomalliaSky@gmail.com</p>
            </div>
          </v-col>
          <v-col cols="6" sm="3" md="2" lg="2" class="mt-7 mt-sm-0">
            <h3 class="footer_heading">Support</h3>
            <ul>
              <!-- <li>Contact</li> -->
              <!-- <li>FAQS</li> -->
              <li>
                <router-link
                  :to="{
                    name: 'choosePlan',
                  }"
                  :class="[
                    'link_hover_dark',
                    `${$route.name == 'choosePlan' ? 'active' : ''}`,
                  ]"
                  style="
                    font-family: RailwayRegular, sans-serif;
                    color: inherit;
                  "
                  >Get Membership</router-link
                >
              </li>
            </ul>
          </v-col>
          <v-col cols="6" sm="3" md="2" lg="2" class="mt-7 mt-sm-0">
            <h3 class="footer_heading">Qick List</h3>
            <ul>
              <!-- <li>About</li> -->
              <!-- <li>Get Membership</li> -->
              <li>Post a Ads</li>
              <!-- <li>Blog</li> -->
              <router-link
                :to="{
                  name: 'blogsListing',
                }"
                :class="[
                  'link_hover_dark',
                  `${$route.name == 'blogsListing' ? 'active' : ''}`,
                ]"
                style="
                  font-family: RailwayRegular, sans-serif;
                  color: inherit;
                  width: fit-content;
                "
                >Blog</router-link
              >
            </ul>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3" class="mt-7 mt-md-0">
            <h3 class="footer_heading">Category</h3>
            <div class="d-flex" style="gap: 30px">
              <ul v-if="categories.length">
                <li v-for="num in 4" :key="num">
                  <router-link
                    :to="{
                      name: 'productsSearch',
                      query: {
                        cn: categories[num - 1].name,
                        ci: categories[num - 1].id,
                      },
                    }"
                    :class="[
                      'link_hover_dark',
                      `${
                        categories[num - 1].name == $route.query.cn
                          ? 'active'
                          : ''
                      }`,
                    ]"
                    style="
                      font-family: RailwayRegular, sans-serif;
                      color: inherit;
                    "
                    >{{ categories[num - 1].name }}</router-link
                  >
                </li>
              </ul>
              <ul v-if="categories.length">
                <li v-for="num in 4" :key="num">
                  <router-link
                    :class="[
                      'link_hover_dark',
                      `${
                        categories[num + 3].name == $route.query.cn
                          ? 'active'
                          : ''
                      }`,
                    ]"
                    :to="{
                      name: 'productsSearch',
                      query: {
                        cn: categories[num + 3].name,
                        ci: categories[num + 3].id,
                      },
                    }"
                    style="
                      font-family: RailwayRegular, sans-serif;
                      color: inherit;
                    "
                    v-if="categories[num + 3]"
                    >{{ categories[num + 3].name }}</router-link
                  >
                </li>
              </ul>
              <ul v-if="categories.length">
                <li v-for="num in 4" :key="num">
                  <router-link
                    :class="[
                      'link_hover_dark',
                      `${
                        categories[num + 7].name == $route.query.cn
                          ? 'active'
                          : ''
                      }`,
                    ]"
                    :to="{
                      name: 'productsSearch',
                      query: {
                        cn: categories[num + 7].name,
                        ci: categories[num + 7].id,
                      },
                    }"
                    style="
                      font-family: RailwayRegular, sans-serif;
                      color: inherit;
                    "
                    v-if="categories[num + 7]"
                    >{{ categories[num + 7].name }}</router-link
                  >
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" sm="4" md="3" lg="2" class="mt-7 mt-md-0">
            <h3 class="footer_heading">Follow Us</h3>
            <ul
              class="flex-row align-center"
              style="gap: 15px; margin-top: 12px !important"
            >
              <img
                src="@/assets/SVGS/navbar/social/facebook.svg"
                alt=""
                width="30"
                height="30"
              />
              <img
                src="@/assets/SVGS/navbar/social/twitter.svg"
                alt=""
                height="30"
                width="30"
              />
              <img
                src="@/assets/SVGS/navbar/social/instagram.svg"
                height="40"
                alt=""
                width="40"
                class="mt-1"
              />
              <img
                src="@/assets/SVGS/navbar/social/linkedin.svg"
                alt=""
                height="30"
                width="30"
              />
              <img
                src="@/assets/SVGS/navbar/social/whatsapp.svg"
                alt=""
                height="30"
                width="30"
              />
            </ul>
          </v-col>
        </v-row>
        <CopyRights />
      </v-container>
    </v-footer>
  </div>
</template>

<script setup>
import CopyRights from "./CopyRights.vue";
import { storeToRefs } from "pinia";
import { categoryStore } from "@/stores/categories/categories";

const { categories } = storeToRefs(categoryStore());
</script>
