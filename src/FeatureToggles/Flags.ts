/**
 * Release Flags
 *
 * - These are used to toggle new, in-complete, or changed features (short-lived; days-weeks)
 * - They allow to integrate in-progress changes into the main branch
 *   while it still can be deployed to production at any time
 * - They provide a kill-switch for released features
 * - Retire and remove release flags as soon as the feature is stable
 *
 *   "separating [feature] release from [code] deployment."
 */
export const ReleaseFlags = [
  { name: 'checkout-with-added-item-notification' },
  { name: 'quick-add-to-cart-button' },
  { name: 'show-order-process-steps' },
] as const

export type ReleaseFlag = typeof ReleaseFlags[number] & { type: 'release-flag' }

export const releaseFlag = (name: ReleaseFlag['name']): ReleaseFlag => ({ name, type: 'release-flag' })

/**
 * Ops Flags
 *
 * - These are used to toggle new features with unclear implications (long-lived; months-years)
 * - They allow operators to quickly react to production issues
 * - Or can be used as part of a configuration
 * - Retire and remove ops flags as soon as confidence in operations is gained
 */
export const OpsFlags = [
  { name: 'demo1' },
] as const

export type OpsFlag = typeof OpsFlags[number] & { type: 'ops-flag' }

export const opsFlag = (name: OpsFlag['name']): OpsFlag => ({ name, type: 'ops-flag' })

/**
 * Here, I omit flags for Experiment and Permission toggles as one can argue that
 * - Experiment toggles can be seen as a subset of Release toggles
 * - and Permission toggles can be seen as a subset of Ops toggles
 */
