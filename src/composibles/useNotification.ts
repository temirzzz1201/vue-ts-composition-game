import { ref } from "vue"
import GameFooter from '../components/GameFooter.vue'
const notification = ref<InstanceType<typeof GameFooter> | null>(null)


export const useNotification = () => {
  const showNotification = () => {
    notification.value?.open()
    setTimeout(() => {
      notification.value?.close()
    }, 2000)
  }

  return {
    notification,
    showNotification
  }
}