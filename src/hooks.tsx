import { useState, useMemo, Children } from 'react'
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
  <T extends RefComponent>(key: TabName) => undefined | Ref<T>,
  <T extends RefComponent>(key: TabName) => Ref<T>
] {
  const [map] = useState<Record<TabName, Ref<RefComponent>>>({})

  function setRef<T extends RefComponent>(key: TabName) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ref = useAnimatedRef<T>()
    map[key] = ref
    return ref
  }
  function getRef<T extends RefComponent>(key: TabName) {
    return map[key] as Ref<T>
  }

  return [getRef, setRef]
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
