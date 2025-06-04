<template>
  <div class="flex flex-col h-full">
    <div class="progress-bar p-1">
      <div class="bg-progress-bar-background h-1 rounded-full ">
        <div class="bg-progress-bar transition-[width] h-full w-0" :style="{width: progressPercentage+'%'}"></div>
      </div>
    </div>
    <div class="flex-grow pt-20">
      <div class="flex flex-col items-center gap-y-8"> 
        <component :is="steps[currentStep - 1].component" ref="stepComponentRef" />
        <DButton
          :disabled="!isStepValid"
          @click="handleNext"
          :label="isLastStep ? 'Enviar' : 'Siguiente'"
        />
        <div v-if="steps[currentStep - 1].tooltip" class="text-center text-gray-500 text-sm border border-gray-300 rounded-lg p-4 mt-4">
          {{ steps[currentStep - 1].tooltip }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, computed, provide, reactive, onBeforeMount, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { analytics  } from '@/services/analytics'

interface Step {
  component: any;
  tooltip: string;
}

interface Props {
  steps: Array<Step>;
  store?: any;
}
const { steps, store } = defineProps<Props>();
const emits = defineEmits(['endOfSteps'])

const route = useRoute()
const router = useRouter()
const { logStepCompleted, logCompletion } = analytics;

// Reactive object to hold validation states for each step
const validationStates = reactive<Record<string | number, any>>({})
  
// Function to register validation state for a step. As a computed property, it will be reactive.
function registerValidation(stepIndex: string | number, isValidRef: any) {
  validationStates[stepIndex] = isValidRef
}
// Provide the registerValidation function to child components
provide('registerValidation', registerValidation)

const currentStep = ref(1)
const isStepValid = ref(false)
const stepComponentRef = ref(null)
const isLastStep = computed(() => currentStep.value === steps.length)
const progressPercentage = computed(() => {
  return ((currentStep.value - 1) / (steps.length - 1)) * 100
})

// Watch for changes in the validation states and update isStepValid
watchEffect(() => {
  const validator = validationStates[currentStep.value]
  isStepValid.value = validator ?? false
})

const handleNext = () => {
  if (!isStepValid.value) return

  if (isLastStep.value) {
    emits('endOfSteps')
    logCompletion()
  } else {
    router.push({ query: { step: currentStep.value + 1 } });
    logStepCompleted(currentStep.value)
  }
}

watch(
  () => route.query.step,
  (newStep) => {
    const parsedStep = parseInt(Array.isArray(newStep) ? newStep[0] || '' : newStep ?? '')
    if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= steps.length) {
      currentStep.value = parsedStep
      if (store) store.currentStep = parsedStep;
    }
  }
)

onBeforeMount(async () => {
  const stepFromUrl = parseInt(Array.isArray(route.query.step) ? route.query.step[0] || '' : route.query.step || '')
  const stepFromStore = store?.currentStep

  const initialStep = !isNaN(stepFromUrl) ? stepFromUrl : stepFromStore ?? 1

  for (let i = 1; i <= initialStep; i++) {
    if(i === 1) await router.replace({ query: { step: i } })
    else await router.push({ query: { step: i } })
  }
  currentStep.value = initialStep
})
</script>