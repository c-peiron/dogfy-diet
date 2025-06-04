<template>
  <div class="bg-white text-black h-dvh w-full flex flex-col relative">
    <div class="header flex items-center justify-between px-12 py-4">
      <nuxt-link to="/">
        <Logo class="text-primary w-18" :fontControlled="false"  />
      </nuxt-link>
      <div class="bg-tag px-4 py-2 rounded-full text-base font-semibold">
        -30 % HOY 🎁
      </div>
    </div>
    <div class="flex-grow">
      <Stepper :steps="steps" :store="planStore" @endOfSteps="sendData"/>
    </div>
    <div class="absolute right-5 bottom-5">
      TEST A/B VARIANT: {{ planStore.testABVariant }}
    </div>
  </div>
  <ModalExit v-if="showExitModal" @cancel="showExitModal = false" @confirm="confirmExit" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'

import { usePlanStore } from '@/store/planStore'

import { analytics  } from '@/services/analytics'

import Stepper from '@/components/Stepper.vue'
import Step1 from './steps/Step1.vue'
import Step2 from './steps/Step2.vue'
import Step3 from './steps/Step3.vue'
import Step4 from './steps/Step4.vue'
import Step5 from './steps/Step5.vue'
import Step6 from './steps/Step6.vue'
import Step7 from './steps/Step7.vue'

import Logo from '~/assets/img/logo.svg';

const router = useRouter()

let steps;
const planStore = usePlanStore();
const { logTestAB } = analytics;

const showExitModal = ref(false);
const authorizedExit = ref(false);

const confirmExit = () => {
  router.push('/')
}

const sendData = () => {
  console.log('Sending data:', planStore.stepsData);
  alert('Datos enviados correctamente');
  authorizedExit.value = true;
  router.push('/');
  planStore.cleanData();
}

onBeforeMount(() => {
  if (!planStore.testABVariant) {
    planStore.testABVariant = Math.random() < 0.5 ? 'A' : 'B';
    logTestAB(planStore.testABVariant);
  }
  
  //Remove Step6 if testABVariant is B
  if (planStore.testABVariant === 'A') {
    steps = [
      { component: Step1, tooltip: 'Selecciona la raza de tu perro' },
      { component: Step2, tooltip: 'Datos del dueño' },
      { component: Step3, tooltip: 'Apellidos del dueño' },
      { component: Step4, tooltip: 'Email del dueño' },
      { component: Step5, tooltip: 'Teléfono del dueño' },
      { component: Step6, tooltip: 'Dirección del dueño' },
      { component: Step7, tooltip: 'Tus datos para el plan' }
    ];
  } else {
    steps = [
      { component: Step1, tooltip: 'Selecciona la raza de tu perro' },
      { component: Step2, tooltip: 'Datos del dueño' },
      { component: Step3, tooltip: 'Apellidos del dueño' },
      { component: Step4, tooltip: 'Email del dueño' },
      { component: Step5, tooltip: 'Teléfono del dueño' },
      { component: Step7, tooltip: 'Tus datos para el plan' }
    ];
  }
});

onBeforeRouteLeave((to, from, next) => {
  if (!showExitModal.value && to.name !== from.name && !authorizedExit.value) {
    showExitModal.value = true
    next(false)
  } else {
    next()
  }
})
</script>