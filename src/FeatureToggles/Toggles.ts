import { Flag } from './Flags'

export type Toggle = Readonly<{
  enabled: boolean
  // conditions here are for demo purposes; api should provide is-active
  condition?: Partial<{
    startDate: Date
    endDate: Date
    canary: {
      percentageOfUsers: 0.1 | 0.2 | 0.3 | 0.4 | 0.5
    }
  }>
}>

const isActive = (t: Toggle, now: Date, random: () => number): boolean =>
  t.enabled
  && mapValueOr(t.condition?.startDate, start => new Date(start) <= now, true)
  && mapValueOr(t.condition?.endDate, end => new Date(end) > now, true)
  && mapValueOr(t.condition?.canary?.percentageOfUsers, p => random() < p, true)

const mapValueOr = <V, R>(maybeValue: V | undefined, transform: (v: V) => R, otherwise: R) =>
  maybeValue !== undefined ? transform(maybeValue) : otherwise

export class Toggles {

  static EMPTY = new Toggles([])

  constructor(
    entries: { flag: Flag, toggle: Toggle }[],
    now: Date = new Date()
  ) {
    this.entries = entries.map(e => (
      { ...e, isActiveSnapshot: isActive(e.toggle, now, Math.random) }
    ))
  }

  private readonly entries: { flag: Flag, toggle: Toggle, isActiveSnapshot: boolean }[]

  isActive(flag: Flag): boolean {
    return this.findBy(flag)?.isActiveSnapshot ?? false
  }

  private findBy(flag: Flag): { toggle: Toggle, isActiveSnapshot: boolean } | undefined {
    return this.entries.find(
      e => e.flag.type === flag.type && e.flag.name === flag.name
    )
  }

  isEnabled(flag: Flag): boolean {
    return this.by(flag)?.enabled ?? false
  }

  by(flag: Flag): Toggle | undefined {
    return this.findBy(flag)?.toggle
  }
}
