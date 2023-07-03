<script setup lang="ts">
import { useWebNotification } from '@vueuse/core'
import type { UseWebNotificationOptions } from '@vueuse/core'

const time = ref<string>('25:00')

useSeoMeta({
  title: computed(() => time.value + ' - Khaled - Focus'),
  ogTitle: 'Khaled - Focus',
  description: `A Pomodoro timer to track my study sessions.`,
  ogDescription: `A Pomodoro timer to track my study sessions.`
})

const startingTime = ref<string>('25:00')

const interval = ref<NodeJS.Timeout | null>(null)

const isCounting = ref<boolean>(false)

function start() {
  if (isCounting.value) return
  isCounting.value = true

  if (time.value === '00:00') {
    time.value = startingTime.value
  }

  interval.value = setInterval(() => {
    const [minutes, seconds] = time.value.split(':').map(Number)

    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(interval.value!)
        isCounting.value = false
        return
      }

      time.value = `${minutes > 10 ? minutes - 1 : '0' + (minutes - 1)}:59`
      return
    }

    time.value = `${minutes > 10 ? minutes : '0' + minutes}:${
      seconds > 10 ? seconds - 1 : '0' + (seconds - 1)
    }`
  }, 1000)
}

function pause() {
  if (!isCounting.value) return
  isCounting.value = false

  clearInterval(interval.value!)
}

function restart() {
  isCounting.value = false

  clearInterval(interval.value!)
  time.value = startingTime.value
}

watch(
  () => time.value,
  (val) => {
    if (val === '00:00') {
      new Audio('/finish.mp3').play()
      if (isSupported) {
        show()
      }
    }
  }
)
const mode = ref('focus')

const times = ref<string[]>([
  { name: 'focus', duration: '25:00' },
  { name: 'shortBreak', duration: '05:00' },
  { name: 'longBreak', duration: '15:00' }
])

const options: UseWebNotificationOptions = {
  title: mode.value === 'focus' ? 'Take a break.' : 'Time to focus.',
  dir: 'auto',
  lang: 'en',
  renotify: true,
  tag: 'test'
}
const { isSupported, show } = useWebNotification(options)
</script>
<template>
  <main
    :class="{
      'bg-primary': mode === 'shortBreak' || mode === 'longBreak',
      'bg-background': mode === 'focus'
    }"
    class="flex flex-col items-center justify-center h-screen duration-500 relative overflow-hidden">
    <div class="flex gap-8 absolute -translate-y-28">
      <button
        v-for="(item, index) in times"
        :key="item.duration"
        :class="{
          'text-primary font-bold': mode === item.name && item.name === 'focus',
          'text-background font-bold': mode === item.name && item.name !== 'focus'
        }"
        class="text-2xl"
        @click="
          ;(startingTime = item.duration), (time = item.duration), (mode = item.name), pause()
        ">
        {{ item.duration.slice(0, 2) }}
      </button>
    </div>
    <Transition name="numerate">
      <h1
        class="text-[8rem] font-bold leading-none absolute"
        :key="time">
        {{ time }}
      </h1>
    </Transition>
    <TransitionGroup
      tag="ul"
      class="flex items-center justify-center gap-8 absolute translate-y-32"
      name="fade">
      <MainButton
        icon="ph-play-duotone"
        v-if="!isCounting"
        @click="start" />
      <MainButton
        icon="ph-pause-duotone"
        v-if="isCounting"
        @click="pause" />
      <MainButton
        icon="ph-arrow-counter-clockwise-duotone"
        v-if="!isCounting && time !== startingTime"
        @click="restart" />
    </TransitionGroup>
  </main>
</template>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 700ms cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(60vh);
}

.fade-leave-active {
  position: absolute;
}

.numerate-enter-active,
.numerate-leave-active {
  transition: all 500ms cubic-bezier(0.55, 0, 0.1, 1);
}

.numerate-enter-from,
.numerate-leave-to {
  opacity: 0;
}
</style>
