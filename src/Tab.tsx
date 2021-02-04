import React from 'react'

import { TabName } from './types'

export type TabProps<T extends TabName> = {
  readonly name: T
  label?: string
  children: React.ReactNode
}

/**
 * This is just a wrapper component so we can capture its props,
 * which React will make available to us
 * @param param0 props
 */
export function Tab<T extends TabName>({ children }: TabProps<T>) {
  return <>{children}</>
}
