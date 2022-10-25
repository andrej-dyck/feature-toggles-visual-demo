import { ShoppingBag } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
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
