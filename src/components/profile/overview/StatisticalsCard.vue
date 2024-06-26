<template>
  <div class="statisticals_card pt-9">
    <div class="parent px-5 py-7">
      <h3 class="mb-5">Ads View</h3>
      <Bar
        id="my-chart"
        ref="chart"
        :options="chartOptions"
        :data="chartData"
        :style="{
          width: '100%',
          height: '300px',
        }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = ref({
  labels: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  datasets: [{ data: [40, 20, 12, 15, 32, 17, 27], barThickness: 35 }],
});

const gradiantData = ref("black");

const chartOptions = computed(() => {
  return {
    responsive: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        display: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      bar: {
        backgroundColor: gradiantData.value,
      },
    },
  };
});

onMounted(() => {
  const ctx = document.getElementById("my-chart").getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);

  gradient.addColorStop(0, "rgb(100 199 255)");
  gradient.addColorStop(1, "white");

  gradiantData.value = gradient;
});
</script>
