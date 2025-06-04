<template>
  <div class="relative w-full min-w-2xs max-w-md">
    <input
      :type="type"
      v-model="model"
      @focus="isFocused = true"
      @blur="onBlur"
      :id="inputId"
      class="peer block w-full appearance-none border rounded-xl px-4 pt-6 pb-2 text-base text-gray-900 placeholder-transparent transition-all focus:outline-none focus:ring-1 focus:ring-yellow-300 focus:border-yellow-300 border-gray-300"
      placeholder="placeholder"
    />

    <label
      :for="inputId"
      class="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-500 uppercase"
    >
      {{ placeholder }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<string | number>()
const { type = 'text', placeholder = 'Escribe'} = defineProps<{
  type?: 'text' | 'email' | 'number'
  placeholder?: string
}>()

const inputId = `input-${Math.random().toString(36).substring(2, 9)}`
const isFocused = ref(false)

function onBlur(e: FocusEvent) {
  const value = (e.target as HTMLInputElement).value
  isFocused.value = !!value
}
</script>
