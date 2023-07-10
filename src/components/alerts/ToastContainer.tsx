import { useToast } from '../../context/ToastContext'
import { Toast } from './Toast'

export const ToastContainer = () => {
  const { message, status, isVisible } = useToast()

  return <Toast isOpen={isVisible} message={message || ''} variant={status} />
}
