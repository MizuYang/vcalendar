<template>
  <DatePicker ref="calendar" v-model="date"
            :rows="rowsColumns.rows.value"
            :columns="rowsColumns.columns.value"
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
  </DatePicker>

  <template v-if="new Date(date).toLocaleString()!=='Invalid Date'">
    <p>{{ new Date(date).toLocaleString() }}</p>
  </template>

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

  <!-- 設定 rows, columns -->
  <div class="mt-10">
    <div class="mb-2">
      <button type='button'
              class='btn btn-success mx-2'
              @click='addRowsColumns("row", "add")'
              :disabled="rowsColumns.rows.value>=4">
        新增一行
      </button>
      <button type='button'
              class='btn btn-secondary'
              @click='addRowsColumns("row", "lose")'
              :disabled="rowsColumns.rows.value<=1">
        減少一行
      </button>
    </div>
    <div>
      <button type='button'
              class='btn btn-success mx-2'
              @click='addRowsColumns("column", "add")'
              :disabled="rowsColumns.columns.value>=3">
        新增一列
      </button>
      <button type='button'
              class='btn btn-secondary'
              @click='addRowsColumns("column", "lose")'
              :disabled="rowsColumns.columns.value<=1">
        減少一列
      </button>
    </div>
  </div>

  <!-- moveBy(num) 移動幾個月分的方法 -->
  <div class="d-flex align-items-center justify-content-center mt-10">
    移動
    <input type="number"
            class="form-control text-center mx-2"
            v-model.number="moveByNumber"
            min="-12"
            max="12"
            style="width:100px;" />
    個月。
    <button type='button'
            class='btn btn-primary raduis-10 ms-5'
            @click='moveBy'>
      移動
    </button>
  </div>

  <!-- transition -->
  <div class="d-flex align-itens-center justify-content-center mt-10">
    <p class="my-auto me-5">選擇 Transition 動畫</p>
    <select class="form-select"
            ref="transitionSelect"
            v-model="moveTransition"
            style="width:100px;">
      <option v-for="(item,idx) in moveTransitionData"
              :key="idx"
              :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue' // eslint-disable-line
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
    key: '15~19號',
    highlight: true,
    // 設定單一日期
    // dates: new Date(2019, 3, 15)
    // 設定日期區間
    dates: { start: new Date(2023, 0, 15), end: new Date(2023, 0, 19) }
  },
  {
    key: '2號',
    highlight: {
      color: 'red',
      fillMode: 'light'
    },
    dates: new Date(2023, 0, 2)
  },
  {
    key: '5,6號',
    highlight: {
      start: { fillMode: 'outline' },
      base: { fillMode: 'light' },
      end: { fillMode: 'outline' }
    },
    dates: { start: new Date(2023, 0, 5), end: new Date(2023, 0, 6) }
  },
  {
    key: '26,27號',
    dates: { start: new Date(2023, 0, 26), end: new Date(2023, 0, 27) },
    dot: {
      style: {
        backgroundColor: 'brown'
      },
      class: 'mb-1'
    },
    popover: {
      label: '該日期 focus 時才顯示',
      visibility: 'focus' // 該日期 focus 時才顯示
    }
  },
  {
    key: '9,10號',
    dates: { start: new Date(2023, 0, 9), end: new Date(2023, 0, 10) },
    bar: {
      style: {
        backgroundColor: 'blue'
      },
      class: 'mb-1'
    },
    popover: {
      label: '該日期 hover 時才顯示'
    }
  },
  {
    key: '31號',
    dates: new Date(2023, 0, 31),
    dot: {
      style: {
        backgroundColor: 'green'
      },
      class: 'mb-1'
    },
    popover: {
      label: '該日期 click 時才顯示',
      visibility: 'click' // 該日期 click 時才顯示
    }
  },
  {
    key: '每週六都加上dot',
    dates: { repeat: { weekdays: 7 } }, // 每週六
    dot: {
      class: 'mb-1',
      color: 'red'
    },
    popover: {
      label: 'repeat-weekdays:7 hover時顯示'
    }
  }
])
// const date = ref(new Date(2023, 1, 15))
const date = ref({ month: 1, year: 2023 })
const rowsColumns = ref({
  rows: {
    value: 1
  },
  columns: {
    value: 1
  }
})
const moveByNumber = ref(1) // 移動幾個月份
const moveTransition = ref('slide-h') // 移動動畫
const moveTransitionData = ref(['slide-h', 'slide-v', 'fade', 'none'])
const transitionSelect = ref(null)

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
// 參數: (行或列, 新增或減少)
function addRowsColumns (actionType, handleMethod) {
  if (actionType === 'row') {
    // 行
    if (handleMethod === 'add') {
      // 新增: 最多四行
      if (rowsColumns.value.rows.value < 4) rowsColumns.value.rows.value++
    } else {
      // 減少: 大於一行才能減少
      if (rowsColumns.value.rows.value > 1) rowsColumns.value.rows.value--
    }
  } else {
    // 列
    if (handleMethod === 'add') {
      // 新增: 最多三列
      if (rowsColumns.value.columns.value < 3) rowsColumns.value.columns.value++
    } else {
      // 減少: 大於一列才能減少
      if (rowsColumns.value.columns.value > 1) rowsColumns.value.columns.value--
    }
  }
}
async function moveBy () {
  await calendar.value.moveBy(moveByNumber.value, {
    // transition: slide-h, slide-v, fade, none
    transition: moveTransition.value
  })
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
