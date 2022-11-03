import Skeleton from '@mui/material/Skeleton'
import Typography from '@mui/material/Typography'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFeatureToggle } from '../FeatureToggles/FeatureToggles'
import { releaseFlag } from '../FeatureToggles/Flags'
import SnackbarNotifications, { useSnackbarNotifications } from '../Layouts/SnackbarNotifications'

const Recommendations: React.FC<{ sku: string | undefined }> = ({ sku }) => {
  const { isActive } = useFeatureToggle(releaseFlag('buggy-product-recommendations'))

  return isActive && sku !== undefined ? (
    <SnackbarNotifications anchor={{ vertical: 'bottom', horizontal: 'center' }}>
      <BuggyRecommendations sku={sku} />
    </SnackbarNotifications>
  ) : <></>
}

const BuggyRecommendations: React.FC<{ sku: string }> = ({ sku }) => {
  const { dispatch } = useSnackbarNotifications()
  const { status } = useQuery(['recommendations', sku],
    () => new Promise((_, reject) => setTimeout(() => reject('api call failed'), 1000)),
    { refetchOnWindowFocus: false, refetchOnMount: false }
  )

  useEffect(() => {
    if (status === 'error') dispatch({ message: 'Something went wrong with recommendations 🐛' })
  }, [status])

  return status === 'loading' ? (
    <div>
      <Typography variant="h6" color="text.secondary">Recommendations</Typography>
      <Skeleton variant="rounded" width="100%" height={150} />
    </div>
  ) : <>{ /* nothing as it is buggy */}</>
}

export default Recommendations
