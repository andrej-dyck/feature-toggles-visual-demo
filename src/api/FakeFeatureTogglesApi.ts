import { FeatureTogglesApi, Flag, Toggle, Toggles } from '../FeatureToggles/FeatureTogglesApi'
import { OpsFlag, ReleaseFlag } from '../FeatureToggles/Flags'
import { LocalStorage } from './LocalStorage'

export class FakeFeatureTogglesApi implements FeatureTogglesApi {

  constructor(
    private readonly localStorage = new LocalStorage(),
    private readonly toggles = demoToggles
  ) {}

  retrieveToggles(): Promise<Toggles> {
    return Promise.resolve(parse(this.record()))
  }

  private record(): TogglesRecord {
    return this.localStorage.retrieveOrSave<TogglesRecord>('toggles', () => this.toggles())
  }

  saveToggle(flag: Flag, toggle: Toggle): Promise<boolean> {
    const record = this.record()// as Record<string, Record<string, Toggle>>
    this.saveRecord({
      ...record,
      [flag.type]: {
        ...(record[flag.type] ?? {}),
        [flag.name]: toggle
      }
    })

    return Promise.resolve(true)
  }

  private saveRecord(record: TogglesRecord): void {
    this.localStorage.saveRecord('toggles', record)
  }

  resetToggles(): Promise<void> {
    this.localStorage.removeRecord('toggles')
    return Promise.resolve(undefined)
  }
}

const demoToggles = (): TogglesRecord => ({
  'release-flag': {
    'quick-add-to-cart-button': { enabled: false, condition: {
      canary: { percentageOfUsers: 0.3 }
    } },
    'checkout-with-added-item-notification': { enabled: false },
    'show-order-process-steps': { enabled: true },
    'wip-favorites-feature': { enabled: false },
  },
  'ops-flag': {
    'google-pay-button': { enabled: false },
    'black-friday-deals': { enabled: true, condition: {
      startDate: new Date(Date.parse('2022-11-25 00:00:00')),
      endDate: new Date(Date.parse('2022-11-26 00:00:00'))
    } },
  }
})

type TogglesRecord =
  Record<ReleaseFlag['type'], Record<ReleaseFlag['name'], Toggle>>
  & Record<OpsFlag['type'], Record<OpsFlag['name'], Toggle>>

const parse = (record: TogglesRecord) => new Toggles(
  Object.entries(record).flatMap(
    ([type, toggles]) => Object.entries(toggles)
      .map(([name, toggle]) => ({ flag: { type, name } as Flag, toggle }))
  )
)
