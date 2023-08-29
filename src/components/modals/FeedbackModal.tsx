type Props = {
  feedbackDescription?: string
  feedbackDescriptiontwo?: string
}

export const FeedbackModal = ({
  feedbackDescription,
  feedbackDescriptiontwo
}: Props) => {

  return (
    <>
      <div className="flex justify-between gap-4 py-3">
        <div className="mt-1 text-left">
          {feedbackDescription && (
            <p className="dark:text-gray-300 leading-none">{feedbackDescription}</p>
          )}
          {feedbackDescriptiontwo && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-300 settings-description-two">
              {feedbackDescriptiontwo}
            </p>
          )}
          
        </div>
        <div className= 'dark:text-blue-300 feedback-links'>
        <a href="mailto:support@ilearntamil.com" rel="noreferrer">Email</a> <span className="dark:text-gray-300 pipe">|</span>
        <a href="https://twitter.com/ilearntamil" target="_blank" rel="noreferrer">Twitter</a> <span className="dark:text-gray-300 pipe">|</span>
        <a href="https://www.instagram.com/ilearntamil_" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </>
  )
}