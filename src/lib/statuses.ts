import { unicodeSplit } from './words'
import { uyireMeiCombo, meiEluththukkal, uyireEluththukkal, keyBoardRightSideUyireMeiLetters, meiLettersCombo } from '../constants/tamilwords'

export type CharStatus = 'absent' | 'present' | 'correct' | 'darklightGreen' | 'yellowGreen' | 'greenStar' | 'heart' | 'meiwordletters' | 'yellowGreenHeart' | 'darklightGreenHeart'

export const getStatuses = (
  solution: string,
  guesses: string[],
  isUyireMei?: boolean
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)
  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {
      const guessColorCode = getGuessStatuses(solution, word)[i]
      let rightSideKeyBoardUyirMeiLetterOfGuessLeter = null

      const guessLetterCombo = uyireMeiCombo[letter] || [letter]
      if (guessLetterCombo.length > 1) {
        const meiLetterFromGuessLetter = guessLetterCombo.filter((individualLetter: any) => meiEluththukkal.includes(individualLetter))[0];
        rightSideKeyBoardUyirMeiLetterOfGuessLeter = meiLettersCombo[meiLetterFromGuessLetter]
      } else if (guessLetterCombo.length === 1 && meiEluththukkal.includes(guessLetterCombo[0])) {
        rightSideKeyBoardUyirMeiLetterOfGuessLeter = meiLettersCombo[guessLetterCombo[0]]
      } else if (guessLetterCombo.length === 1 && uyireEluththukkal.includes(guessLetterCombo[0])) {
        rightSideKeyBoardUyirMeiLetterOfGuessLeter = guessLetterCombo[0]
      }
      checkKeysOtherThanRightAndLeftKeys(letter, splitSolution[i], guessColorCode, charObj);

      return (charObj[rightSideKeyBoardUyirMeiLetterOfGuessLeter] = guessColorCode)
    })
  })
  return charObj
}

const checkKeysOtherThanRightAndLeftKeys = (letter: any, solutionLetter: any, colorCode: any, charObj: any) => {
  if ( ! keyBoardRightSideUyireMeiLetters.includes(letter) && ! uyireEluththukkal.includes(letter)) {
      if (letter === solutionLetter) {
        //make status correct
        return (charObj[letter] = 'correct')
      }
      if (letter !== solutionLetter) {
        //make status absent
        return (charObj[letter] = 'absent')
      }

    // charObj[letter] = colorCode;
  }

  return charObj
}

const checkGuessLetterWithSolution = (guessLetterIndex: any, guessLetter: any, solutionLetter: any, solution: any) => {

  const guessLetterCombo = uyireMeiCombo[guessLetter] || [guessLetter];
  const solutionLetterCombo = uyireMeiCombo[solutionLetter] || [solutionLetter];
  const splitSolution = unicodeSplit(solution)

  let lightDartGreen = false
  let greenStar = false    
  let yellowGreen = false

  let meiLetterFromGuessLetter = '';
  if (guessLetterCombo.length === 1 && meiEluththukkal.includes(guessLetter)) {
    meiLetterFromGuessLetter = guessLetter;
  }
  if (guessLetterCombo.length > 1) {
    meiLetterFromGuessLetter = guessLetterCombo.filter((individualLetter: any) => meiEluththukkal.includes(individualLetter))[0];
  }


  if (meiLetterFromGuessLetter !== '') {
    lightDartGreen = solutionLetterCombo.includes(meiLetterFromGuessLetter)

    if (splitSolution.includes(meiLetterFromGuessLetter)) {
      const meiLetterFromSolutionLetterCombo = solutionLetterCombo.filter((individualLetter: any) => meiEluththukkal.includes(individualLetter));
      if (meiLetterFromSolutionLetterCombo.includes(meiLetterFromGuessLetter)) {
        greenStar = true
      }
    }
    
    if (!lightDartGreen) {
      const splitSolutionCombo:any[] = []
      splitSolution.forEach((letter, i) => {
        const letterCombo = uyireMeiCombo[letter] || [letter];
        if (i !== guessLetterIndex) {
          splitSolutionCombo.push(letterCombo);
        }
      })
  
      let foundInSomeOtherPlace = false;
      splitSolutionCombo.forEach((combo, i) => {
        if (!foundInSomeOtherPlace && combo.includes(meiLetterFromGuessLetter) && splitSolution[i] !== guessLetter) {
          yellowGreen = true
          foundInSomeOtherPlace = true;
        }
      })
    }    

  }

  return [lightDartGreen, yellowGreen, greenStar]
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
    const checkHeartStatus = () => {
      if (isUyireMei === true && !statuses[i]) {
        const uyireMeiWord = checkIfGivensLettersSoundsSame(letter, splitSolution[i])
        return uyireMeiWord
      } 
    } 

    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
      return
    } else {
      const validationResults = checkGuessLetterWithSolution(i, letter, splitSolution[i], solution)
      validationResults.forEach((result, index) => {
        if (result === true) {
          if (index === 0) {
              const uyireMeiWord = checkHeartStatus()
              if (uyireMeiWord) {
                statuses[i] = 'darklightGreenHeart'
                return
              }
            statuses[i] = 'darklightGreen'
          } else if (index === 1) {
            const uyireMeiWord = checkHeartStatus()
            if (uyireMeiWord) {
              statuses[i] = 'yellowGreenHeart'
              return
            }
            statuses[i] = 'yellowGreen'
            
          } else if (index === 2) {
            statuses[i] = 'greenStar'
          }
        }
      })
      if (isUyireMei === true && !statuses[i]) {
        const uyireMeiWord = checkIfGivensLettersSoundsSame(letter, splitSolution[i])
        if (uyireMeiWord) {
          statuses[i] = 'heart'
        }
        return
      }
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // now we are left with "present"s
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter
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

export const getMeiwordEasyStatus = (
  solution: string,
  guesses: string[],
): { [key: string]: CharStatus } => {
  const charObj: { [key: string]: CharStatus } = {}
  const splitSolution = unicodeSplit(solution)
  const statuses: CharStatus[] = Array.from(Array(guesses.length))

  guesses.forEach((word) => {
    unicodeSplit(word).forEach((letter, i) => {

      if (letter !== splitSolution[i]) {
        const checkMeiWord = checkMeiwordLetter(letter, splitSolution[i])
        if (checkMeiWord){
          statuses[i]= 'meiwordletters'
          return (charObj[checkMeiWord] = 'meiwordletters')
        }
      }
    })
  })

  return charObj
}


const checkMeiwordLetter = (guess: any, solution: any) => {
  const guessWord = uyireMeiCombo[guess]
  const solutionWord = uyireMeiCombo[solution]
  let changeCorrectWord = ''
  if (guessWord && solutionWord) {
    if (guessWord[0]===solutionWord[0]) {
      return changeCorrectWord = solution
    } else if (meiEluththukkal.includes(guess) && meiEluththukkal.includes(solution)) {
      return changeCorrectWord = solution
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