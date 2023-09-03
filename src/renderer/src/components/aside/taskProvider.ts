import { Task } from '@/hooks/useTask'
import { ref } from 'vue'

const shareItem = ref<Task | null>(null)

export const setShareItem = (e: Task) => {
    shareItem.value = e
}
export const getShareItem = () => shareItem