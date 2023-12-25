import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserInfoStore = defineStore('userInfoStore', () => {
  // data
  const userInfo = ref({})

  async function getUserInfo () {
    const config = {
      msthod: 'get',
      url: 'https://randomuser.me/api/',
      data: {}
    }
    try {
      const res = await axios(config)
      userInfo.value = res.data.results[0]

      console.log(userInfo.value)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    userInfo,
    getUserInfo
  }
})
