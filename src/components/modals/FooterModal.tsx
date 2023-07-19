import {ReactComponent as WhatsappLogo} from '../../../src/whatsapp.svg'
import { PhoneIcon } from '@heroicons/react/outline'

  export const FooterModal = ({

  }) => {
  
    return (
      <>
        <div className="flex justify-between gap-4 py-3">
          <div className='footer-links'>
            To Learn Tamil Online<a href="https://ilearntamil.com/" target="_blank" rel="noreferrer"> Visit</a> 
            <div className="socialmedia-links">
              <p className="dark:text-gray-300"><PhoneIcon className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white home-icon"
                />Call / <WhatsappLogo className="whatsapp-logo"/><a data-action="open" data-phone="919035394805" data-message="" target="_blank" href="https://web.whatsapp.com/send?phone=919035394805&amp;text=">WhatsApp at +91  9035394805</a></p>
            </div>
          </div>
        </div>
      </>
    )
  }