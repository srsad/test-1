<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCourseStore } from '@/stores/courses'

const store = useCourseStore()
const { fetchCourses } = store
fetchCourses()
</script>

<template>
  <header>
    <nav class="nav">
      <RouterLink class="nav__item" to="/">Список валют</RouterLink>
      <RouterLink class="nav__item" to="/converter">Конвертер</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>
