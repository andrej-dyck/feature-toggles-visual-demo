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
}

const demoToggles = (): TogglesRecord => ({
  'release-flag': {
    'checkout-with-added-item-notification': { enabled: false },
    'quick-add-to-cart-button': { enabled: false },
    'show-order-process-steps': { enabled: false }
  },
  'ops-flag': {
    'demo1': { enabled: true },
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
