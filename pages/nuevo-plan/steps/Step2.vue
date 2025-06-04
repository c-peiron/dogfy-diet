<template>
  <div>
    <DInput v-model="form.name" placeholder="Nombre" />
  </div>
</template>

<script setup>
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const form = reactive({ ...planStore.stepsData.step2 })

  watchEffect(() => {
    planStore.stepsData.step2 = { ...form }
  })

  const isValid = computed(() => form.name.length > 2);

  onMounted(() => {
    registerValidation(2, isValid)
  })
</script>