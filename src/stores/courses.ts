import type { Ref, ComputedRef } from 'vue'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import api from '@/api'

import type { Valute, CurrencyAggregate } from '@/types/course'

export const useCourseStore = defineStore('courses', () => {
  const courseList: Ref<Valute> = ref({})

  const rubleRrate: ComputedRef<number> = computed(() => {
    return courseList.value['USD'].Value
  })

  const courseToArrayList: ComputedRef<CurrencyAggregate[]> = computed(() => {
    const result: CurrencyAggregate[] = []

    for (const [_, value] of Object.entries(courseList.value)) {
      const item: CurrencyAggregate = { ...value }
      item.Discrepancies = +(item.Value - item.Previous).toFixed(4)
      item.Appreciation = item.Discrepancies > 0

      result.push(item)
    }

    return result
  })

  function getValueByCharCode(charCode: string): number {
    const result = courseToArrayList.value.find((el: CurrencyAggregate) => {
      return charCode === el.CharCode
    })?.Value

    return result || 1
  }

  async function fetchCourses() {
    try {
      const result = await api.course.getCourse()
      courseList.value = result.data.Valute
    } catch (error) {
      console.log('Не удалось получить данные', error)
    }
  }

  return {
    courseList,
    courseToArrayList,
    rubleRrate,

    fetchCourses,
    getValueByCharCode,
  }
})
