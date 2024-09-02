import { ref, onMounted } from 'vue'
import { getRandomName } from '../api/getRandomName'

export const useRandomWord = () => {
  const word = ref('')
  const getRandomWord = async () => {
    try {
      word.value = await getRandomName()
      console.log(word.value);
    } catch (error) {
      console.log(error);
      word.value = ''
    }
  }

  onMounted(() => {
    getRandomWord()
  })

  return {
    word,
    getRandomWord
  }
}



