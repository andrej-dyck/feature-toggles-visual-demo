import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import { useFeatureToggle } from '../FeatureToggles/FeatureToggles'
import { releaseFlag } from '../FeatureToggles/Flags'
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
  const { dispatch } = useSnackbarNotifications()
  const navigate = useNavigate()
  const { isActive: checkoutBtnEnabled } = useFeatureToggle(releaseFlag('checkout-with-added-item-notification'))

  useEffect(() => {
    if (item) dispatch({
      message: `'${item.title}' added to cart`,
      action: (<Stack direction="row" spacing={1}>
        <ActionButton text="Show Cart" onClick={() => navigate(appRoutes.cart())} />
        {checkoutBtnEnabled &&
          <ActionButton text="Checkout" color="secondary" onClick={() => navigate(appRoutes.checkout())} />
        }
      </Stack>),
    })
  }, [item])

  return <></>
}

const ActionButton: React.FC<{
  text: string
  onClick: () => void
  color?: 'primary' | 'secondary'
}> = ({ text, onClick, color }) => {
  const { clear } = useSnackbarNotifications()
  return (
    <Button
      variant="contained"
      color={color ?? 'primary'}
      size="small"
      onClick={() => {
        clear()
        onClick()
      }}
    >
      {text}
    </Button>
  )
}

export default CartNotifications
