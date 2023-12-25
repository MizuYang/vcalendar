<template>
  <p class="text-primary-color position-absolute-center">
    {{ userInfo.email }} <br />
    {{ userInfo.phone }}
  </p>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUserInfoStore } from '@/stores/userStore.js'

// store
const { getUserInfo } = useUserInfoStore()
const { userInfo } = storeToRefs(useUserInfoStore())

getUserInfo()
</script>

<style lang='scss' scope></style>
