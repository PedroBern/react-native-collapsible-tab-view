import { Prop, OverrideProps } from './types'

const fs = require('fs')
const path = require('path')
const docgen = require('react-docgen-typescript')

const { writeDocs, getComponentPaths } = require('./utils')

const TEMPLATE = path.join(__dirname, 'README_TEMPLATE.md')
const README = path.join(__dirname, '..', 'README.md')
const QUICK_START = path.join(
  __dirname,
  '../example/src/Shared/QuickStartDemo.tsx'
)
const tsconfig = path.join(__dirname, '../tsconfig.json')

const coreComponents = getComponentPaths([
  'Container',
  'Tab',
  'Lazy',
  'FlatList',
  'ScrollView',
])

const tabBarComponents = getComponentPaths([
  'MaterialTabBar/TabBar',
  'MaterialTabBar/TabItem',
])

const docs = docgen.withCustomConfig(tsconfig, {
  savePropValueAsString: true,
  propFilter: (prop: Prop, component: any) => {
    // skip props from `...rest` or private props
    if (
      prop.parent ||
      component.name === 'Tabs.FlatList' ||
      component.name === 'Tabs.ScrollView' ||
      prop.name.startsWith('_')
    )
      return false
    return true
  },
  componentNameResolver: (exp: { escapedName: string }, _source: any) => {
    const name = exp.escapedName
    switch (name) {
      case 'Container':
      case 'Tab':
      case 'Lazy':
      case 'FlatList':
      case 'ScrollView':
        return 'Tabs.' + exp.escapedName

      default:
        // fix hooks names
        return name.startsWith('Use') ? name.replace('Use', 'use') : name
    }
  },
})

// Some props are resolved very weird, so we manually define some of them here.
const overrideProps: OverrideProps = {
  MaterialTabBar: {
    TabItemComponent: {
      type: {
        name: '(props: MaterialTabItemProps<N>) => React.ReactElement',
      },
      defaultValue: { value: 'MaterialTabItem' },
    },
  },
  MaterialTabItem: {
    style: {
      type: {
        name: 'StyleProp<ViewStyle>',
      },
      defaultValue: null,
    },
  },
  'Tabs.Container': {
    HeaderComponent: {
      type: {
        name:
          '((props: TabBarProps<T>) => React.ReactElement) | null | undefined',
      },
      defaultValue: null,
    },
    TabBarComponent: {
      type: {
        name:
          '((props: TabBarProps<T>) => React.ReactElement) | null | undefined',
      },
      defaultValue: { value: 'MaterialTabBar' },
    },
    renderHeaderComponent: {
      type: {
        name: '(props: TabBarProps<TabName>) => React.ReactElement | null',
      },
      defaultValue: null,
    },
    renderTabBarComponent: {
      type: {
        name: '(props: TabBarProps<TabName>) => React.ReactElement | null',
      },
      defaultValue: {
        value: '(props: TabBarProps<TabName>) => MaterialTabBar',
      },
    },
    pagerProps: {
      type: {
        name:
          "Omit<FlatListProps<number>, 'data' | 'keyExtractor' | 'renderItem' | 'horizontal' | 'pagingEnabled' | 'onScroll' | 'showsHorizontalScrollIndicator' | 'getItemLayout'>",
      },
      defaultValue: null,
    },
    onTabChange: {
      type: {
        name:
          '(data: { prevIndex: number index: number prevTabName: T tabName: T }) => void',
      },
      defaultValue: null,
    },
  },
}

const getAPI = (paths: string[]) => {
  let md = ''
  paths.forEach((path) => {
    const api = docs.parse(path)
    md += writeDocs(api, overrideProps)
  })
  return md
}

const getQuickStartCode = () => {
  const code = fs.readFileSync(QUICK_START, 'utf-8')
  return code
}

const quickStartCode = getQuickStartCode()
const coreAPI = getAPI(coreComponents)
const tabBarAPI = getAPI(tabBarComponents)

fs.copyFileSync(TEMPLATE, README)
let data = fs.readFileSync(README, 'utf-8')

data = data.replace('$QUICK_START_CODE', quickStartCode)
data = data.replace('$CORE_API', coreAPI)
data = data.replace('$TAB_BAR_API', tabBarAPI)

fs.writeFileSync(README, data)

export {}
