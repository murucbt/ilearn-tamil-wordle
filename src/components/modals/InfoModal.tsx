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
      <hr className="dark:text-gray-300"></hr>
      <p className="font-bold">{COLOR_NOTES}</p>

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
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>தெ</b> சொல்லின் சரியான இடத்தில் உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="மி" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="ன்"
          status="present"
        />
        <Cell value="ன" isCompleted={true} />
        <Cell value="ல்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>ன்</b> சொல்லில் உள்ளது அனால் வேறு இடத்தில் உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="அ" isCompleted={true} />
        <Cell value="ச்" isCompleted={true} />
        <Cell value="ச" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="ம்" status="absent" />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>ம்</b> சொல்லில் எங்கும் இடம்பெறவில்லை.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="பௌ" isCompleted={true} />
        <Cell value="ர்" isRevealing={true} isCompleted={true} status="changera" />
        <Cell value="ண" isCompleted={true} />
        <Cell value="மி" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>ர்</b> சொல்லில் இடம்பெறவில்லை தவிர <b>ரகர</b> வரிசையில் வேறு ஏதோ எழுத்து <b>(ரா, ரி , ரீ, ரு, ...) இதே இடத்தில்</b> இடம்பெற்றுள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="அ" isCompleted={true} />
        <Cell value="கி" isRevealing={true} isCompleted={true} status="absent" />
        <Cell value="ல" isCompleted={true} />
        <Cell value="ம்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>கி</b> சொல்லில் இடம்பெறவில்லை தவிர <b>க</b>கர வரிசையில் வேறு ஏதோ எழுத்து <b>(க், க, கா, கு, ...) வேறு இடத்தில்</b> இடம்பெற்றுள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="இ" isCompleted={true} />
        <Cell value="ய" isCompleted={true} />
        <Cell value="ற்" isCompleted={true} isRevealing={true} status="absent"/>
        <Cell value="கை" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>ற்</b> சொல்லில் வேறு இடத்தில் உள்ளது, அதோடு <b>ற்</b> உள்ள இடத்தில் வேறு <b>ற</b>கர வரிசையும் இடம்பெற்றுள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="வ" isCompleted={true} />
        <Cell value="ட" isCompleted={true} />
        <Cell value="க்" isCompleted={true} />
        <Cell value="கு" isCompleted={true} isRevealing={true} status="absent" />
      </div>
      <p className="text-sm dark:text-gray-300">
      உயிர்எழுத்து மற்றும் மெய்எழுத்து ஓசைகளை குறிக்கிறது, சுருக்கமாக எழுத்தின் ஓசை-முடிவு சரியானது என்க.
      </p>
      
    </BaseModal>
  )
}
