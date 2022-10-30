import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { OpsFlag, ReleaseFlag } from './Flags'

export interface FeatureTogglesApi {
  retrieveToggles(): Promise<Toggles>

  saveToggle(flag: Flag, toggle: Toggle): Promise<boolean>

  resetToggles(): Promise<void>
}

export class Toggles {

  static EMPTY = new Toggles([])

  constructor(
    private readonly entries: { flag: Flag, toggle: Toggle }[]
  ) {}

  isActive(f: Flag): boolean {
    return this.isEnabled(f)
  }

  isEnabled(f: Flag): boolean {
    return this.by(f)?.enabled ?? false
  }

  by(f: Flag): Toggle | undefined {
    return this.entries.find(
      e => e.flag.type === f.type && e.flag.name === f.name
    )?.toggle
  }
}

export type Flag = ReleaseFlag | OpsFlag
export type Toggle = Readonly<{ enabled: boolean }>

export const useApiToggles = (api: FeatureTogglesApi): Query<Toggles> =>
  useQuery(['toggles'], () => api.retrieveToggles())

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
