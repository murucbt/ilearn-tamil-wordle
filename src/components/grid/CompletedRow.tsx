import { getGuessStatuses } from '../../lib/statuses'
import { unicodeSplit } from '../../lib/words'
import { Cell } from './Cell'

type Props = {
  solution: string
  guess: string
  isRevealing?: boolean
  isUyireMei?: boolean
}

export const CompletedRow = ({ solution, guess, isRevealing, isUyireMei }: Props) => {
  const statuses = getGuessStatuses(solution, guess, isUyireMei)
  const splitGuess = unicodeSplit(guess)
  const splitSolution = unicodeSplit(solution)
  // splitGuess.map((data, i) => {
    
  //   if (statuses[i]=='meiwordletters') {
  //     splitGuess[i]=splitSolution[i]
  //   }
  //   return data = statuses[i]=='meiwordletters' ? splitSolution[i] : data
  // })
  return (
    <div className="mb-1 flex justify-center">
      {splitGuess.map((letter, i) => (
        <Cell
          key={i}
          value={letter}
          status={statuses[i]}
          position={i}
          isRevealing={isRevealing}
          isCompleted
        />
      ))}
    </div>
  )
}
