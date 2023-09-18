import {
  BEST_STREAK_TEXT,
  CURRENT_STREAK_TEXT,
  SUCCESS_RATE_TEXT,
  TOTAL_TRIES_TEXT,
  AVERAGE_TEXT,
} from '../../constants/strings'
import { GameStats } from '../../lib/indexDB'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="m-1 w-1/4 items-center justify-center dark:text-white">
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs">{label}</div>
    </div>
  )
}

const calculateAverageWinning = (attempts: number[]) => {
  let maxPosition = 0;
  let totalWinningPosition = 0;
  let totalWinningCount = 0;

  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i] > 0) {
      maxPosition = Math.max(maxPosition, i + 1); // Update the maximum position.
      totalWinningPosition += (i + 1) * attempts[i]; // Add the position times the number of wins at that position.
      totalWinningCount += attempts[i]; // Count the total number of winning attempts.
    }
  }

  if (totalWinningCount === 0) {
    return 0; // Handle the case where there are no winning attempts to avoid division by zero.
  }

  const averageWinningPosition = totalWinningPosition / totalWinningCount;
  const roundedPosition = Math.round(averageWinningPosition); // Round to the nearest integer.

  return Math.min(roundedPosition, maxPosition);  
}

export const StatBar = ({ gameStats }: Props) => {
  const averageWinning = calculateAverageWinning(gameStats.winDistribution)
  return (
    <div className="my-2 flex justify-center">
      <StatItem label={TOTAL_TRIES_TEXT} value={gameStats.totalGames} />
      <StatItem label={SUCCESS_RATE_TEXT} value={`${gameStats.successRate}%`} />
      <StatItem label={CURRENT_STREAK_TEXT} value={gameStats.currentStreak} />
      <StatItem label={BEST_STREAK_TEXT} value={gameStats.bestStreak} />
      <StatItem label={AVERAGE_TEXT} value={averageWinning} />
    </div>
  )
}
