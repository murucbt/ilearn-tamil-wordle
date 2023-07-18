import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import IlearnTamilLogo from '../../learn-tamil-logo.png'
import IlearnTamilLMobileogo from '../../learn-tamil-mobile.png'
import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/language'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  return (
    <div className="">
      <div className="navbar">
        <div className="container-fluid w-90">
          <header>
        <div className="navbar-content px-5 tamil-logo">
          <div className='logos-assemble'>
            <a href='/#'>
            <img src={IlearnTamilLogo} className="App-logo desktop-logo" alt="logo" />
            </a>
            <a href='/#'><img src={IlearnTamilLMobileogo} className="App-logo mobile-logo" alt="logo" />
            </a>
          </div>
        <div className='tester'>
          <p className="text-xl font-bold dark:text-white title-pos">{GAME_TITLE}</p>
          
        </div>
          
          <div className="right-icons">
            <a href="https://ilearntamil.com/" target="_blank" rel="noreferrer"><HomeIcon 
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            /></a>
            <ChartBarIcon
              className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsStatsModalOpen(true)}
            />
            <CogIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsSettingsModalOpen(true)}
            />
            <div className="flex">
            <InformationCircleIcon
              className="h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsInfoModalOpen(true)}
            />
            {ENABLE_ARCHIVED_GAMES && (
              <CalendarIcon
                className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
                onClick={() => setIsDatePickerModalOpen(true)}
              />
            )}
          </div>
          </div>
        </div>
        </header>
        </div>
      </div>
      <p className="daily-word-txt">(சொல்லாட்டம் - தினம் ஒரு சொல்)</p>
    </div>
  )
}
