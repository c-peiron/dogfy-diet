<template>
  <div>
    <DInput v-model="form.surname" placeholder="Apellido" />
  </div>
</template>

<script setup>
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const form = reactive({ ...planStore.stepsData.step3 })

  watchEffect(() => {
    planStore.stepsData.step3 = { ...form }
  })

  const isValid = computed(() => form.surname.length > 2)

  onMounted(() => {
    registerValidation(3, isValid)
  })
</script>