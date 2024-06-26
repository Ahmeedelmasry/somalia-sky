<template>
  <div class="choose_plane">
    <ChoosePlan :plans="plans" v-if="!loading" />
    <PreLoader v-if="loading" />
  </div>
</template>

<script setup>
import ChoosePlan from "@/components/plans/ChoosePlan.vue";
import { billingStore } from "@/stores/pilling/plans";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import PreLoader from "@/components/plans/PreLoader.vue";

const { plans } = storeToRefs(billingStore());

const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  await billingStore().getPlans();
  loading.value = false;
});
</script>
