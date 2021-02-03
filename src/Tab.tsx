import React from 'react'

import { ParamList, TabOptions } from './types'

export type TabProps<T extends ParamList> = {
  readonly name: T
  readonly options?: TabOptions
  children: React.ReactNode
}

export function Tab<T extends ParamList>({ children }: TabProps<T>) {
  return <>{children}</>
}
