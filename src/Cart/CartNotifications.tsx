import Button from '@mui/material/Button'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import SnackbarNotifications, { useSnackbarNotifications } from '../Layouts/SnackbarNotifications'
import { CartItem } from './Cart'

const CartNotifications: React.FC<{ event: CartEvent | undefined }> = ({ event }) =>
  <SnackbarNotifications
    anchor={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <ItemAddedNotification item={event?.type === 'item-added' ? event.item : undefined} />
  </SnackbarNotifications>

export type CartEvent =
  | { type: 'item-added', item: Omit<CartItem, 'itemId'> }

const ItemAddedNotification: React.FC<{ item: Omit<CartItem, 'itemId'> | undefined }> = ({ item }) => {
  const { dispatch, clear } = useSnackbarNotifications()
  const navigate = useNavigate()

  useEffect(() => {
    if (item) dispatch({
      message: `'${item.title}' added to cart`,
      action: (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            clear()
            navigate(appRoutes.cart())
          }}
        >
          Show Cart
        </Button>
      ),
    })
  }, [item])

  return <></>
}

export default CartNotifications
