import { solution, unicodeSplit, unicodeLength } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  guess: string
  className: string
}

export const CurrentRow = ({ guess, className }: Props) => {
  let splitGuess = unicodeSplit(guess)
  splitGuess = splitGuess.slice(0,unicodeLength(solution))
  const emptyCells = unicodeLength(solution)- splitGuess.length < 0 ? [] : Array.from(Array(unicodeLength(solution)- splitGuess.length)) 
  const classes = `flex justify-center mb-1 ${className}`

  return (
    <div className={classes}>
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
