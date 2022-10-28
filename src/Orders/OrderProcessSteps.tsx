import Box from '@mui/material/Box'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'
import React from 'react'
import './OrderProcessSteps.css'

const OrderProcessSteps: React.FC<{ activeStep: 0 | 1 | 2 }> = ({ activeStep }) =>
  <Box sx={{ width: '100%', maxWidth: 600 }} className="stepper-margin">
    <Stepper activeStep={activeStep}>
      <Step><StepLabel>Shopping Cart</StepLabel></Step>
      <Step><StepLabel>Checkout</StepLabel></Step>
      <Step completed={activeStep === 2}><StepLabel>Confirmation</StepLabel></Step>
    </Stepper>
  </Box>

export default OrderProcessSteps
