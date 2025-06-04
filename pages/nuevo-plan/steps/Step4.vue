<template>
  <div>
    <DInput v-model="form.email" placeholder="Email" />
  </div>
</template>

<script setup>
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const form = reactive({ ...planStore.stepsData.step4 })

  watchEffect(() => {
    planStore.stepsData.step4 = { ...form }
  })

  const isValid = computed(() => form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))

  onMounted(() => {
    registerValidation(4, isValid)
  })
</script>