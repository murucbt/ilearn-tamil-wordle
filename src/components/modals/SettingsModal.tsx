import { BaseModal } from './BaseModal'
import { SettingsToggle } from './SettingsToggle'
import { 
  SETTINGS_NAME,
  UYIRE_MEI_NOTES,
  UYIRE_MEI_DESCRIPTION,
  EASY_MODE,
  EASY_MODE_DESCRIPTION,
  EASY_MODE_DESCRIPTION_TWO,
  DARK_MODE,
  DARK_MODE_DESCRIPTION,
  DICTIONARY,
  DICTIONARY_DESCRIPTION
 } from '../../constants/language'
import { TabModals } from '../modals/TabModals'
import { TabsData } from '../../constants/strings'
type Props = {
  isOpen: boolean
  handleClose: () => void
  isHardMode: boolean
  handleHardMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isHighContrastMode: boolean
  handleHighContrastMode: Function
  handleuyireMeiMode: Function
  isuyireMeiMode: boolean
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isHardMode,
  handleHardMode,
  isDarkMode,
  handleDarkMode,
  isHighContrastMode,
  handleHighContrastMode,
  isuyireMeiMode,
  handleuyireMeiMode
}: Props) => {
  return (
    <BaseModal title={SETTINGS_NAME} isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <div className="">
          < TabModals 
          dataName = {TabsData}
          />
        </div>
        <SettingsToggle
          settingName={UYIRE_MEI_NOTES}
          flag={isuyireMeiMode}
          handleFlag={handleuyireMeiMode}
          description={UYIRE_MEI_DESCRIPTION}
        />
        <SettingsToggle
          settingName={EASY_MODE}
          flag={isHardMode}
          handleFlag={handleHardMode}
          description={EASY_MODE_DESCRIPTION}
          descriptiontwo={EASY_MODE_DESCRIPTION_TWO}
        />
        <SettingsToggle
          settingName={DARK_MODE}
          flag={isDarkMode}
          handleFlag={handleDarkMode}
          description={DARK_MODE_DESCRIPTION}
        />
        <SettingsToggle
          settingName={DICTIONARY}
          flag={isHighContrastMode}
          handleFlag={handleHighContrastMode}
          description={DICTIONARY_DESCRIPTION}
        />
      </div>
    </BaseModal>
  )
}
