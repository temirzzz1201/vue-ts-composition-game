import { ref, computed, type Ref } from 'vue'
// import { useRandomWord } from '../composibles/useRandomWords'
// const { word } = useRandomWord()


export const useLetters = (word: Ref<string>) => {
  const letters = ref<string[]>([])
  const correctLetters = computed(() => letters.value.filter(x => word.value.includes(x)))
  const wrongLetters = computed(() => letters.value.filter(x => !word.value.includes(x)))
  const isLose = computed(() => wrongLetters.value.length === 6) 
  // метод every проверяет каждый символ преобразованного массива word. Далее мы сравниваем эти символы с символами массива correctLetters
  const isWin = computed(() => [...word.value].every(x => correctLetters.value.includes(x)))  
  const addLetters = (key: string) => {
    if(/[а-яА-ЯёЁ]/.test(key)) {
      letters.value.push(key.toLowerCase())
    }
  } 
  const resetLetters = () => {
    letters.value = []
  }

  return {
    letters,
    correctLetters,
    wrongLetters,
    isLose,
    isWin,
    addLetters,
    resetLetters
  }
}