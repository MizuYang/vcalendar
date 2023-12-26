<template>
  <Calendar ref="calendar"
            :initial-page="date"
            :color="colors[selectedColorIdx].toLowerCase()"
            :attributes="attrs"
            :borderless="!hasBorder"
            :is-dark="isDarkMode"
            :expanded="isExpanded">
    <template #footer>
      <div class="px-4 pb-3">
        <button
          type="button"
          class="w-100 btn btn-primary raduis-15 border-none fw-bold-9"
          @click="moveToday"
          :style="`background-color:${colors[selectedColorIdx].toLowerCase()};`"
        >
          今天
        </button>
      </div>
    </template>
  </Calendar>

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

  <div class="mt-10">
    <!-- 邊框設定 -->
    <button type='button'
            class='btn btn-primary mx-2'
            @click='hasBorder=!hasBorder'>
      {{ hasBorder?'隱藏邊框':'顯示邊框' }}
    </button>
    <!-- 白天/黑暗模式 -->
    <button type='button'
            class='btn btn-primary mx-2'
            @click='isDarkMode=!isDarkMode'>
      {{ isDarkMode?'白天模式':'黑暗模式' }}
    </button>
    <!-- 日曆全螢幕顯示 -->
    <button type='button'
            class='btn btn-primary mx-2'
            @click='isExpanded=!isExpanded'>
      {{ isExpanded?'取消全螢幕':'全螢幕顯示' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue' // eslint-disable-line
import { Calendar, DatePicker } from 'v-calendar' // eslint-disable-line
import 'v-calendar/style.css'

let timer = ''
const calendar = ref(null)
const colors = ref(['Gray', 'Red', 'Orange', 'Yellow', 'Green', 'Teal', 'Blue', 'Indigo', 'Purple', 'Pink'])
const selectedColorIdx = ref(0) // 用戶選擇的顏色索引
const hasBorder = ref(true) // 是否顯示邊框
const isDarkMode = ref(false) // 是否為黑暗模式
const isExpanded = ref(false) // 是否全螢幕顯示
const attrs = ref([
  {
    key: 'moveToday',
    highlight: true,
    // 設定單一日期
    // dates: new Date(2019, 3, 15)
    // 設定日期區間
    dates: { start: new Date(2023, 0, 15), end: new Date(2023, 0, 19) }
  }
])
// const date = ref(new Date(2023, 1, 15))
const date = ref({ month: 1, year: 2023 })

onMounted(() => {
  console.log('calendar', calendar.value)

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
function moveToday () {
  calendar.value.move(new Date())

  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1
  const d = new Date().getDate()

  attrs.value[0].dates = new Date(`${y}/${m}/${d}`)
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
