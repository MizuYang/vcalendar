<template>
  <Calendar v-model="date2" />
  <DatePicker v-model="date" />
</template>

<script setup>
import { ref } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import 'v-calendar/style.css'

const date = ref(new Date())
const date2 = ref(new Date())
</script>
