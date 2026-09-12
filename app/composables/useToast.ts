import { ref } from 'vue'

export interface ToastItem {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  message?: string
  duration?: number
}

const toasts = ref<ToastItem[]>([])

export const useToast = () => {
  const show = (toast: Omit<ToastItem, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast: ToastItem = {
      id,
      duration: 3500,
      ...toast
    }
    toasts.value.push(newToast)

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        remove(id)
      }, newToast.duration)
    }
  }

  const success = (title: string, message?: string) => {
    show({ type: 'success', title, message })
  }

  const error = (title: string, message?: string) => {
    show({ type: 'error', title, message, duration: 5000 })
  }

  const info = (title: string, message?: string) => {
    show({ type: 'info', title, message })
  }

  const remove = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    show,
    success,
    error,
    info,
    remove
  }
}
