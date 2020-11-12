export const REDIRECT_TO_THANKS = 'REDIRECT_TO_THANKS'

export const redirectoToThanksAction = (shouldRedirect) => ({
    type: REDIRECT_TO_THANKS,
    redirect: shouldRedirect
})
  