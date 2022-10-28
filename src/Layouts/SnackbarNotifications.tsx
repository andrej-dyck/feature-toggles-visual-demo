import Snackbar, { SnackbarOrigin, SnackbarProps } from '@mui/material/Snackbar'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { never } from '../api/never'

type Message = Readonly<{
  message: string
  action?: React.ReactNode
}>

const SnackbarNotifications: React.FC<{
  children: React.ReactNode
  anchor?: SnackbarOrigin
  transition?: TransitionComponent
  className?: string
}> = ({ children, anchor, transition, className }) => {
  const [messages, setMessages] = useState<(Message & Timestamped)[]>([])
  const [currentMessage, showMessage] = useState<(Message & Timestamped) | undefined>(undefined)

  const dispatch = (m: Omit<Message, 'timestamp'>) => {
    const timestampedMsg = timestamped(m)
    setMessages([...messages, timestampedMsg])
  }

  useEffect(() => {
    if (messages.length === 0) return

    if (currentMessage) { // close an active notification as a new one was added
      showMessage(undefined)
    } else { // show next message in the queue
      const [first, ...rest] = messages
      showMessage(first)
      setMessages(rest)
    }
  }, [messages])

  const clear = () => showMessage(undefined)

  const value = useMemo(() => ({ dispatch, clear }), [messages])
  return (
    <context.Provider value={value}>
      {children}
      <Snackbar
        key={currentMessage?.timestamp}
        message={currentMessage?.message}
        action={currentMessage?.action}
        open={currentMessage !== undefined}
        autoHideDuration={3000}
        onClose={clear}
        anchorOrigin={anchor}
        TransitionComponent={transition}
        className={className}
      />
    </context.Provider>
  )
}

type TransitionComponent = SnackbarProps['TransitionComponent']

export const useSnackbarNotifications = () =>
  useContext(context)
  ?? never(`${useSnackbarNotifications.name} must be used withing ${SnackbarNotifications.name}`)

const context = createContext<{
  dispatch: (message: Message) => void
  clear: () => void
} | undefined>(undefined)

type Timestamped = Readonly<{ timestamp: number }>
const timestamped = (message: Omit<Message, 'timestamp'>) => ({ ...message, timestamp: new Date().getTime() })

export default SnackbarNotifications
