<template>
  <button
    class="bg-primary text-white font-primary font-[500] min-h-[48px] py-1 px-4 md:px-12 rounded-[100px] cursor-pointer transition-colors md:hover:bg-primary-hover"
    :class="{ 'opacity-50 cursor-not-allowed': disabled, '!bg-white !text-black border border-solid border-gray-400 hover:!bg-gray-100 transition-colors': color === 'secondary' }"
    :disabled="disabled"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  disabled?: boolean;
  color?: 'primary' | 'secondary';
}
const { label, disabled, color = 'primary' } = defineProps<Props>()
const emit = defineEmits(['click'])


</script>