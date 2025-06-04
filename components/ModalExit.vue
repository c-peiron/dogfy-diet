<template>
  <div class="fixed inset-0 bg-modal-background flex justify-center items-center p-4">
    <div class="bg-white p-12 rounded-xl shadow relative w-max max-w-2xl">
      <button class="absolute top-2 right-2 text-gray-500 transition-colors cursor-pointer hover:text-primary" @click="$emit('cancel')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex flex-col items-center gap-4 text-center">
        <DogModal class="w-22" :filled="true" :fontControlled="false" />
        <p class="text-lg text-black">¿Seguro que quieres marcharte?</p>
        <p class="text-base text-black">Queda muy poquito para que tu perro empiece a disfrutar de su comida como nunca.</p>
      </div>
      <div class="mt-4 grid grid-cols-2 gap-4">
        <DButton label="Quedarme" @click="$emit('cancel')" :color="'secondary'"/>
        <DButton label="Salir" @click="$emit('confirm')"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DogModal from '~/assets/img/dog-modal.svg';
</script>