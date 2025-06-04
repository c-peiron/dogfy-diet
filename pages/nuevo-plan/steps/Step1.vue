<template>
  <div v-if="!isFetchingBreeds">
    <div class="bg-tag rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
      <img src="/assets/img/🔍.png" alt="Icono de perro" class="w-12 h-12" />
    </div>
    <p class="text-xl text-center mb-4">¿Cuál es la raza de tu perrete?</p>
    <AutocompleteSelect
      v-model="form.name_dog"
      :options="breeds"
      placeholder="Busca o escribe su raza 🐶"
    />
  </div>
  <div v-else class="flex items-center justify-center h-full">
    <p class="text-gray-500">Cargando razas...</p>
  </div>
</template>

<script setup lang="ts">
  import { reactive, watchEffect, computed, inject, onMounted } from 'vue'
  import { usePlanStore } from '@/store/planStore'

  import { GetAllBreeds } from '@/business/application/use-cases/GetAllBreeds'
  import { FakeBreedRepository } from '@/business/infrastructure/api/repositories/FakeBreedRepository'

  const planStore = usePlanStore()
  const registerValidation = inject('registerValidation') as ((step: number, isValid: { value: boolean }) => void)

  const form = reactive({ ...planStore.stepsData.step1 })
  const breeds = ref<string[]>([])
  const isFetchingBreeds = ref(false)

  watchEffect(() => {
    planStore.stepsData.step1 = { ...form }
  })

  const isValid = computed(() => form.name_dog.length > 0)

  onMounted(async () => {
    isFetchingBreeds.value = true
    const repo = new FakeBreedRepository()
    const useCase = new GetAllBreeds(repo)
    const result = await useCase.execute()
    breeds.value = result.map(breed => breed.name)
    isFetchingBreeds.value = false
    registerValidation(1, isValid)
  })
</script>