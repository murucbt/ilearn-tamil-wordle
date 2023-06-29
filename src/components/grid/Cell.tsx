import classnames from 'classnames'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'
import { CharStatus } from '../../lib/statuses'
import { useAlert } from '../../context/AlertContext'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } = useAlert()

  const classes = classnames(
    'xxshort:w-11 xxshort:h-11 short:text-2xl short:w-12 short:h-12 w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent text-white absentma-back':
        status === 'absent',
      'text-white rachange-back':
        status === 'darklightGreen',
      'text-white kachange-back':
        status === 'yellowGreen',
      'text-white RAchange-back':
        status === 'greenStar',
      'text-white kuchange-back':
        status === 'heart',
      'text-white uyiremei-back':
        status === 'heart',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-700 text-white':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  type ClickHandler = (status: any) => (e: React.MouseEvent) => void;

  const onClick: ClickHandler = (status) => (e) => {
    e.preventDefault();
    let statusText = ''
    if (status) {
      if (status === 'absent')
      {
        statusText = 'எழுத்து சொல்லில் எங்கும் இடம்பெறவில்லை.'
      }else if (status === 'heart') {
        statusText = 'உயிர் எழுத்தோ அல்லது மெய் எழுத்தோ பொருந்தி இருப்பதை குறிக்கும்'
      }else if (status === 'present') {
        statusText = 'எழுத்து சொல்லில் உள்ளது ஆனால் வேறு இடத்தில் உள்ளது.'
      }else if (status === 'correct') {
        statusText = 'எழுத்து சொல்லின் சரியான இடத்தில் உள்ளது.'
      }else if (status === 'darklightGreen') {
        statusText = 'எழுத்து சொல்லில் இடம்பெறவில்லை தவிர வரிசையில் வேறு ஏதோ எழுத்து இதே இடத்தில் இடம்பெற்றுள்ளது.'
      }else if (status === 'yellowGreen') {
        statusText = 'எழுத்து சொல்லில் இடம்பெறவில்லை தவிர வரிசையில் வேறு ஏதோ எழுத்து வேறு இடத்தில் இடம்பெற்றுள்ளது.'
      }else if (status === 'greenStar') {
        statusText = 'எழுத்து சொல்லில் வேறு இடத்தில் உள்ளது, அதோடு எழுத்து உள்ள இடத்தில் வேறு இதே எழுத்து வரிசையும் இடம்பெற்றுள்ளது.'
      }
      console.log('status..', status)
      showSuccessAlert(statusText);
    }
 };


  return (
    <div className={classes} style={{ animationDelay }} onClick={onClick(status)}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
