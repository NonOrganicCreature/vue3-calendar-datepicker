<script setup lang="ts">
import { ref } from "@vue/reactivity";
import Calendar from "./components/calendar/Calendar.vue";
const currentDate = ref({ date: null });
</script>

<template>
  <Calendar v-model="currentDate.date" :locale="'en'" />
</template>

<style>
* {
  transition: height 1s ease;
}
</style>
