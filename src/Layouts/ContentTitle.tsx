import { Skeleton, Typography } from '@mui/material'
import React from 'react'
import { Query } from '../api/Query'

const ContentTitle: React.FC<{
  text: string | Query<string>,
  marginBottom?: number
}> = ({ text, marginBottom }) => {

  const outputText =
    typeof text === 'string' ? text
      : text.status === 'loading' ? (<Skeleton variant="rounded" width={200} className="centered" />)
        : text.status === 'success' ? text.data ?? ''
          : ''

  if (!outputText) return (<></>)

  return (
    <div className="centered">
      <Typography variant="h5" marginBottom={marginBottom ?? 1} color="textSecondary">
        {outputText}
      </Typography>
    </div>
  )
}

export default ContentTitle
