<template>
  <div class="grid place-items-center h-screen text-white bg-black">
    <div class="text-center">
      <div class="flex justify-center mb-6">
        <Logo class="text-primary w-60" :fontControlled="false"  />
      </div>
      <p class="text-lg mb-8">Cristian García Peirón</p>
      <nuxt-link to="/nuevo-plan" class="text-blue-500 hover:underline">
        <DButton label="Calcular mi precio"/>
      </nuxt-link>
      <div class="flex items-center justify-center mt-8 gap-12">
        <DButton label="Acceder con test A" @click="accessWithVariant('A')"/>
        <DButton label="Acceder con test B" @click="accessWithVariant('B')"/>
      </div>
      <DButton label="Limpiar datos" color="secondary" class="mt-12" @click="cleanData"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { usePlanStore } from '@/store/planStore';
import { analytics } from '@/services/analytics';

import Logo from '~/assets/img/logo.svg';

const planStore = usePlanStore();
const router = useRouter();

const { logTestAB } = analytics;

function cleanData() {
  localStorage.removeItem('plan');
  planStore.cleanData();
  alert('Datos limpiados');
}

function accessWithVariant(variant: string) {
  planStore.forceTestABVariant(variant);
  logTestAB(variant);
  alert(`Accediendo con test ${variant}`);
  router.push('/nuevo-plan');
}
</script>