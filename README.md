<a href="https://mizuyang.github.io/vcalendar/#/">Demo</a>

- vcalendar 套件
 - 檔案中單一匯入日曆元件 (非全域註冊 Component)
 - attributes 
   - dot、bar、popover、customData ...大部分的功能
 - 日曆元件的屬性
   - is-range 未來可能會被移除, 改使用 v-model.range
   - 主題色、黑暗模式、無邊框、最大最小日期、行、列、全螢幕顯示....等 常用屬性
 - 設定日期
   - 選擇單一日期
   - 選擇區間日期
 - Slot 插槽
   - #footer
   - #day-poover
   - #default
 - Api Methods
   - move()
   - moveBy()
 - Events
   - dayclick：點擊日期觸發
   - daymouseenter：滑鼠進入時觸發
   - daymouseleave：滑鼠離開時觸發
   - dayfocusin：滑鼠或鍵盤 focus日期時觸發
   - dayfocusout：滑鼠或鍵盤離開日期 focus 時觸發
   - daykeydown：鍵盤按下時觸發
   - transitionStart：漸變開始時觸發
   - transitionEnd：漸變結束時觸發
   - didMove：日曆的年或月份有移動就觸發