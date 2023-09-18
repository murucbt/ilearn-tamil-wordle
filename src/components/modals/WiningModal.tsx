import { ShareIcon } from '@heroicons/react/outline'

import {
  ENABLE_ARCHIVED_GAMES,
} from '../../constants/settings'
import {
  MEANING_WORD_TEXT,
  SHARE_TEXT,
  CONGRATS_TITLE,
  GAME_LOST_TITLE,
  EASY_MODE_TITLE,
} from '../../constants/strings'
import { shareStatus } from '../../lib/share'
import { BaseModal } from './BaseModal'
import { FooterModal } from './FooterModal'
import { gameMeaningWord } from '../../constants/meaningWords'
import { unicodeSplit } from '../../lib/words'
import { Cell } from '../grid/Cell'

type Props = {
  isOpen: boolean
  handleClose: () => void
  solution: string
  guesses: string[]
  isLatestGame: boolean
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
  handleShareFailure: () => void
  isDarkMode: boolean
  isHighContrastMode: boolean
  isEasyMode: boolean
  isSolutionMeaningWord: string
}

export const WiningModal = ({
  isOpen,
  handleClose,
  solution,
  guesses,
  isLatestGame,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
  handleShareFailure,
  isDarkMode,
  isHighContrastMode,
  isEasyMode,
  isSolutionMeaningWord,
}: Props) => {

function getGameBoard() {
    var shareBoardStatus = shareStatus(
        solution,
        guesses,
        isGameLost,
        isEasyMode,
        isDarkMode,
        isHighContrastMode,
        handleShareToClipboard,
        handleShareFailure,
        true,
    );
    return (
        <div className="inline-block">
        <p>{shareBoardStatus?.text}</p>
        {isEasyMode === true && (
            <p className="easymode-text">{EASY_MODE_TITLE}</p>
        )}
        <pre>{shareBoardStatus?.grid}</pre>
        </div>
        
    )
    }
function getSolutionWord() {
    const splitSolution = unicodeSplit(solution)
    return (
        <div className="mb-1 mt-4 flex solution-wining-word">
            {
                splitSolution.map((item) => 
                    <Cell
                        isRevealing={true}
                        isCompleted={true}
                        value={item}
                        status="correct"
                        key = {item}
                        />
                )
            }
        </div>
      )
}
  function getGameMeaningWord() {

    return (
      <div className="gamemeaning-word">
      {(!ENABLE_ARCHIVED_GAMES || isLatestGame) && (
          <div className= "dark:text-gray-300 game-word">
            <h5>{MEANING_WORD_TEXT}</h5>
            <p>{isSolutionMeaningWord}</p>
          </div>
        )}
        <div className="hr-allign" />
      </div>
      
    )
  }

  return (
    <BaseModal
      title={isGameLost ? GAME_LOST_TITLE : CONGRATS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      {(isGameLost || isGameWon) && (
        <div className="solution-words-wrap">
            {getSolutionWord()} 
        </div>
      )}

      {(isGameLost || isGameWon) && (
        <div className="game-words-wrap">
          {getGameMeaningWord()}
        </div>
      )}

      {(isGameLost || isGameWon) && (
        <div className="mt-5 columns-2 items-center items-stretch justify-center dark:text-white sm:mt-6 wining-modal">
          {getGameBoard()}
          <div>
          <button
              type="button"
              className="mt-2 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-base wining-word-button"
              onClick={() => {
                shareStatus(
                  solution,
                  guesses,
                  isGameLost,
                  isEasyMode,
                  isDarkMode,
                  isHighContrastMode,
                  handleShareToClipboard,
                  handleShareFailure,
                  false
                )
              }}
            >
              <ShareIcon className="mr-2 h-6 w-6 cursor-pointer dark:stroke-white" />
              {SHARE_TEXT}
            </button>
          </div>
        </div>
      )}
      <div className="hr-allign" />
      <FooterModal />
    </BaseModal>
  )
}
