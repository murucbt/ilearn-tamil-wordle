import IndexedDBService from '../services/indexeddb.service'

const gameStateKey = 'gameState'
const archiveGameStateKey = 'archiveGameState'
const highContrastKey = 'highContrast'

export type StoredGameState = {
  guesses: string[]
  solution: string
}

export const saveGameStateToIndexDB = (
  isLatestGame: boolean,
  gameState: StoredGameState
) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  const gameStateItem = {
    Id: key,
    value: gameState
}
  setTimeout(() => {
    IndexedDBService.CreateGamestateStore(gameStateItem)
  }, 1000);
}

export const loadGameStateFromLocalStorage = (isLatestGame: boolean) => {
  const key = isLatestGame ? gameStateKey : archiveGameStateKey
  return key
}

const gameStaticsKey = 'gameStats'

export type GameStats = {
  winDistribution: number[]
  gamesFailed: number
  currentStreak: number
  bestStreak: number
  totalGames: number
  successRate: number
}

export const saveStatsToIndexDB = (gameStats: GameStats) => {
  const gameStatsItem = {
    Id: gameStaticsKey,
    value: gameStats
  }
  setTimeout(() => {
    IndexedDBService.CreateGamestaticsStore(gameStatsItem)
  }, 1000);
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
