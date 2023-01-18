<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCourseStore } from '@/stores/courses'

import type { CurrencyAggregate } from '@/types/course'

const store = useCourseStore()
const { getValueByCharCode } = store
const { courseToArrayList } = storeToRefs(store)

const baseCurrency: Ref<string> = ref('')
const baseCurrencyValue: ComputedRef<number> = computed(() => {
  return getValueByCharCode(baseCurrency.value)
})

const currencySearch: Ref<string> = ref('')

const courseList: ComputedRef<CurrencyAggregate[]> = computed(() => {
  const result: CurrencyAggregate[] = []

  for (let item of courseToArrayList.value) {
    const charCode = item.CharCode.toLowerCase()
    const searchValue = currencySearch.value.toLocaleLowerCase()

    if (item.NumCode.includes(searchValue) || charCode.includes(searchValue)) {
      if (baseCurrency.value) {
        const itemValue = item.Value * (1 / baseCurrencyValue.value)
        item.Value = itemValue
      }

      result.push(item)
    }
  }

  return result
})
</script>

<template>
  <div class="course-grid">
    <div>
      <input
        v-model="currencySearch"
        class="course-grid__search"
        type="search"
        placeholder="Поиск валюты"
      />
      <select v-model="baseCurrency" class="course-grid__select">
        <option value="">Выберите базовый курс</option>
        <option
          v-for="item of courseToArrayList"
          :key="item.ID"
          :value="item.CharCode"
        >
          {{ item.CharCode }}
        </option>
      </select>
    </div>

    <div class="course-grid__row">
      <div>Цифр. код</div>
      <div>Букв. код</div>
      <div>Единиц</div>
      <div>Валюта</div>
      <div>Курс</div>
      <div></div>
    </div>

    <div v-for="item of courseList" :key="item.ID" class="course-grid__row">
      <div>{{ item.NumCode }}</div>
      <div>{{ item.CharCode }}</div>
      <div>{{ item.Nominal }}</div>
      <div>{{ item.Name }}</div>
      <div>{{ item.Value }}</div>
      <div :class="[item.Appreciation ? 'color-green' : 'color-red']">
        <span
          :class="[
            item.Appreciation
              ? 'course-grid__arrow_up'
              : 'course-grid__arrow_down',
          ]"
        />
        {{ item.Discrepancies }}
      </div>
    </div>
  </div>
</template>

<style>
.course-grid {
  display: grid;
}

.course-grid__search {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: 20px;
}

.course-grid__select {
  display: inline-block;
  margin-bottom: 10px;
}

.course-grid__row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.course-grid__row:hover {
  transition: all 0.2s;
  background-color: var(--vt-c-white-soft);
}

.course-grid__arrow_up {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: var(--vt-c-green);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.course-grid__arrow_down {
  display: inline-block;
  width: 12px;
  height: 12px;
  background: var(--vt-c-red);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
}
</style>
