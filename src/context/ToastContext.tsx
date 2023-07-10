import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
  } from 'react'
  
  import { TOAST_TIME_MS } from '../constants/settings'
  
  type AlertStatus = 'success' | 'error' | undefined
  
  type ShowOptions = {
    persist?: boolean
    delayMs?: number
    durationMs?: number
    onClose?: () => void
  }
  
  type ToastContextValue = {
    status: AlertStatus
    message: string | null
    isVisible: boolean
    showSuccessToast: (message: string, options?: ShowOptions) => void
    showErrorToast: (message: string, options?: ShowOptions) => void
    setIsVisible: (isVisible: boolean) => void
  
  }
  
  export const ToastContext = createContext<ToastContextValue | null>({
    status: 'success',
    message: null,
    isVisible: false,
    showSuccessToast: () => null,
    showErrorToast: () => null,
    setIsVisible:() => null
  })
  ToastContext.displayName = 'ToastContext'
  
  export const useToast = () => useContext(ToastContext) as ToastContextValue
  
  type Props = {
    children?: ReactNode
  }
  
  export const ToastProvider = ({ children }: Props) => {
    const [status, setStatus] = useState<AlertStatus>('success')
    const [message, setMessage] = useState<string | null>(null)
    const [isVisible, setIsVisible] = useState(false)
  
    const show = useCallback(
      (showStatus: AlertStatus, newMessage: string, options?: ShowOptions) => {
        const {
          delayMs = 0,
          persist,
          onClose,
          durationMs = TOAST_TIME_MS,
        } = options || {}
  
        setTimeout(() => {
          setStatus(showStatus)
          setMessage(newMessage)
          setIsVisible(true)
  
          if (!persist) {
            setTimeout(() => {
              setIsVisible(false)
              if (onClose) {
                onClose()
              }
            }, durationMs)
          }
        }, delayMs)
      },
      [setStatus, setMessage, setIsVisible]
    )
  
    const showErrorToast = useCallback(
      (newMessage: string, options?: ShowOptions) => {
        show('error', newMessage, options)
      },
      [show]
    )
  
    const showSuccessToast = useCallback(
      (newMessage: string, options?: ShowOptions) => {
        show('success', newMessage, options)
      },
      [show]
    )
  
    return (
      <ToastContext.Provider
        value={{
          status,
          message,
          isVisible,
          showErrorToast,
          showSuccessToast,
          setIsVisible,
        }}
      >
        {children}
      </ToastContext.Provider>
    )
  }
  