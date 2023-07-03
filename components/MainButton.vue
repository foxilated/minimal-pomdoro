<script setup lang="ts">
interface props {
  small?: boolean
  icon?: string
}

const props = defineProps<props>()

function beep() {
  const audio = new Audio('/click.mp3')
  audio.play()
}
</script>
<template>
  <button
    class="rounded-full duration-300 ring-2 bg-background text-onBackground hover:text-background hover:bg-onBackground ring-onBackground text-base flex items-center justify-center gap-1"
    :style="{
      fontSize: '1.125rem',
      padding: '1rem'
    }"
    @click="beep">
    <Icon
      size="32"
      :name="props.icon"
      v-if="props.icon" />
  </button>
</template>
