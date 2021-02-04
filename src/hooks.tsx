import { useState, useMemo, Children } from 'react'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

import { TabName, TabReactElement, TabsWithProps } from './types'

export function useContainerRef() {
  return useAnimatedRef<ContainerRef>()
}

export function useTabRef() {
  return useAnimatedRef<RefComponent>()
}

export function useRefMap(tabIds: readonly TabName[]) {
  const refs = tabIds.reduce(
    // this is fine to ignore, our number of tabs shouldn't change
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (refs, tabId) => ({ ...refs, [tabId]: useTabRef() }),
    {} as Record<TabName, React.RefObject<RefComponent>>
  )

  const [refMap] = useState(refs)
  return refMap
}

export function useTabProps<T extends TabName>(
  children: TabReactElement<T>[] | TabReactElement<T>,
  tabType: Function
) {
  const options = useMemo(() => {
    const tabOptions: TabsWithProps<T> = new Map()
    Children.forEach(children, (element, index) => {
      if (element.type !== tabType)
        throw new Error(
          'Container children must be wrapped in a <Tabs.Tab ... /> component'
        )
      const { name, ...options } = element.props
      tabOptions.set(name, {
        index,
        name,
        ...options,
      })
    })
    return tabOptions
  }, [children, tabType])
  return options
}
