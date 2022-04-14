import { cartActions } from './cart-slice'
import { uiActions } from './ui-slice'

export const fetchData = () => {
  return async (dispatch) => {
    const fetchHandler = async () => {
      const res = await fetch(
        'https://redux-demo-6e0ab-default-rtdb.firebaseio.com/cartItems.json'
      )
      const data = await res.json()
      return data
    }
    try {
      const cartData = await fetchHandler()
      dispatch(cartActions.replaceData(cartData))
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sending Resquest to fetch data Failed',
          type: 'error',
        })
      )
    }
  }
}

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        open: true,
        message: 'Sending Resquest',
        type: 'warning',
      })
    )

    const sendRequest = async () => {
      // Send state as Sending request
      const res = await fetch(
        'https://redux-demo-6e0ab-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      )

      const data = await res.json()
      // Send state as Request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Request Sent Successfully!!',
          type: 'success',
        })
      )
    }
    try {
      await sendRequest()
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Send request to database is successfuly',
          type: 'success',
        })
      )
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sending Resquest Failed',
          type: 'error',
        })
      )
    }
  }
}
