import Favorite from '@mui/icons-material/Favorite'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Badge from '@mui/material/Badge'
import { red } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import { useState } from 'react'
import { useFeatureToggle } from '../FeatureToggles/FeatureToggles'
import { releaseFlag } from '../FeatureToggles/Flags'
import SnackbarNotifications, { useSnackbarNotifications } from '../Layouts/SnackbarNotifications'

export const FavoritesMenuIcon: React.FC = () => {
  const { isActive } = useFeatureToggle(releaseFlag('wip-favorites-feature'))

  return isActive ? (
    <SnackbarNotifications anchor={{ vertical: 'top', horizontal: 'right' }}>
      <FavoritesIconButton />
    </SnackbarNotifications>
  ) : <></>
}

const FavoritesIconButton: React.FC = () => {
  const { dispatch } = useSnackbarNotifications()
  return (
    <IconButton
      aria-label="Favorites Menu"
      edge="end"
      color="inherit"
      onClick={() => dispatch({ message: '👷‍♀ This is an unfinished feature!' })}
    >
      <Badge color="secondary" variant="dot">
        <FavoriteBorder />
      </Badge>
    </IconButton>
  )
}

export const FavoriteProductIcon: React.FC = () => {
  const { isActive } = useFeatureToggle(releaseFlag('wip-favorites-feature'))
  const [isFavorite, setFavorite] = useState(false)
  const color = isActive ? red[900] : 'disabled'

  return (
    <IconButton
      aria-label="add to favorites"
      disabled={!isActive}
      onClick={() => setFavorite(t => !t)}
    >
      {isFavorite
        ? (<Favorite sx={{ color }} />)
        : (<FavoriteBorder sx={{ color }} />)}
    </IconButton>
  )
}
