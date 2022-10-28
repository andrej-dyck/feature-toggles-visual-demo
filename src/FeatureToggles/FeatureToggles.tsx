import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { never } from '../api/never'
import { FeatureTogglesApi, Flag, Toggles, useApiToggles } from './FeatureTogglesApi'

const FeatureToggles: React.FC<{
  children: React.ReactNode
  api: FeatureTogglesApi
}> = ({ children, api }) => {
  const [toggles, setToggles] = useState<Toggles>(Toggles.EMPTY)
  const { data: apiToggles, status } = useApiToggles(api)

  useEffect(() => {
    if (apiToggles && status === 'success') setToggles(apiToggles)
  }, [apiToggles, status])

  const isToggleActive = (f: Flag) => toggles.isActive(f)

  const value = useMemo(() => ({ isToggleActive }), [toggles])
  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )
}

export const useFeatureToggles = () =>
  useContext(context)
  ?? never(`${useFeatureToggles.name} must be used withing ${FeatureToggles.name}`)

export const useFeatureToggle = (f: Flag) => {
  const { isToggleActive } = useFeatureToggles()
  return { isActive: isToggleActive(f) }
}

const context = createContext<{
  isToggleActive: (flag: Flag) => boolean
} | undefined>(undefined)

export default FeatureToggles
