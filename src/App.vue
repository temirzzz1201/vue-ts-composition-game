<script setup lang="ts">
import GameHeader from './components/GameHeader.vue'
import GameFigure from './components/GameFigure.vue'
import GameWrongLetters from './components/GameWrongLetters.vue'
import GameModal from './components/GameModal.vue'
import GameFooter from './components/GameFooter.vue'
import GameWord from './components/GameWord.vue'
import { computed, ref, watch } from 'vue'
import { useRandomWord } from './composibles/useRandomWords'
import { useLetters } from './composibles/useLetters'
import { useNotification } from './composibles/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetters, wrongLetters, isLose, isWin, addLetters, resetLetters } = useLetters(word)
const { notification, showNotification } = useNotification()

const wrongLettersCount = computed(() => wrongLetters.value.length)
const popup = ref<InstanceType<typeof GameModal> | null>(null)

const restartHelper = async () => {
  console.log('restart');
  await getRandomWord()
  resetLetters()
  popup.value?.close()
}

window.addEventListener('keypress', ({ key }) => {
  if(isLose.value || isWin.value) return

  if(letters.value.includes(key)) {
    showNotification()
    return
  }

  addLetters(key)
})

watch(wrongLettersCount, () => {
  if(isLose.value) popup.value?.open('lose')
})

watch(correctLetters, () => {
  if(isWin.value) popup.value?.open('win')
})

</script>

<template>
  <div id="app">
    <game-header />
    <div class="game-container">
      <game-figure :wrong-letters-count="wrongLettersCount" />
      <game-wrong-letters :wrong-letters="wrongLetters" />
      <game-word :word="word" :correct-letters="correctLetters" />
    </div>
    <game-modal :word="word" @restart="restartHelper" ref="popup" />
    <game-footer  ref="notification" />
  </div>
</template>



