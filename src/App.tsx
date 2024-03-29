import './App.css'

import { ClockIcon } from '@heroicons/react/outline'
import { format } from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { useEffect, useState } from 'react'
import Div100vh from 'react-div-100vh'

import { AlertContainer } from './components/alerts/AlertContainer'
import { ToastContainer } from './components/alerts/ToastContainer'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { DatePickerModal } from './components/modals/DatePickerModal'
import { InfoModal } from './components/modals/InfoModal'
import { MigrateStatsModal } from './components/modals/MigrateStatsModal'
import { SettingsModal } from './components/modals/SettingsModal'
import { StatsModal } from './components/modals/StatsModal'
import { Navbar } from './components/navbar/Navbar'
import {
  DATE_LOCALE,
  DISCOURAGE_INAPP_BROWSERS,
  LONG_ALERT_TIME_MS,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  WELCOME_INFO_MODAL_MS,
} from './constants/settings'
import {
  CORRECT_WORD_MESSAGE,
  DISCOURAGE_INAPP_BROWSER_TEXT,
  GAME_COPIED_MESSAGE,
  NOT_ENOUGH_LETTERS_MESSAGE,
  SHARE_FAILURE_TEXT,
  WIN_MESSAGES,
  WORD_NOT_FOUND_MESSAGE,
} from './constants/strings'
import { useAlert } from './context/AlertContext'
import { isInAppBrowser } from './lib/browser'
import {
  getStoredIsHighContrastMode,
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
  setStoredIsHighContrastMode,
} from './lib/localStorage'
import { addStatsForCompletedGame, loadStats } from './lib/stats'
import {
  findFirstUnusedReveal,
  getGameDate,
  getIsLatestGame,
  isWinningWord,
  isWordInWordList,
  setGameDate,
  solution,
  solutionGameDate,
  unicodeLength,
  previousdayWord,
} from './lib/words'
import { getMeiwordEasyStatus } from '../src/lib/statuses'
import { unicodeSplit } from '../src/lib/words'
import { uyireMeiCombo, meiEluththukkal } from './constants/tamilwords'
import { WiningModal } from './components/modals/WiningModal'

function App() {
  const isLatestGame = getIsLatestGame()
  const gameDate = getGameDate()
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches

  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  const [isWiningModalOpen, setIsWiningModalOpen] = useState(false)
  const [isDatePickerModalOpen, setIsDatePickerModalOpen] = useState(false)
  const [isMigrateStatsModalOpen, setIsMigrateStatsModalOpen] = useState(false)
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme')
      ? localStorage.getItem('theme') === 'dark'
      : prefersDarkMode
      ? true
      : false
  )
  const [isHighContrastMode, setIsHighContrastMode] = useState(
    getStoredIsHighContrastMode()
  )
  const uyirEluthukalArray = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ']
  const uyiremeiEluthukalArray = ['க', 'ச', 'ட', 'த', 'ப', 'ற', 'ங', 'ஞ', 'ண', 'ந', 'ம','ன', 'ய', 'ர', 'ல', 'வ', 'ழ','ள']
  const [isRevealing, setIsRevealing] = useState(false)
  const [guesses, setGuesses] = useState<string[]>(() => {
  const loaded = loadGameStateFromLocalStorage(isLatestGame)
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      })
    }
    return loaded.guesses
  })
  const [stats, setStats] = useState(() => loadStats())
  const [isuyireMeiMode, setisuyireMeiMode] = useState(true)
  const [isDictionaryMode, setisDictionaryMode] = useState(
    localStorage.getItem('dictionaryMode')
    ? localStorage.getItem('dictionaryMode') === 'yes'
    : false
  )

  const [isHardMode, setIsHardMode] = useState(
    localStorage.getItem('gameMode')
      ? localStorage.getItem('gameMode') === 'hard'
      : false
  )
  
  const [isEasyMode, setisEasyMode] = useState(
    localStorage.getItem('easyMode')
      ? localStorage.getItem('easyMode') === 'yes'
      : false
  )

  useEffect(() => {
    // if no game state on load,
    // show the user the how-to info modal
    if (!loadGameStateFromLocalStorage(true)) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  })

  useEffect(() => {
    DISCOURAGE_INAPP_BROWSERS &&
      isInAppBrowser() &&
      showErrorAlert(DISCOURAGE_INAPP_BROWSER_TEXT, {
        persist: false,
        durationMs: 7000,
      })
  }, [showErrorAlert])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isHighContrastMode) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [isDarkMode, isHighContrastMode])

  const handleDarkMode = (isDark: boolean) => {
    setIsDarkMode(isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const handleHardMode = (isHard: boolean) => {
      setIsHardMode(isHard)
  }

  const handleEasyMode = (isEasy: boolean) => {
    setisEasyMode(isEasy)
    localStorage.setItem('easyMode', isEasy ? 'yes' : 'no')
  }

  const handleuyireMeiMode = (isUyireMei: boolean) => {
    setisuyireMeiMode(isUyireMei)
    localStorage.setItem('uyiremeiMode', isUyireMei ? 'yes' : 'yes')
  }

  const handleDictionaryMode = (isDictionaryMode: boolean) => {
    setisDictionaryMode(isDictionaryMode)
    localStorage.setItem('dictionaryMode', isDictionaryMode ? 'yes' : 'no')
  }
  
  const handleHighContrastMode = (isHighContrast: boolean) => {
    setIsHighContrastMode(isHighContrast)
    setStoredIsHighContrastMode(isHighContrast)
  }

  const clearCurrentRowClass = () => {
    setCurrentRowClass('')
  }

  useEffect(() => {
    saveGameStateToLocalStorage(getIsLatestGame(), { guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * unicodeLength(solution)

      showSuccessAlert(winMessage, {
        delayMs,
        onClose: () => setIsWiningModalOpen(true),
      })
    }

    if (isGameLost) {
      setTimeout(() => {
        setIsWiningModalOpen(true)
      }, (unicodeLength(solution) + 1) * REVEAL_TIME_MS)
    }
  }, [isGameWon, isGameLost, showSuccessAlert])

  const updateLastValue = (newValue : string) => {
    setCurrentGuess(prevString => {
      const newString = prevString.slice(0, -1) + newValue;
      return newString;
    });
  };
  const onChar = (value: string) => {
    if (unicodeLength(`${currentGuess}`) === unicodeLength(solution) && !uyiremeiEluthukalArray.includes(value) && !uyirEluthukalArray.includes(value)) {
      updateLastValue(value)
    }
    if (
      unicodeLength(`${currentGuess}${value}`) <= unicodeLength(solution) &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      if (uyirEluthukalArray.includes(value)){
        setCurrentGuess(`${currentGuess}${value}`)
      }
      if (uyiremeiEluthukalArray.includes(value)){
        setCurrentGuess(`${currentGuess}${value}`)
      } else {
        updateLastValue(value)
      }
      
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const getMeiLetterFromGivenLetter = (letter:any) => {
    let meiLetterFromGivenLetter = '';
    const letterCombo = uyireMeiCombo[letter] || [letter];
    if (letterCombo.length === 1 && meiEluththukkal.includes(letter)) {
      meiLetterFromGivenLetter = letter;
    }
    if (letterCombo.length > 1) {
      meiLetterFromGivenLetter = letterCombo.filter((individualLetter: any) => meiEluththukkal.includes(individualLetter))[0];
    }

    return meiLetterFromGivenLetter
  }  

  const onEnter = () => {
    let finalCurrentGuess = currentGuess
    if (isGameWon || isGameLost) {
      return
    }

    if ((unicodeLength(currentGuess) !== unicodeLength(solution))) {
      setCurrentRowClass('jiggle')
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearCurrentRowClass,
      })
    }
    if (isDictionaryMode === false) { 
        if (!isWordInWordList(currentGuess)) {
          setCurrentRowClass('jiggle')
          return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
            onClose: clearCurrentRowClass,
          })
        }
    }

    if (isEasyMode) {
      const splitSolution = unicodeSplit(solution)
      const splitGuess = unicodeSplit(currentGuess)

      let newGuessWordInEasyMode = splitGuess;

      splitGuess.forEach((letter, i) => {
        if (
          letter !== splitSolution[i] &&
          getMeiLetterFromGivenLetter(letter) === getMeiLetterFromGivenLetter(splitSolution[i]) &&
          getMeiLetterFromGivenLetter(letter) !== '' &&
          getMeiLetterFromGivenLetter(splitSolution[i]) !== ''
        ) {
          newGuessWordInEasyMode[i] = splitSolution[i];
        }
      })     

      if (currentGuess !== newGuessWordInEasyMode.join('')) {
        finalCurrentGuess = newGuessWordInEasyMode.join('')
        // setCurrentGuess(finalCurrentGuess)
      }
    }    

    // enforce hard mode - all guesses must contain all previously revealed letters
    if (isHardMode) {
      const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
      if (firstMissingReveal) {
        setCurrentRowClass('jiggle')
        return showErrorAlert(firstMissingReveal, {
          onClose: clearCurrentRowClass,
        })
      }
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * unicodeLength(solution))

    const winningWord = isWinningWord(currentGuess)

    if (
      unicodeLength(currentGuess) === unicodeLength(solution) &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      if (currentGuess !== finalCurrentGuess) {
        setGuesses([...guesses, finalCurrentGuess])
      } else {
        setGuesses([...guesses, currentGuess])
      }
      setCurrentGuess('')

      if (winningWord) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length))
        }
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        if (isLatestGame) {
          setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        }
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * unicodeLength(solution) + 1,
        })
      }
    }
  }

  return (
    <Div100vh>
      <div className="flex h-full flex-col">
        <Navbar
          setIsInfoModalOpen={setIsInfoModalOpen}
          setIsStatsModalOpen={setIsStatsModalOpen}
          setIsDatePickerModalOpen={setIsDatePickerModalOpen}
          setIsSettingsModalOpen={setIsSettingsModalOpen}
        />

        {!isLatestGame && (
          <div className="flex items-center justify-center">
            <ClockIcon className="h-6 w-6 stroke-gray-600 dark:stroke-gray-300" />
            <p className="text-base text-gray-600 dark:text-gray-300">
              {format(gameDate, 'd MMMM yyyy', { locale: DATE_LOCALE })}
            </p>
          </div>
        )}

        <div className="mx-auto flex w-full grow flex-col px-1 pt-2 pb-8 sm:px-6 md:max-w-7xl lg:px-8 short:pb-2 short:pt-2">
          <div className="flex flex-col justify-center pb-6 short:pb-2 grid-board">
            <Grid
              solution={solution}
              guesses={guesses}
              currentGuess={currentGuess}
              isRevealing={isRevealing}
              currentRowClassName={currentRowClass}
              isUyireMei={isuyireMeiMode}
            />
          </div>
          <Keyboard
            onChar={onChar}
            onDelete={onDelete}
            onEnter={onEnter}
            solution={solution}
            guesses={guesses}
            isRevealing={isRevealing}
            isUyireMei={isuyireMeiMode}
          />
          <InfoModal
            isOpen={isInfoModalOpen}
            handleClose={() => setIsInfoModalOpen(false)}
          />
          <StatsModal
            isOpen={isStatsModalOpen}
            handleClose={() => setIsStatsModalOpen(false)}
            solution={solution}
            previousdayWord={previousdayWord}
            guesses={guesses}
            gameStats={stats}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
            handleShareFailure={() =>
              showErrorAlert(SHARE_FAILURE_TEXT, {
                durationMs: LONG_ALERT_TIME_MS,
              })
            }
            handleMigrateStatsButton={() => {
              setIsStatsModalOpen(false)
              setIsMigrateStatsModalOpen(true)
            }}
            isHardMode={isHardMode}
            isDarkMode={isDarkMode}
            isEasyMode={isEasyMode}
            isHighContrastMode={isHighContrastMode}
            numberOfGuessesMade={guesses.length}
          />
          <WiningModal 
            isOpen={isWiningModalOpen}
            handleClose={() => setIsWiningModalOpen(false)}
            solution={solution}
            guesses={guesses}
            isLatestGame={isLatestGame}
            isGameLost={isGameLost}
            isGameWon={isGameWon}
            handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
            handleShareFailure={() =>
              showErrorAlert(SHARE_FAILURE_TEXT, {
                durationMs: LONG_ALERT_TIME_MS,
              })
              }
            isDarkMode={isDarkMode}
            isEasyMode={isEasyMode}
            isHighContrastMode={isHighContrastMode}
          />

          <DatePickerModal
            isOpen={isDatePickerModalOpen}
            initialDate={solutionGameDate}
            handleSelectDate={(d) => {
              setIsDatePickerModalOpen(false)
              setGameDate(d)
            }}
            handleClose={() => setIsDatePickerModalOpen(false)}
          />
          <MigrateStatsModal
            isOpen={isMigrateStatsModalOpen}
            handleClose={() => setIsMigrateStatsModalOpen(false)}
          />
          <SettingsModal
            isOpen={isSettingsModalOpen}
            handleClose={() => setIsSettingsModalOpen(false)}
            isEasyMode={isEasyMode}
            handleEasyMode={handleEasyMode}
            isDarkMode={isDarkMode}
            handleDarkMode={handleDarkMode}
            isDictionaryMode={isDictionaryMode}
            handleDictionaryMode={handleDictionaryMode}
            isuyireMeiMode={isuyireMeiMode}
            handleuyireMeiMode={handleuyireMeiMode}
          />
          <AlertContainer />
          <ToastContainer />

        </div>
      </div>
    </Div100vh>
  )
}

export default App
