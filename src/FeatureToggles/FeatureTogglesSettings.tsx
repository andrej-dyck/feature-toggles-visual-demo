import Settings from '@mui/icons-material/Settings'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import React, { useMemo, useState } from 'react'
import { FeatureTogglesApi, Flag, Toggles, useApiSaveToggle } from './FeatureTogglesApi'
import { opsFlag, OpsFlag, OpsFlags, releaseFlag, ReleaseFlag, ReleaseFlags } from './Flags'
import './FeatureTogglesSettings.css'

const FeatureTogglesSettings: React.FC<{
  api: FeatureTogglesApi
  toggles: Toggles
}> = ({ api, toggles }) => {
  const [drawerState, toggleDrawer] = useState<'open' | 'closed'>('closed')

  return (<>
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
      <IconButton
        edge="end"
        color="secondary"
        aria-label="Feature Toggles"
        size="large"
        onClick={() => toggleDrawer('open')}
      >
        <Settings />
      </IconButton>
    </Box>
    <Drawer
      anchor="bottom"
      open={drawerState === 'open'}
      onClose={() => toggleDrawer('closed')}
    >
      <Box sx={{ minHeight: 400, maxHeight: 600 }} className="drawer-content">
        <TogglesPanel api={api} toggles={toggles} />
      </Box>
    </Drawer>
  </>)
}

const TogglesPanel: React.FC<{
  api: FeatureTogglesApi
  toggles: Toggles
}> = ({ api, toggles }) => {
  const [tabIndex, changeTabIndex] = React.useState<0 | 1>(0)

  const releaseFlags = useMemo(() => ReleaseFlags.map(f => releaseFlag(f.name)), [])
  const opsFlags = useMemo(() => OpsFlags.map(f => opsFlag(f.name)), [])

  return (<>
    <Tabs
      value={tabIndex}
      onChange={(_, i) => changeTabIndex(i)}
      indicatorColor="secondary"
      textColor="inherit"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab label="Release Toggles" id="release-toggles" />
      <Tab label="Ops Toggles" id="ops-toggles" />
    </Tabs>
    <TabPanel id="release-toggles" hidden={tabIndex !== 0}>
      <ToggleSwitches flags={releaseFlags} api={api} toggles={toggles} />
    </TabPanel>
    <TabPanel id="ops-toggles" hidden={tabIndex !== 1}>
      <ToggleSwitches flags={opsFlags} api={api} toggles={toggles} />
    </TabPanel>
  </>)
}

const TabPanel: React.FC<{ id: string, hidden: boolean, children: React.ReactNode }> = ({ id, hidden, children }) =>
  <div role="tabpanel" id={id} hidden={hidden} className="toggles-panel">
    {children}
  </div>

const ToggleSwitches: React.FC<{
  flags: ReleaseFlag[] | OpsFlag[]
  api: FeatureTogglesApi
  toggles: Toggles
}> = ({ flags, api, toggles }) => {
  const { saveToggle } = useApiSaveToggle(api)

  const handleSwitch = (f: Flag, enabled: boolean) => saveToggle(f, { enabled })

  return (
    <Stack spacing={2}>
      {flags.map((f, i) => (<span key={i} className="toggle-switch">
        <Switch
          checked={toggles.isEnabled(f)}
          onChange={e => handleSwitch(f, e.target.checked)}
          color="secondary"
        />
        <Typography variant="body1">{f.name}</Typography>
      </span>))}
    </Stack>
  )
}

export default FeatureTogglesSettings
