import React from 'react'

import { TabName, ContextType } from './types'

export const Context = React.createContext<ContextType<TabName> | undefined>(
  undefined
)
export const TabNameContext = React.createContext<TabName | undefined>(
  undefined
)
