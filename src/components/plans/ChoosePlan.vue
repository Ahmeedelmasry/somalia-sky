<template>
  <div class="choose_plan_comp pt-16">
    <v-container class="pb-16" v-if="plans.length">
      <v-row>
        <v-col cols="12">
          <h3 class="title">Choose Your Best Plan</h3>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(plan, q) in plans"
          :key="plan.id"
          :class="[`px-2`, `${q == 1 ? 'middle_col' : ''}`, `pb-12`]"
        >
          <v-card
            class="plan_card text-center"
            :style="`${
              q == 1
                ? `
    box-shadow: -8px -8px 16px rgba(0, 0, 0, 0.25),
      8px 8px 16px rgba(0, 0, 0, 0.25);`
                : ''
            }`"
          >
            <v-card-title
              class="px-8"
              :style="`background-color: ${
                q == 1 ? '#fff' : '#013331'
              }; color: ${q == 1 ? '#013331' : '#fff'}`"
              >{{ plan.name }}</v-card-title
            >
            <v-card-text :class="[`px-8`, `pt-10`]">
              <span v-html="plan.desc"></span>
            </v-card-text>
            <div class="price">{{ plan.price }}</div>
            <div class="price_table px-8">
              <table :class="[`w-100 `, `pb-16`]">
                <thead>
                  <tr>
                    <th :style="`padding-top: ${q == 1 ? '40px' : '30px'}`">
                      Ads
                    </th>
                    <th :style="`padding-top: ${q == 1 ? '40px' : '30px'}`">
                      Months
                    </th>
                    <th :style="`padding-top: ${q == 1 ? '40px' : '30px'}`">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in plan.package_details"
                    :key="i"
                    style="background-color: #01333121"
                  >
                    <td>{{ row.ads }}</td>
                    <td>{{ row.month }}</td>
                    <td>${{ row.price }}</td>
                  </tr>
                  <tr class="empty">
                    <td class="py-10"></td>
                    <td class="py-10"></td>
                    <td class="py-10"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <ActionButton
              :class="[`mt-16`, `pb-10`, `pb-16`]"
              text="STARTED"
              :bgColor="q == 1 ? '#fff' : '#013331'"
              :textColor="q == 1 ? '#013331' : '#fff'"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <DownloadApp />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ActionButton from "@/components/global/ActionButton.vue";
import DownloadApp from "../home_page/DownloadApp.vue";

defineProps({
  plans: {
    type: Array,
  },
});
</script>
