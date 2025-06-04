<template>
  <div class="relative w-full min-w-2xs max-w-md">
    <div
      class="flex items-center justify-between border rounded-xl px-4 py-3 transition-colors"
      :class="{
        'border-yellow-300 ring-1 ring-yellow-300': isOpen,
        'border-gray-300': !isOpen,
      }"
      @click="openDropdown"
    >
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        @focus="onFocus"
        @blur="onBlur"
        @input="filterOptions"
        class="w-full text-base bg-transparent outline-none"
        ref="inputField"
      />

      <svg
        class="w-5 h-5 text-gray-500 ml-2 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <ul
      v-if="isOpen"
      class="absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-lg"
    >
      <li
        v-for="option in filteredOptions"
        :key="option"
        @mousedown.prevent="selectOption(option)"
        class="px-4 py-2 text-base hover:bg-gray-100 cursor-pointer"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const model = defineModel<string>()
const { options, placeholder = 'Buscar'} = defineProps<{
  options: string[]
  placeholder?: string
}>()

const inputField = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const inputValue = ref('')
const filteredOptions = ref<string[]>([...options])
const hasSelected = ref(false)

watch(model, (newVal) => {
  if (!isOpen.value) {
    inputValue.value = newVal || ''
    hasSelected.value = !!newVal
  }
}, { immediate: true })

function onFocus() {
  if (hasSelected.value) {
    inputValue.value = ''
  }
  openDropdown()
}

function onBlur() {
  setTimeout(() => {
    isOpen.value = false
    if (!inputValue.value && hasSelected.value && model.value) {
      inputValue.value = model.value
    }
  }, 100)
}

function openDropdown() {
  isOpen.value = true
  filterOptions()
}

function filterOptions() {
  const term = inputValue.value.toLowerCase()
  filteredOptions.value = options.filter((option) =>
    option.toLowerCase().includes(term)
  )
}

function selectOption(option: string) {
  model.value = option
  inputValue.value = option
  hasSelected.value = true
  isOpen.value = false
  inputField.value?.blur()
}
</script>