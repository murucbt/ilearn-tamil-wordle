import { unicodeSplit } from './words'
import { uyireMeiCombo, meiEluththukkal } from '../constants/tamilwords'

export type CharStatus = 'absent' | 'present' | 'correct' | 'changera' | 'changeka' | 'changeRA' | 'changeku' | 'uyiremei'

export const getStatuses = (
  solution: string,
  guesses: string[],
  isUyireMei?: boolean
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {
      // if (letter !== splitSolution[i]) {
      //   const finalUyireMeiWord = compareUyireMeiWord(letter, splitSolution[i])
      //   return (charObj[finalUyireMeiWord] = 'uyiremei')
      // }

      if (!splitSolution.includes(letter)) {
        // make status absent
        return (charObj[letter] = 'absent')
      }

      if (letter === splitSolution[i]) {
        //make status correct
        return (charObj[letter] = 'correct')
      }

      if (charObj[letter] !== 'correct') {
        //make status present
        return (charObj[letter] = 'present')
      }
    })
  })

  return charObj
}

export const getGuessStatuses = (
  solution: string,
  guess: string,
  isUyireMei?: boolean
): CharStatus[] => {
  const splitSolution = unicodeSplit(solution)
  const splitGuess = unicodeSplit(guess)

  const solutionCharsTaken = splitSolution.map((_) => false)

  const statuses: CharStatus[] = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    }
  })

  // handle check uyire or mei words correct cases first
  if (isUyireMei === true){

  splitGuess.forEach((letter, i) => {
    if (letter !== splitSolution[i]) {
      const UyireMeiWord = compareUyireMeiWord(letter, splitSolution[i])
      if (UyireMeiWord){
        statuses[i] = 'uyiremei'
      }
      solutionCharsTaken[i] = true
      return
    }
  })
}


  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index]
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
      return
    } else {
      statuses[i] = 'absent'
      return
    }
  })

  return statuses
}

const compareUyireMeiWord = (guess: any, solution: any) => {
  const guessWord = uyireMeiCombo[guess]
  const solutionWord = uyireMeiCombo[solution]
  let finalGuess = ''
  if (guessWord && solutionWord) {
    if (guessWord[0]===solutionWord[0]) {
      return finalGuess= guess
    } else if(guessWord[1]===solutionWord[1]) {
      return finalGuess= guess
    }
  }
}

export const checkIfGivensLettersSoundsSame = (guessLetter: any, solutionLetter: any) => {
  // check if both guessLetter & solutionLetter are mei eluththukkal
  if (meiEluththukkal.includes(guessLetter) && meiEluththukkal.includes(solutionLetter)) {
    return true;
  }

  const guessLetterCombo = uyireMeiCombo[guessLetter] || [guessLetter];
  const solutionLetterCombo = uyireMeiCombo[solutionLetter] || [solutionLetter];
  
  return guessLetterCombo.some((letter: any) => solutionLetterCombo.includes(letter));
}