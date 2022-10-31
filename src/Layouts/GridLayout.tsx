import Grid from '@mui/material/Grid'
import React from 'react'

const GridLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const items = Array.isArray(children) ? children : [children]
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      spacing={1}
    >
      {items.map((c, i) => (<Grid item key={i}>{c}</Grid>))}
    </Grid>
  )
}

export default GridLayout
