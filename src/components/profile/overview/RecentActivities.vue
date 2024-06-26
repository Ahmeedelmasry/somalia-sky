<template>
  <div class="recent_activities pt-9">
    <div class="parent px-5 py-7">
      <h3 class="mb-5">Recent Activities</h3>
      <ul>
        <li v-for="(item, i) in items" :key="i">
          <div class="img_container" :style="`background-color:${item.color}`">
            <img :src="item.img" alt="" />
          </div>
          <span>{{ item.content }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const items = ref([
  {
    img: "/svgs/profile/overview/check.svg",
    content: "Your Ad “I Phone 14 pro 128 GB” is Successful Published. View Ad",
    color: "#E3F5DA",
  },
  {
    img: "/svgs/profile/overview/report.svg",
    content: "John Wick Saved Your Ad to His Favorite's Collection.",
    color: "#DAF2FD",
  },
  {
    img: "/svgs/profile/overview/warning.svg",
    content: "Please Complete Your Profile Editing to Post A Ads. ",
    color: "#F8BD0052",
  },
  {
    img: "/svgs/profile/overview/check.svg",
    content:
      "Your Ad “Convers Blue Training Shoes” is Successful Published. View Ad",
    color: "#E3F5DA",
  },
  {
    img: "/svgs/profile/overview/error.svg",
    content:
      "Ms, 5 Days Remaining to Complete Your Adlisting Membership Change. Pay Now",
    color: "#FDC5C5",
  },
]);
</script>
