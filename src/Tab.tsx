import React from 'react'
import { ParamList } from './types'

export interface TabProps<T extends ParamList> {
  readonly name: T
  children: React.ReactNode
}

export function Tab<T extends ParamList>({ children }: TabProps<T>) {
  return <>{children}</>
}
