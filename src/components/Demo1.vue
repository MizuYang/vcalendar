<template>
  <Calendar :initial-page="{ month: 4, year: 2019 }"
            :color="colors[selectedColorIdx].toLowerCase()"
            :attributes="attrs" />

  <!-- 變更顏色按鈕 -->
  <ul class="d-flex justify-content-center color-wrap-bg mt-10 py-10">
    <li v-for="(color,idx) in colors" :key="color"
        class="mx-2"
        :style="idx===selectedColorIdx&&`
                transform: rotate(15deg);
                border-bottom:2px solid ${color};
                padding-bottom:10px;`">
      <button type='button'
              class='btn color-btn'
              @click='selectColor(idx)'
              :style="`--color:${color.toLowerCase()};`">
        {{ color }}
      </button>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted } from 'vue' // eslint-disable-line
import { Calendar, DatePicker } from 'v-calendar' // eslint-disable-line
import 'v-calendar/style.css'

let timer = ''
const colors = ref(['Gray', 'Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Blue', 'Indigo', 'Purple', 'Pink'])
const selectedColorIdx = ref(0) // 用戶選擇的顏色索引
const attrs = ref([
  {
    key: 'test',
    highlight: true,
    // 設定日期區間
    dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) }
  }
])

onMounted(() => {
  autoPlayColor()
})

function selectColor (idx) {
  stopPlayColor()
  selectedColorIdx.value = idx
}
function autoPlayColor () {
  timer = setInterval(() => {
    selectedColorIdx.value++

    if (selectedColorIdx.value > colors.value.length - 1) {
      selectedColorIdx.value = 0
    }
  }, 1000)
}
function stopPlayColor () {
  clearInterval(timer)
}
</script>

<style lang="scss" scoped>
.color-wrap-bg {
  background-color: #0000001a;

  & > li {
    transition: transform 0.5s ease;
  }
}
.color-btn {
  color: var(--color);
  border: 2px solid var(--color);
  border-radius:20px;
  font-weight: 900;
  &:hover {
    color: #fff;
    background-color: var(--color);
  }
}
</style>
