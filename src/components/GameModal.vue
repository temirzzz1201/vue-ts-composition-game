<script setup lang="ts">
import { ref } from 'vue'
import type { GameStatus } from '../types/GameStatus'

interface Props {
  word: string
}

defineProps<Props>()


const isVisible = ref(false)
const gameStatus = ref<GameStatus | null>(null)

const open = (status: GameStatus) => {
  gameStatus.value = status
  isVisible.value = true
}

const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})

const emit = defineEmits<{
  (e: 'restart', id: number): void
}>()

</script>

<template>
  <!-- Container for final message -->
  <div v-show="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <h2 v-else>Вы проиграли. 😕</h2>
      <h3>...имя: {{ word.toUpperCase() }}</h3>
      <button @click="emit('restart', 3)">Сыграть еще раз</button>
    </div>
  </div>
</template>

