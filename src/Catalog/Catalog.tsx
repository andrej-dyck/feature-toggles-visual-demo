import { Skeleton } from '@mui/material'
import React from 'react'
import './Catalog.css'

const Catalog: React.FC = () => {
  return (
    <div className="Catalog">
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </div>
  )
}

export default Catalog
