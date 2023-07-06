import { useState } from "react";
import { Cell } from '../grid/Cell'

const ToggleModal = () => {
  const [isShowMore, setIsShowMore] = useState(false);

  const toggleReadMoreLess = () => {
    setIsShowMore(!isShowMore);
  };

  return (
    <div className="card dropbottom">
      {isShowMore && (
        <div className="details">
            <p className="dark:text-gray-300 font-bold">1. ஓர் எழுத்து வரிசைக்கு இரு வண்ணங்கள் ( மஞ்சள் மற்றும் அரை-பச்சை )</p>
            <p className="dark:text-gray-300">மறைந்துள்ள சொல் <b>இன்பம்</b>எனில்,</p>
            <div className="mb-1 mt-4 flex justify-center">
                <Cell value="ம" isCompleted={true} status="yellowGreen" />
                <Cell value="னி" isCompleted={true} status="darklightGreen" />
                <Cell value="த" isCompleted={true} status="absent" />
                <Cell value="ன்" isCompleted={true} isRevealing={true} status="present" />
            </div>
            <div className="unorder-list">
                <ul className="dark:text-gray-300 details-list">
                <li>இங்கு 2 <sup>வது</sup> இடம் <b>ன</b>-கர வரிசை உள்ளதை குறிக்கிறது (<b>னி</b> தவிர்த்து).</li>
                <li>4 <sup>வது</sup> இடம் <b>ன்</b>- சொல்லில் வேறு இடத்தில் உள்ளதை குறிக்கிறது.</li>
                <li>எனவே <b>ன்</b>2 <sup>வது</sup> இடத்தில் இருக்க அதிக வாய்ப்புகள் உள்ளது. அப்படி இல்லையேல் சொல்லில் இரு <b>ன</b>-கர வரிசை எழுத்துக்கள் இருக்கிறது எனலாம்.</li>
                </ul>
            </div>
            <p className="dark:text-gray-300">சொல்லில் ஒரே ஒரு <b>ன்</b> இருப்பினும் இரண்டு இடங்களிலும் வண்ண குறிப்புகள் இருப்பது குழப்பமாக தோன்றினாலும் தர்க்கரீதியாக அது சரியான குறியீடே ஆகும். ஒருவேளை 2<sup>வது</sup> இடத்தில் சாம்பல் நிறம் இருந்தால் ன-கர வரிசையே அந்த இடத்தில் இல்லை என்று தவறாக பொருள்படும்.</p>
       </div>
      )}

      <button onClick={toggleReadMoreLess}>
        {isShowMore ? <p className="read-less">மேலும் படிக்க</p> : <p className="read-more">மேலும் படிக்க</p>}
      </button>
    </div>
  );
}

export default ToggleModal;