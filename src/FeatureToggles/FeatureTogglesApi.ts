import { OpsFlag, ReleaseFlag } from './Flags'

export interface FeatureTogglesApi {
  retrieveToggles(): Promise<Toggles>

  saveToggle(flag: Flag, toggle: Toggle): Promise<boolean>

  resetToggles(): Promise<void>
}

export type Flag = ReleaseFlag | OpsFlag
export type Toggle = Readonly<{ enabled: boolean }>

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

export * from './useFeatureTogglesApi'
