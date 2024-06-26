import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage"),
  },
  {
    path: "/ads-results",
    name: "productsSearch",
    component: () => import("@/views/product/ProductsSearch"),
  },
  {
    path: "/shops-results",
    name: "shopsSearch",
    component: () => import("@/views/shops/ShopSearch"),
  },
  {
    path: "/blogs",
    name: "blogsListing",
    component: () => import("@/views/blogs/BlogsListing"),
  },
  {
    path: "/ad-details/:id/:catId",
    name: "productDetails",
    component: () => import("@/views/product/ProductDetails"),
  },
  {
    path: "/shop-details/:id",
    name: "shopDetails",
    component: () => import("@/views/shops/ShopDetails"),
  },
  {
    path: "/membership",
    name: "choosePlan",
    component: () => import("@/views/plans/ChoosePlan"),
  },
  {
    path: "/profile",
    name: "ProfileMain",
    component: () => import("@/views/profile/ProfileMain"),
    children: [
      {
        path: "",
        component: () => import("@/views/profile/children/OverView"),
        name: "profileOverview",
      },
      {
        path: "my-ads",
        component: () => import("@/views/profile/children/MyAds"),
        name: "profileMyAds",
      },
      {
        path: "my-favourites",
        component: () => import("@/views/profile/children/MyFavourites"),
        name: "profileFavourites",
      },
      {
        path: "my-messages",
        component: () => import("@/views/profile/children/MyMessages"),
        name: "profileMessages",
      },
      {
        path: "my-messages/message-room/:id",
        component: () => import("@/views/profile/children/MessageRoom"),
        name: "messageRoom",
      },
      {
        path: "my-pilling",
        component: () => import("@/views/profile/children/PillingPlans"),
        name: "profilePilling",
      },
      {
        path: "settings",
        component: () => import("@/views/profile/children/MySettings"),
        name: "profileSettings",
      },
      {
        path: "open-shop",
        component: () => import("@/views/profile/children/OpenShop"),
        name: "openShop",
      },
      {
        path: "delete-my-account",
        component: () => import("@/views/profile/children/DeleteAccount"),
        name: "deleteAccount",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const authModule = authStore();
  const { loggerState } = storeToRefs(authModule);

  await authModule.checkAuth();
  if (loggerState.value == 0) {
    if (to.path.includes("profile")) return next("/");
  }

  if (loggerState.value == 2) {
    await authModule.getUserData();
    return next();
  }
  next();
});

export default router;
