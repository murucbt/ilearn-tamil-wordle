import { useEffect, useState } from 'react'
import { ENTER_TEXT } from '../../constants/language'
import { getStatuses } from '../../lib/statuses'
import { Key } from './Key'

type Props = {
  onChar: (value: string) => void
  onDelete: () => void
  onEnter: () => void
  solution: string
  guesses: string[]
  isRevealing?: boolean
  isUyireMei?: boolean
}

export const Keyboard = ({
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  isRevealing,
  isUyireMei,
}: Props) => {
  const charStatuses = getStatuses(solution, guesses, isUyireMei)
  const [tamilAlphabets, settamilAlphabets] = useState(['அ', 'ஆ', 'இ', 'ஈ']);
  const [tamilAlphabetsTwo, settamilAlphabetsTwo] = useState(['க', 'ச', 'ட', 'த', 'ப', 'ற']);
  const [tamilAlphabetsThree, settamilAlphabetsThree] = useState(['உ', 'ஊ', 'எ', 'ஏ']);
  const [tamilAlphabetsFour, settamilAlphabetsFour] = useState(['ங', 'ஞ', 'ண', 'ந', 'ம','ன']);
  const [tamilAlphabetsFive, settamilAlphabetsFive] = useState(['ஐ', 'ஒ', 'ஓ', 'ஔ']);
  const [tamilAlphabetsSix, settamilAlphabetsSix] = useState(['ய', 'ர', 'ல', 'வ', 'ழ','ள']);
  const uyirEluthukalArray = ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ', 'ஃ']

  const onClick = (value: string) => {
    if (value === 'ENTER') {
      onEnter()
      settamilAlphabets(['அ', 'ஆ', 'இ', 'ஈ'])
      settamilAlphabetsThree(['உ', 'ஊ', 'எ', 'ஏ'])
      settamilAlphabetsFive(['ஐ', 'ஒ', 'ஓ', 'ஔ'])
    } else if (value === 'DELETE') {
      onDelete()
      settamilAlphabets(['அ', 'ஆ', 'இ', 'ஈ'])
      settamilAlphabetsThree(['உ', 'ஊ', 'எ', 'ஏ'])
      settamilAlphabetsFive(['ஐ', 'ஒ', 'ஓ', 'ஔ'])
    } else if (value === '') {
      
    }
    else {
      if (!uyirEluthukalArray.includes(value)) {
        settamilAlphabets(['அ', 'ஆ', 'இ', 'ஈ'])
        settamilAlphabetsThree(['உ', 'ஊ', 'எ', 'ஏ'])
        settamilAlphabetsFive(['ஐ', 'ஒ', 'ஓ', 'ஔ']) 
      }
      onChar(value)
    }
  }

  const vowelConsonant = (value: string) => {
    if (value === 'க') {
      settamilAlphabets(['க்','கா','கி','கீ'])
      settamilAlphabetsThree(['கு','கூ','கெ','கே'])
      settamilAlphabetsFive(['கை','கொ','கோ','கௌ'])
      onChar(value)
    } else if (value === 'ச') {
      settamilAlphabets(['ச்','சா','சி','சீ'])
      settamilAlphabetsThree(['சு','சூ','செ','சே'])
      settamilAlphabetsFive(['சை','சொ','சோ','சௌ'])
      onChar(value)
    } else if (value === 'ட') {
      settamilAlphabets(['ட்','டா','டி','டீ'])
      settamilAlphabetsThree(['டு','டூ','டெ','டே'])
      settamilAlphabetsFive(['டை','டொ','டோ','டௌ'])
      onChar(value)
    } else if (value === 'த') {
      settamilAlphabets(['த்','தா','தி','தீ'])
      settamilAlphabetsThree(['து','தூ','தெ','தே'])
      settamilAlphabetsFive(['தை','தொ','தோ','தௌ'])
      onChar(value)
    } else if (value === 'ப') {
      settamilAlphabets(['ப்','பா','பி','பீ'])
      settamilAlphabetsThree(['பு','பூ','பெ','பே'])
      settamilAlphabetsFive(['பை','பொ','போ','பௌ'])
      onChar(value)
    } else if (value === 'ற') {
      settamilAlphabets(['ற்','றா','றி','றீ'])
      settamilAlphabetsThree(['று','றூ','றெ','றே'])
      settamilAlphabetsFive(['றை','றொ','றோ','றௌ'])
      onChar(value)
    } else if (value === 'ங') {
      settamilAlphabets(['ங்','ஙா','ஙி','ஙீ'])
      settamilAlphabetsThree(['ஙு','ஙூ','ஙெ','ஙே'])
      settamilAlphabetsFive(['ஙை','ஙொ','ஙோ','ஙௌ'])
      onChar(value)
    } else if (value === 'ஞ') {
      settamilAlphabets(['ஞ்','ஞா','ஞி','ஞீ'])
      settamilAlphabetsThree(['ஞு','ஞூ','ஞெ','ஞே'])
      settamilAlphabetsFive(['ஞை','ஞொ','ஞோ','ஞௌ'])
      onChar(value)
    } else if (value === 'ண') {
      settamilAlphabets(['ண்','ணா','ணி','ணீ'])
      settamilAlphabetsThree(['ணு','ணூ','ணெ','ணே'])
      settamilAlphabetsFive(['ணை','ணொ','ணோ','ணௌ'])
      onChar(value)
    } else if (value === 'ந') {
      settamilAlphabets(['ந்','நா','நி','நீ'])
      settamilAlphabetsThree(['நு','நூ','நெ','நே'])
      settamilAlphabetsFive(['நை','நொ','நோ','நௌ'])
      onChar(value)
    } else if (value === 'ம') {
      settamilAlphabets(['ம்','மா','மி','மீ'])
      settamilAlphabetsThree(['மு','மூ','மெ','மே'])
      settamilAlphabetsFive(['மை','மொ','மோ','மௌ'])
      onChar(value)
    } else if (value === 'ன') {
      settamilAlphabets(['ன்','னா','னி','னீ'])
      settamilAlphabetsThree(['னு','னூ','னெ','னே'])
      settamilAlphabetsFive(['னை','னொ','னோ','னௌ'])
      onChar(value)
    } else if (value === 'ய') {
      settamilAlphabets(['ய்','யா','யி','யீ'])
      settamilAlphabetsThree(['யு','யூ','யெ','யே'])
      settamilAlphabetsFive(['யை','யொ','யோ','யௌ'])
      onChar(value)
    } else if (value === 'ர') {
      settamilAlphabets(['ர்','ரா','ரி','ரீ'])
      settamilAlphabetsThree(['ரு','ரூ','ரெ','ரே'])
      settamilAlphabetsFive(['ரை','ரொ','ரோ','ரௌ'])
      onChar(value)
    } else if (value === 'ல') {
      settamilAlphabets(['ல்','லா','லி','லீ'])
      settamilAlphabetsThree(['லு','லூ','லெ','லே'])
      settamilAlphabetsFive(['லை','லொ','லோ','லௌ'])
      onChar(value)
    } else if (value === 'வ') {
      settamilAlphabets(['வ்','வா','வி','வீ'])
      settamilAlphabetsThree(['வு','வூ','வெ','வே'])
      settamilAlphabetsFive(['வை','வொ','வோ','வௌ'])
      onChar(value)
    } else if (value === 'ழ') {
      settamilAlphabets(['ழ்','ழா','ழி','ழீ'])
      settamilAlphabetsThree(['ழு','ழூ','ழெ','ழே'])
      settamilAlphabetsFive(['ழை','ழொ','ழோ','ழௌ'])
      onChar(value)
    } else if (value === 'ள') {
      settamilAlphabets(['ள்','ளா','ளி','ளீ'])
      settamilAlphabetsThree(['ளு','ளூ','ளெ','ளே'])
      settamilAlphabetsFive(['ளை','ளொ','ளோ','ளௌ'])
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.code === 'Enter') {
        onEnter()
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div className="mobile-keyboard">
      <div className="dark:text-gray-300 mb-1 flex justify-center">
        {tamilAlphabets.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        {tamilAlphabetsTwo.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={vowelConsonant}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="dark:text-gray-300 mb-1 flex justify-center">
        {tamilAlphabetsThree.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        {tamilAlphabetsFour.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={vowelConsonant}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="dark:text-gray-300 mb-1 flex justify-center">
        {tamilAlphabetsFive.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={onClick}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
        {tamilAlphabetsSix.map((key) => (
          <Key
            value={key}
            key={key}
            onClick={vowelConsonant}
            status={charStatuses[key]}
            isRevealing={isRevealing}
          />
        ))}
      </div>
      <div className="flex justify-center">
        {['ஃ'].map((key) => (
            <Key
              value={key}
              key={key}
              onClick={onClick}
              status={charStatuses[key]}
              isRevealing={isRevealing}
            />
          ))}
          <Key width={65.4} value="ENTER" onClick={onClick} className='enter-button'>
            {ENTER_TEXT}
          </Key>
          
          <Key width={65.4} value="DELETE" onClick={onClick}>
          
          <i className="fa-solid fa-delete-left font-bold">⌫</i>
          </Key>
          
      </div>
    </div>
  )
}
