import Skeleton from '@mui/material/Skeleton'
import React from 'react'
import GridLayout from './GridLayout'

const GridSkeleton: React.FC<{ n: number, width: number, height: number }> = ({ n, width, height }) =>
  <GridLayout>
    {Array.from({ length: n }, (_, i) =>
      <Skeleton key={i} variant="rounded" width={width} height={height} />)
    }
  </GridLayout>

export default GridSkeleton
