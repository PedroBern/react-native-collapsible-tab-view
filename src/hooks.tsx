import { useState } from 'react'
import { ContainerRef, RefComponent } from 'react-native-collapsible-tab-view'
import { useAnimatedRef } from 'react-native-reanimated'

export const useContainerRef = () => {
  return useAnimatedRef<ContainerRef>()
}

export const useTabRef = () => {
  return useAnimatedRef<RefComponent>()
}

export const useRefMap = (tabIds: readonly string[]) => {
  const refs = tabIds.reduce(
    // this is fine to ignore, our number of tabs shouldn't change
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (refs, tabId) => ({ ...refs, [tabId]: useTabRef() }),
    {} as Record<string, React.RefObject<RefComponent>>
  )

  const [refMap] = useState(refs)
  return refMap
}
