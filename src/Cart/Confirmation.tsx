import ShoppingBag from '@mui/icons-material/ShoppingBag'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { appRoutes } from '../AppRoutes'
import ContentTitle from '../Layouts/ContentTitle'
import './Confirmation.css'

const Confirmation: React.FC = () => {
  const navigate = useNavigate()

  return (
    <Stack direction="column" spacing={1} className="container">
      <ContentTitle text="Congratulations, on your purchase! 🥳" />
      <Typography variant="body1">
        The order has been received and is being processed.
      </Typography>
      <Button variant="outlined"
              startIcon={<ShoppingBag />}
              onClick={() => navigate(appRoutes.root)}
              className="action">
        Continue shopping
      </Button>
    </Stack>
  )
}

export default Confirmation
