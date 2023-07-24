export const GAME_TITLE = '#நவில்'
export const EASY_MODE_TITLE = '*எளிய முறையில்*'
export const WIN_MESSAGES = ['வாழ்த்துக்கள்!', 'அருமை', 'நன்றாக முடிந்தது!']
export const GAME_COPIED_MESSAGE = 'விளையாட்டு கிளிப்போர்டு நகலெடுக்கப்பட்டது'
export const NOT_ENOUGH_LETTERS_MESSAGE = 'கட்டங்களை முழுமையாக நிரப்புக'
export const WORD_NOT_FOUND_MESSAGE = 'சொல் அகராதியில் இல்லை'
export const HARD_MODE_ALERT_MESSAGE =
  'Hard Mode can be enabled only at the start!'
export const HARD_MODE_DESCRIPTION =
  'Any revealed hints must be used in subsequent guesses'
export const HIGH_CONTRAST_MODE_DESCRIPTION = 'For improved color vision'
export const CORRECT_WORD_MESSAGE = (solution: string) =>
  `${solution}`
export const WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
  `Must use ${guess} in position ${position}`
export const NOT_CONTAINED_MESSAGE = (letter: string) =>
  `Guess must contain ${letter}`
export const ENTER_TEXT = 'Enter'
export const DELETE_TEXT = 'Delete'
export const STATISTICS_TITLE = 'புள்ளி விவரங்கள்'
export const CONGRATS_TITLE = 'வாழ்த்துக்கள்!!'
export const GUESS_DISTRIBUTION_TEXT = 'கணிப்பு பங்கீடு'
export const NEW_WORD_TEXT = 'புதிய சொல்'
export const OLD_WORD_TEXT = 'முந்தைய சொல்'
export const MEANING_WORD_TEXT = 'பொருள் :'
export const SHARE_TEXT = 'பகிர்'
export const SHARE_FAILURE_TEXT =
  'Unable to share the results. This feature is available only in secure contexts (HTTPS), in some or all supporting browsers.'
export const MIGRATE_BUTTON_TEXT = 'Transfer'
export const MIGRATE_DESCRIPTION_TEXT =
  'Click here to transfer your statistics to a new device.'
export const TOTAL_TRIES_TEXT = 'ஆடியது'
export const SUCCESS_RATE_TEXT = 'வாகை'
export const CURRENT_STREAK_TEXT = 'நடப்பு வாகை நீட்சி'
export const BEST_STREAK_TEXT = 'உச்ச வாகை நீட்சி'
export const AVERAGE_TEXT = 'சராசரி கணிப்பு'
export const DISCOURAGE_INAPP_BROWSER_TEXT =
  "You are using an embedded browser and may experience problems sharing or saving your results. We encourage you rather to use your device's default browser."

export const DATEPICKER_TITLE = 'Choose a past date'
export const DATEPICKER_CHOOSE_TEXT = 'Choose'
export const DATEPICKER_TODAY_TEXT = 'today'
export const ARCHIVE_GAMEDATE_TEXT = 'Game date'

export const TabsData = [
  {id : '1',
   tabTitle: "பொதுத்தமிழ்",
   tabContent: 'பொது பயன்பாட்டில் உள்ள சொற்கள் மட்டும்'
  },
  {id : '2',
   tabTitle: "இலக்கியத்தமிழ்",
   tabContent: 'இலக்கிய நூல்களில் இடம்பெறும் சொற்கள்'
  }
]
