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
  DICTIONARY_DESCRIPTION,
  FEEDBACK,
  FEEDBACK_DESCRIPTION
 } from '../../constants/language'
 import { FeedbackModal } from '../modals/FeedbackModal'
import { TabModals } from '../modals/TabModals'
import { FooterModal } from '../modals/FooterModal'
import { TabsData } from '../../constants/strings'
type Props = {
  isOpen: boolean
  handleClose: () => void
  isEasyMode: boolean
  handleEasyMode: Function
  isDarkMode: boolean
  handleDarkMode: Function
  isDictionaryMode: boolean
  handleDictionaryMode: Function
  handleuyireMeiMode: Function
  isuyireMeiMode: boolean
}

export const SettingsModal = ({
  isOpen,
  handleClose,
  isEasyMode,
  handleEasyMode,
  isDarkMode,
  handleDarkMode,
  isDictionaryMode,
  handleDictionaryMode,
  isuyireMeiMode,
  handleuyireMeiMode
}: Props) => {
  return (
    <BaseModal title={SETTINGS_NAME} isOpen={isOpen} handleClose={handleClose}>
      <div className="mt-2 flex flex-col divide-y">
        <div className="tabmodal-status">
          < TabModals 
          dataName = {TabsData}
          />
        </div>
        <div className="uyiremei-status">
          <SettingsToggle
            uyiremeisettingName={UYIRE_MEI_NOTES}
            flag={isuyireMeiMode}
            handleFlag={handleuyireMeiMode}
            description={UYIRE_MEI_DESCRIPTION}
          />
        </div>

        <SettingsToggle
          settingName={EASY_MODE}
          flag={isEasyMode}
          handleFlag={handleEasyMode}
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
          flag={isDictionaryMode}
          handleFlag={handleDictionaryMode}
          description={DICTIONARY_DESCRIPTION}
        />
        <FeedbackModal
          feedbackDescription={FEEDBACK}
          feedbackDescriptiontwo={FEEDBACK_DESCRIPTION}
        />
        <hr />
        <FooterModal />
      </div>
    </BaseModal>
  )
}
