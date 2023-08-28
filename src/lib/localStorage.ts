import  secureLocalStorage  from  "react-secure-storage"
import EventEmitter from '../common/event-emitter'
import IndexedDBService from '../services/indexeddb.service'

const gameStateKey = 'gameState'
const archiveGameStateKey = 'archiveGameState'
const highContrastKey = 'highContrast'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToLocalStorage = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const gameStateItem = {
    Id: key,
    value: gameState
}
  setTimeout(() => {
    // IndexedDBService.CreateGamestateStore(gameStateItem)
  }, 1000);
  // secureLocalStorage.setItem(key, gameState)
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const state = secureLocalStorage.getItem(key)

  EventEmitter.subscribe('initialized', function (e: any) {
    IndexedDBService.GamestateStoreGetAll((data: any) => {
      console.log('data...', data[0].value.guesses)
    const resultIndexedArray = data[0].value.guesses
    console.log('resultIndexedArray...', resultIndexedArray)
    const getIndexedList = resultIndexedArray.map((item: string) => {
      return item
    })
    
    console.log(getIndexedList)
  })
})
  return state ? ((state) as StoredGameState) : null
}

const gameStatKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}

export const setStoredIsHighContrastMode = (isHighContrast: boolean) => {
  if (isHighContrast) {
    localStorage.setItem(highContrastKey, '1')
  } else {
    localStorage.removeItem(highContrastKey)
  }
}

export const getStoredIsHighContrastMode = () => {
  const highContrast = localStorage.getItem(highContrastKey)
  return highContrast === '1'
}
