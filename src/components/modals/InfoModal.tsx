import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { 
  HOW_TO_PLAY,
  FIND_WORDS,
  FILL_WORDS,
  COLOR_NOTES_LETTERS,
  COLOR_NOTES
 } from '../../constants/language'
type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title={HOW_TO_PLAY} isOpen={isOpen} handleClose={handleClose}>
      <p className="dark:text-gray-300">
      {FIND_WORDS}
      </p>
      <p>{FILL_WORDS}</p>
      <p>{COLOR_NOTES_LETTERS}</p>
      <p>{COLOR_NOTES}</p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="தெ"
          status="correct"
        />
        <Cell value="ன்" isCompleted={true} />
        <Cell value="ற" isCompleted={true} />
        <Cell value="ல்" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter W is in the word and in the correct spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="P" isCompleted={true} />
        <Cell value="I" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="L"
          status="present"
        />
        <Cell value="O" isCompleted={true} />
        <Cell value="T" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter L is in the word but in the wrong spot.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="V" isCompleted={true} />
        <Cell value="A" isCompleted={true} />
        <Cell value="G" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="U" status="absent" />
        <Cell value="E" isCompleted={true} />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        The letter U is not in the word in any spot.
      </p>

      <p className="mt-6 text-sm italic text-gray-500 dark:text-gray-300">
        This is an open source version of the word guessing game we all know and
        love -{' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="font-bold underline"
        >
          check out the code here
        </a>{' '}
      </p>
    </BaseModal>
  )
}
