import { Cell } from '../grid/Cell'
import { BaseModal } from './BaseModal'
import { 
  HOW_TO_PLAY,
  FIND_WORDS,
  FILL_WORDS,
  COLOR_NOTES_LETTERS,
  COLOR_NOTES
 } from '../../constants/language'
import {ReactComponent as TestLogo} from '../../../src/Hearticon.svg'
import Content from './ToggleModal'
import { FooterModal } from './FooterModal'
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
      <p className="dark:text-gray-300">{FILL_WORDS}</p>
      <p className="dark:text-gray-300">{COLOR_NOTES_LETTERS}</p>
      <hr className="dark:text-gray-300"></hr>
      <p className="dark:text-gray-300 font-bold">{COLOR_NOTES}</p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="ப"
          status="correct"
        />
        <Cell value="ட்" isCompleted={true} />
        <Cell value="ட" isCompleted={true} />
        <Cell value="ம்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      <b>ப</b> சரியான இடத்தில் உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="க" isCompleted={true} />
        <Cell
          isRevealing={true}
          isCompleted={true}
          value="ன்"
          status="present"
        />
        <Cell value="ன" isCompleted={true} />
        <Cell value="ம்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      <b>ன்</b> சொல்லில் உள்ளது ஆனால் வேறு இடத்தில் உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="த" isCompleted={true} />
        <Cell value="க" isCompleted={true} />
        <Cell value="வ" isCompleted={true} />
        <Cell isRevealing={true} isCompleted={true} value="ல்" status="absent" />
      </div>
      <p className="text-sm dark:text-gray-300">
      <b>ல்</b> சொல்லில் இல்லை
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="க" isCompleted={true} />
        <Cell value="ர்" isRevealing={true} isCompleted={true} status="darklightGreen" />
        <Cell value="வ" isCompleted={true} />
        <Cell value="ம்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>ர்</b> சொல்லில் இல்லை. <b>ர</b>கர வரிசையில் வேறு எழுத்து <b>(ரா, ரி , ரீ, ரு, ...) இதே இடத்தில்</b> இருக்கிறது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="அ" isCompleted={true} />
        <Cell value="கி" isRevealing={true} isCompleted={true} status="yellowGreen" />
        <Cell value="ல" isCompleted={true} />
        <Cell value="ம்" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      எழுத்து <b>கி</b> சொல்லில் இல்லை தவிர <b>க</b>கர வரிசையில் வேறு எழுத்து <b>(க், க, கா, கு, ...) வேறு இடத்தில்</b> உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="செ" isCompleted={true} />
        <Cell value="ய" isCompleted={true} />
        <Cell value="ற்" isCompleted={true} isRevealing={true} status="greenStar"/>
        <Cell value="கை" isCompleted={true} />
      </div>
      <p className="text-sm dark:text-gray-300">
      <b>ற்</b> சொல்லில் வேறு இடத்தில் உள்ளது, அதோடு <b>ற்</b> உள்ள இடத்தில் வேறு <b>ற</b>கர வரிசையும் உள்ளது.
      </p>

      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="கி" isCompleted={true} />
        <Cell value="ழ" isCompleted={true} />
        <Cell value="க்" isCompleted={true} />
        <Cell value="கு" isCompleted={true} isRevealing={true} status="heart" />
      </div>
      <p className="text-sm dark:text-gray-300">
        <TestLogo className="heart-logo"/>
        உயிர் மற்றும் மெய்எழுத்து ஓசைகளை குறிக்கிறது, சுருக்கமாக எழுத்தின் ஓசை-முடிவு சரியானது.
      </p>
      <p className="dark:text-gray-300">மூன்று வகைகளில் காணலாம்.</p>
      <p className="dark:text-gray-300">1. உயிர்மெய் எழுத்து</p>
      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="கு" isCompleted={true} isRevealing={true} status="heart" />
        <p className="dark:text-gray-300">உ-கர ஓசையில் முடியும் வேறு உயிர்மெய் எழுத்தாக இருக்கலாம் (சு, ஞு, டு, ணு....) அல்லது 'உ' என்ற உயிர் எழுத்தாகவும் இருக்கலாம்.</p>
      </div>
      <p className="dark:text-gray-300">2. மெய்எழுத்து</p>
      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="ன்" isCompleted={true} isRevealing={true} status="heart" />
        <p className="dark:text-gray-300">இந்த இடத்தில் வேறு மெய்எழுத்து உள்ளது  (க், ங், ச்,...)</p>
      </div>
      <p className="dark:text-gray-300">3. உயிர் எழுத்து</p>
      <div className="mb-1 mt-4 flex justify-center">
        <Cell value="ஐ" isCompleted={true} isRevealing={true} status="heart" />
        <p className="dark:text-gray-300">ஐ-கார ஓசையில் அமையும் உயிர்மெய் எழுத்து உள்ளது என்க. (கை, சை, ஞை,...)</p>
      </div>
      <hr className="dark:text-gray-300"></hr>
      <p className="dark:text-gray-300 font-bold">நினைவில் கொள்க</p>
      <p className='dark:text-gray-300 single-row'><span className="s-box"></span> - சரியானது</p>
      <p className='dark:text-gray-300 single-row'><span className="yellow-box"></span> - சரியானது ஆனால் வேறு இடம்</p>
      <p className='dark:text-gray-300 single-row'><span className="green-dark-box"></span> - பாதி சரியானது (மெய் எழுத்து சரியான இடத்தில் உள்ளது)</p>
      <p className='dark:text-gray-300 single-row'><span className="yellow-green-box"></span> - பாதி சரியானது ஆனால் வேறு இடம் (மெய் எழுத்து வேறு இடத்தில் உள்ளது)</p>
      <p className='dark:text-gray-300 single-row'><span className="grey-box"></span> - தவறானது</p>
      <p className="text-sm dark:text-gray-300">
        <TestLogo className="heart-logo"/>
        - உயிர்எழுத்து மற்றும் மெய்எழுத்து ஓசைகளை குறிக்கிறது
      </p>
      <hr className="dark:text-gray-300"></hr>
      <p className="font-bold dark:text-gray-300">நாள்தோறும் ஒரு புதிய சொல் இடம்பெறும்!</p>
      < Content />
      <hr />
      <FooterModal />
    </BaseModal>
  )
}
