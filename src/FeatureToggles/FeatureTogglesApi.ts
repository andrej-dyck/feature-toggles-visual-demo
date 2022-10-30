import { Flag } from './Flags'
import { Toggle, Toggles } from './Toggles'

export interface FeatureTogglesApi {
  retrieveToggles(): Promise<Toggles>

  saveToggle(flag: Flag, toggle: Toggle): Promise<boolean>

  resetToggles(): Promise<void>
}

export * from './Flags'
export * from './Toggles'
export * from './useFeatureTogglesApi'
