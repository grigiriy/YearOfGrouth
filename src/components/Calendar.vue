<template>
  <div class="min-h-screen flex justify-center items-center text-[10px]">
    <div class="container max-w-sm md:max-w-md mx-auto overflow-x-scroll md:overflow-hidden">
      <div class="grid grid-cols-12 relative">
        <div v-for="(month) in months" :key="month" class="col-span-1">
          <p class="text-center font-bold lowercase text-gray-700 fixed">{{ month }}</p>
        </div>
      </div>
      <div class="grid grid-cols-12 pt-5">
        <div v-for="(month, index) in months" :key="month" class="col-span-1">
          <div
            v-for="day in getDays(index)"
            :key="`${month}-${day}`"
            :class="['flex justify-center items-center w-6 h-6 rounded-full border border-gray-200 text-gray-200', isActive(month, day) ? 'bg-amber-500 shadow-lg shadow-yellow-500/50' : 'bg-gray-100']"
            @click="toggleDay(month, day)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const activeDays = ref<string[]>(JSON.parse(localStorage.getItem("activeDays") || "[]"));

    // Calculate days in a given month, accounting for leap years
    const getDays = (monthIndex: number): number[] => {
      const year = new Date().getFullYear();
      const nextMonth = new Date(year, monthIndex + 1, 1);
      const lastDay = new Date(nextMonth.getTime() - 1);
      return Array.from({ length: lastDay.getDate() }, (_, i) => i + 1);
    };

    // Check if a specific day is active
    const isActive = (month: string, day: number) => {
      const dayKey = `${month}-${day}`;
      return activeDays.value.includes(dayKey);
    };

    // Toggle the active state of a specific day
    const toggleDay = (month: string, day: number) => {
      const dayKey = `${month}-${day}`;
      if (isActive(month, day)) {
        activeDays.value = activeDays.value.filter(d => d !== dayKey);
      } else {
        activeDays.value.push(dayKey);
      }
      localStorage.setItem("activeDays", JSON.stringify(activeDays.value));
    };

    return { months, getDays, isActive, toggleDay };
  }
};
</script>

<style scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
