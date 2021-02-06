import { API, OverrideProps, Prop } from './types'

const fs = require('fs')
const path = require('path')
const docgen = require('react-docgen-typescript')

const generateMarkdown = require('./mdGenerator')
const { maybeOverrideProps } = require('./utils')

const options = {
  savePropValueAsString: true,
  propFilter: (prop: Prop, component: any) => {
    if (
      prop.parent ||
      component.name === 'Tabs.FlatList' ||
      component.name === 'Tabs.ScrollView' ||
      prop.name.startsWith('_')
    ) {
      return false
    }

    return true
  },
  componentNameResolver: (exp: any, _source: any) => {
    return exp.escapedName.startsWith('Use')
      ? exp.escapedName.replace('Use', 'use')
      : 'Tabs.' + exp.escapedName
  },
}

const tsconfig = path.join(__dirname, '../tsconfig.json')
const docs = docgen.withCustomConfig(tsconfig, options)

const basePath = path.join(__dirname, '../src')

const paths = {
  createCollapsibleTabs: path.join(basePath, 'createCollapsibleTabs.tsx'),
  createCollapsibleTabs_tmp: path.join(
    basePath,
    'createCollapsibleTabs_tmp.tsx'
  ),
}

const overrideProps: OverrideProps = {
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
    pagerProps: {
      type: {
        name:
          "Omit<FlatListProps<number>, 'data' | 'keyExtractor' | 'renderItem' | 'horizontal' | 'pagingEnabled' | 'onScroll' | 'showsHorizontalScrollIndicator' | 'getItemLayout'>",
      },
      defaultValue: null,
    },
    onIndexChange: {
      type: {
        name:
          '(data: { prevIndex: number index: number prevTabName: T tabName: T }) => void',
      },
      defaultValue: null,
    },
  },
}

// copy createCollapsibleTabs
const getCoreComponents = () => {
  fs.copyFileSync(paths.createCollapsibleTabs, paths.createCollapsibleTabs_tmp)
  let data = fs.readFileSync(paths.createCollapsibleTabs_tmp, 'utf-8')

  // remove HOC from createCollapsibleTabs
  let regex = new RegExp('const createCollapsibleTabs.*', 'gm')
  data = data.replace(regex, 'type T = string')

  // remove the hoc closing bracket
  regex = new RegExp('}(?=\n*const styles)', 'mg')
  data = data.replace(regex, '')

  // replace each hook
  regex = new RegExp('.*function useTabsContext.*', 'mg')
  data = data.replace(regex, 'function UseTabsContext(c: ContextType<T>) {')

  regex = new RegExp('.*function useTabNameContext.*', 'mg')
  data = data.replace(regex, 'function UseTabNameContext(c: {name: T}) {')

  regex = new RegExp('.*function useCollapsibleStyle.*', 'mg')
  data = data.replace(
    regex,
    'function UseCollapsibleStyle(c: CollapsibleStyle) {'
  )

  // export everything
  data +=
    'export { Container, Tab, Lazy, FlatList, ScrollView, UseTabsContext, UseCollapsibleStyle }'

  return data
}

const getCoreComponentsAPI = () => {
  const core = getCoreComponents()
  fs.writeFileSync(paths.createCollapsibleTabs_tmp, core)
  const core_docs = docs.parse(paths.createCollapsibleTabs_tmp)

  const md = core_docs
    .map((c: API) => {
      return generateMarkdown(maybeOverrideProps(c, overrideProps))
    })
    .join('\n')

  fs.unlink(paths.createCollapsibleTabs_tmp, (err: any) => {
    if (err) throw err
  })
  return md
}

module.exports = getCoreComponentsAPI

export {}
