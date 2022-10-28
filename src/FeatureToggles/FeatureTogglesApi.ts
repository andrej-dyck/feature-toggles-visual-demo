import { useQuery } from '@tanstack/react-query'
import { Query } from '../api/Query'
import { OpsFlag, ReleaseFlag } from './Flags'

export interface FeatureTogglesApi {
  retrieveToggles(): Promise<Toggles>
}

export class Toggles {

  static EMPTY = new Toggles([])

  constructor(
    private readonly entries: { flag: Flag, toggle: Toggle }[]
  ) {}

  isActive(f: Flag): boolean {
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
