import {ReactComponent as WhatsappLogo} from '../../../src/whatsapp.svg'
import { PhoneIcon } from '@heroicons/react/outline'

  export const FooterModal = ({

  }) => {
  
    return (
      <>
        <div className="flex justify-between gap-4 py-3">
          <div className='footer-links'>
          Visit <a href="https://ilearntamil.com/" target="_blank" rel="noreferrer"> ilearntamil.com</a> 
            <div className="socialmedia-links">
              <p className="dark:text-gray-300"><a href="tel:919035394805"><PhoneIcon className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white home-icon"
                /></a> / <a data-action="open" className="phone-whatsapp" data-phone="919035394805" data-message="" target="_blank" href="https://web.whatsapp.com/send?phone=919035394805&amp;text="><WhatsappLogo className="whatsapp-logo"/> +91  9035394805</a></p>
            </div>
          </div>
        </div>
      </>
    )
  }