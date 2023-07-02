import {
  addDays,
  differenceInDays,
  formatISO,
  parseISO,
  startOfDay,
} from 'date-fns'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import queryString from 'query-string'

import { ENABLE_ARCHIVED_GAMES } from '../constants/settings'
import { NOT_CONTAINED_MESSAGE, WRONG_SPOT_MESSAGE } from '../constants/strings'
import { WORDS } from '../constants/wordlist'
import { getToday } from './dateutils'
import { getGuessStatuses } from './statuses'
import { dictionaryWords } from '../constants/dictionaryWords'
// 1 June 2023 Game Epoch
export const firstGameDate = new Date(2023, 5)
export const periodInDays = 1

export const isWordInWordList = (word: string) => {
  const getToday = new Date();
  let solutionDay = getToday.getDay()
  if (solutionDay === 0 || solutionDay === 1 || solutionDay === 2) {
      return (
        WORDS.THREE_WORDS.includes(localeAwareLowerCase(word)) ||
        dictionaryWords.includes(localeAwareLowerCase(word))
      )
  } else if (solutionDay === 3 || solutionDay === 4) {
    return (
      WORDS.FOUR_WORDS.includes(localeAwareLowerCase(word)) ||
      dictionaryWords.includes(localeAwareLowerCase(word))
    )
  } else if (solutionDay === 5 || solutionDay === 6) {
    return (
      WORDS.FIVE_WORDS.includes(localeAwareLowerCase(word)) ||
      dictionaryWords.includes(localeAwareLowerCase(word))
    )
  }
  
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(solution, guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

export const unicodeSplit = (word: string) => {
  return new GraphemeSplitter().splitGraphemes(word)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleLowerCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return process.env.REACT_APP_LOCALE_STRING
    ? text.toLocaleUpperCase(process.env.REACT_APP_LOCALE_STRING)
    : text.toUpperCase()
}

export const getLastGameDate = (today: Date) => {
  const t = startOfDay(today)
  let daysSinceLastGame = differenceInDays(firstGameDate, t) % periodInDays
  return addDays(t, -daysSinceLastGame)
}

export const getNextGameDate = (today: Date) => {
  return addDays(getLastGameDate(today), periodInDays)
}

export const isValidGameDate = (date: Date) => {
  if (date < firstGameDate || date > getToday()) {
    return false
  }

  return differenceInDays(firstGameDate, date) % periodInDays === 0
}

export const getIndex = (gameDate: Date) => {
  let start = firstGameDate
  let index = -1
  do {
    index++
    start = addDays(start, periodInDays)
  } while (start <= gameDate)

  return index
}

export const getWordOfDay = (index: number, getDay: number) => {
  if (index < 0) {
    throw new Error('Invalid index')
  }

  if (getDay === 0 || getDay === 1 || getDay === 2) {
    return localeAwareUpperCase(WORDS.THREE_WORDS[index % WORDS.THREE_WORDS.length])
  } else if (getDay === 3 || getDay === 4) {
    return localeAwareUpperCase(WORDS.FOUR_WORDS[index % WORDS.FOUR_WORDS.length])
  } else if (getDay === 5 || getDay === 6 || getDay === -1) {
    return localeAwareUpperCase(WORDS.FIVE_WORDS[index % WORDS.FIVE_WORDS.length])
  }
}

export const getSolution = (gameDate: Date) => {
  const nextGameDate = getNextGameDate(gameDate)
  const index = getIndex(gameDate)
  const getDay = gameDate.getDay()
  const wordOfTheDay = getWordOfDay(index, getDay)
  const daycalc = gameDate.getDay() - 1
  const indexcalc = getIndex(gameDate) - 1
  const yesterdayWord = getWordOfDay(indexcalc, daycalc)
  return {
    solution: String(wordOfTheDay),
    previousdayWord: String(yesterdayWord),
    solutionGameDate: gameDate,
    solutionIndex: index,
    tomorrow: nextGameDate.valueOf(),
  }
}

export const getGameDate = () => {
  if (getIsLatestGame()) {
    return getToday()
  }

  const parsed = queryString.parse(window.location.search)
  try {
    const d = startOfDay(parseISO(parsed.d!.toString()))
    if (d >= getToday() || d < firstGameDate) {
      setGameDate(getToday())
    }
    return d
  } catch (e) {
    console.log(e)
    return getToday()
  }
}

export const setGameDate = (d: Date) => {
  try {
    if (d < getToday()) {
      window.location.href = '/?d=' + formatISO(d, { representation: 'date' })
      return
    }
  } catch (e) {
    console.log(e)
  }
  window.location.href = '/'
}

export const getIsLatestGame = () => {
  if (!ENABLE_ARCHIVED_GAMES) {
    return true
  }
  const parsed = queryString.parse(window.location.search)
  return parsed === null || !('d' in parsed)
}

export const { solution, solutionGameDate, solutionIndex, tomorrow, previousdayWord } =
  getSolution(getGameDate())
