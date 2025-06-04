<template>
  <div>
    <DInput v-model="form.address" placeholder="Dirección" />
    <p class="text-lg mt-12 font-semibold text-center">SOLO PARA TEST A</p>
  </div>
</template>

<script setup>
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const form = reactive({ ...planStore.stepsData.step6 })

  watchEffect(() => {
    planStore.stepsData.step6 = { ...form }
  })

  const isValid = computed(() => form.address.length > 0 && form.address.length <= 100)

  onMounted(() => {
    registerValidation(6, isValid)
  })
</script>