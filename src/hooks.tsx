import { useState, useMemo, Children } from 'react'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

import { TabProps } from './Tab'
import { ParamList, FinalTabOptions } from './types'

export const useContainerRef = () => {
  return useAnimatedRef<ContainerRef>()
}

export const useTabRef = () => {
  return useAnimatedRef<RefComponent>()
}

export const useRefMap = (tabIds: readonly ParamList[]) => {
  const refs = tabIds.reduce(
    // this is fine to ignore, our number of tabs shouldn't change
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (refs, tabId) => ({ ...refs, [tabId]: useTabRef() }),
    {} as Record<ParamList, React.RefObject<RefComponent>>
  )

  const [refMap] = useState(refs)
  return refMap
}

export const useTabOptions = <T extends ParamList>(
  children: React.ReactElement<TabProps<T>>
) => {
  const options = useMemo(() => {
    // @ts-ignore
    const tabOptions: FinalTabOptions<T> = {}
    Children.forEach(children, (element, index) => {
      const { options, name } = element.props
      tabOptions[name] = {
        index,
        ...options,
      }
    })
    return tabOptions
  }, [children])
  return options
}
