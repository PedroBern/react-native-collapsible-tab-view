import { useMemo, Children, useState, useCallback } from 'react'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

import { Ref, TabName, TabReactElement, TabsWithProps } from './types'

export function useContainerRef() {
  return useAnimatedRef<ContainerRef>()
}

export function useTabRef() {
  return useAnimatedRef<RefComponent>()
}

export function useAnimatedDynamicRefs(): [
  Record<TabName, Ref<RefComponent>>,
  <T extends RefComponent>(key: TabName, ref: React.RefObject<T>) => Ref<T>
] {
  const [map, setMap] = useState<Record<TabName, Ref<RefComponent>>>({})
  const setRef = useCallback(function <T extends RefComponent>(
    key: TabName,
    ref: React.RefObject<T>
  ) {
    setMap((map) => ({ ...map, [key]: ref }))
    return ref
  },
  [])

  return [map, setRef]
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
