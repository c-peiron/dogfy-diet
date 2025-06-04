<template>
  <div>
    <h2>Tus datos para el plan</h2>
    <div>
      <ul class="list-disc list-inside">
        <li>{{ planStore.stepsData.step1.name_dog }}</li>
        <li>{{ planStore.stepsData.step2.name }}</li>
        <li>{{ planStore.stepsData.step3.surname }}</li>
        <li>{{ planStore.stepsData.step4.email }}</li>
        <li>{{ planStore.stepsData.step5.phone }}</li>
        <li v-if="planStore.testABVariant === 'A'">{{ planStore.stepsData.step6.address }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
  import { inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation')

  const isValid = ref(true)

  onMounted(() => {
    registerValidation(planStore.testABVariant === 'A' ? 7 : 6, isValid)
  })
</script>