import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { FeatureTogglesApi, Flag, Toggle, Toggles } from './FeatureTogglesApi'

export const useApiToggles = (api: FeatureTogglesApi): Query<Toggles> =>
  useQuery(['toggles'], () => api.retrieveToggles(), {
    refetchOnWindowFocus: false // this is off for demo purposes
  })

export const useApiSaveToggle = (api: FeatureTogglesApi): {
  saveToggle: (flag: Flag, toggle: Toggle) => void
} & Query<{ saved: boolean }> => {
  const saveQuery = (arg: { flag: Flag, toggle: Toggle }) =>
    api.saveToggle(arg.flag, arg.toggle).then(saved => ({ saved }))

  const queryClient = useQueryClient()
  const { data, status, mutate } = useMutation(saveQuery, {
    onSuccess: ({ saved }) => {
      if (saved) queryClient.invalidateQueries(['toggles'])
    }
  })

  return {
    saveToggle: (flag, toggle) => mutate({ flag, toggle }),
    status,
    data,
  }
}

export const useApiResetToggles = (api: FeatureTogglesApi): {
  resetToggles: () => void
} & Query<void> => {
  const resetQuery = () => api.resetToggles()

  const queryClient = useQueryClient()
  const { data, status, mutate } = useMutation(resetQuery, {
    onSuccess: () => queryClient.invalidateQueries(['toggles'])
  })

  return { resetToggles: () => mutate(), status, data }
}
