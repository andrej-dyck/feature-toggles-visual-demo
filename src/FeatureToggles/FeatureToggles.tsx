import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { never } from '../api/never'
import { FeatureTogglesApi, Flag, Toggles, useApiToggles } from './FeatureTogglesApi'
import FeatureTogglesSettings from './FeatureTogglesSettings'

const FeatureToggles: React.FC<{
  children: React.ReactNode
  api: FeatureTogglesApi
}> = ({ children, api }) => {
  const [toggles, setToggles] = useState<Toggles>(Toggles.EMPTY)

  /* api query */
  const { data: apiToggles, status } = useApiToggles(api)
  useEffect(() => {
    if (apiToggles && status === 'success') setToggles(apiToggles)
  }, [apiToggles, status])

  /* context */
  const isToggleActive = (f: Flag) => toggles.isActive(f)
  const readFunctions = useMemo(() => ({ isToggleActive }), [toggles])

  return (
    <ReadContext.Provider value={readFunctions}>
      {children}
      <FeatureTogglesSettings api={api} toggles={toggles} />
    </ReadContext.Provider>
  )
}

export const useFeatureToggles = () =>
  useContext(ReadContext)
  ?? never(`${useFeatureToggles.name} must be used withing ${FeatureToggles.name}`)

export const useFeatureToggle = (f: Flag) => {
  const { isToggleActive } = useFeatureToggles()
  return { isActive: isToggleActive(f) }
}

const ReadContext = createContext<{
  isToggleActive: (flag: Flag) => boolean
} | undefined>(undefined)

export default FeatureToggles
