<template>
  <div>
    <DInput v-model="form.phone" placeholder="Teléfono" type="number" />
  </div>
</template>

<script setup>
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const form = reactive({ ...planStore.stepsData.step5 })

  watchEffect(() => {
    planStore.stepsData.step5 = { ...form }
  })

  const isValid = computed(() => form.phone > 600000000 && form.phone < 799999999)

  onMounted(() => {
    registerValidation(5, isValid)
  })
</script>