<script setup lang="ts">
import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'

import { storeToRefs } from 'pinia'
import { useCourseStore } from '@/stores/courses'

import type { CurrencyAggregate } from '@/types/course'

const store = useCourseStore()
const { getValueByCharCode } = store
const { courseToArrayList } = storeToRefs(store)

const baseCurrency: Ref<string> = ref('USD')
const secondCurrency: Ref<string> = ref('EUR')

const baseCurrencyList: ComputedRef<CurrencyAggregate[]> = computed(() => {
  return courseToArrayList.value.filter((el: CurrencyAggregate) => {
    return el.CharCode !== secondCurrency.value
  })
})

const secondCurrencyList: ComputedRef<CurrencyAggregate[]> = computed(() => {
  return courseToArrayList.value.filter((el: CurrencyAggregate) => {
    return el.CharCode !== baseCurrency.value
  })
})

const baseCurrencyValue: ComputedRef<number> = computed(() => {
  return getValueByCharCode(baseCurrency.value)
})

const secondCurrencyValue: ComputedRef<number> = computed(() => {
  return getValueByCharCode(secondCurrency.value)
})

const quantity: Ref<number> = ref(1)

const discrepanciesSecondaryAndPrimary: ComputedRef<number> = computed(() => {
  const result =
    secondCurrencyValue.value * (quantity.value / baseCurrencyValue.value)
  return +result.toFixed(4)
})

function reverseValute() {
  const newBaseCurrency: string = secondCurrency.value
  const newSecondCurrency: string = baseCurrency.value

  baseCurrency.value = newBaseCurrency
  secondCurrency.value = newSecondCurrency
}
</script>

<template>
  <div class="converter">
    <div>
      <select v-model="baseCurrency">
        <option
          v-for="item of baseCurrencyList"
          :key="item.ID"
          :value="item.CharCode"
        >
          {{ item.CharCode }}
        </option>
      </select>
    </div>
    <div />
    <div>
      <select v-model="secondCurrency">
        <option
          v-for="item of secondCurrencyList"
          :key="item.ID"
          :value="item.CharCode"
        >
          {{ item.CharCode }}
        </option>
      </select>
    </div>

    <div>
      <input type="text" v-model.number="quantity" />
    </div>
    <div>
      <span class="cursor-pointer" @click="reverseValute">👉</span>
    </div>
    <div>{{ discrepanciesSecondaryAndPrimary }}</div>
  </div>
</template>

<style>
.converter {
  display: grid;
  width: 300px;
  gap: 20px;
  grid-template-columns: 1fr 50px 1fr;
  margin-bottom: 100px;
}
</style>
