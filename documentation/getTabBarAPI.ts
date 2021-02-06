import { API, Prop, OverrideProps } from './types'

const path = require('path')
const docgen = require('react-docgen-typescript')

const generateMarkdown = require('./mdGenerator')
const { maybeOverrideProps } = require('./utils')
const basePath = path.join(__dirname, '../src/MaterialTabBar')

const paths = {
  TabBar: path.join(basePath, 'TabBar.tsx'),
  TabItem: path.join(basePath, 'TabItem.tsx'),
}

const options = {
  savePropValueAsString: true,
  propFilter: (prop: Prop, _component: any) => {
    if (prop.parent || prop.name.startsWith('_')) return false
    return true
  },
  componentNameResolver: (exp: any, _source: any) => {
    return 'Material' + exp.escapedName
  },
}

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
}

const tsconfig = path.join(__dirname, '../tsconfig.json')
const docs = docgen.withCustomConfig(tsconfig, options)

const getTabBarAPI = () => {
  let md = ''

  const tabBarDocs = docs.parse(paths.TabBar)
  const TabItemDocs = docs.parse(paths.TabItem)

  md += tabBarDocs
    .map((c: API) =>
      c.displayName.match(/function/i) === null
        ? generateMarkdown(maybeOverrideProps(c, overrideProps))
        : ''
    )
    .join('\n')
  md += TabItemDocs.map((c: API) =>
    c.displayName.match(/function/i) === null
      ? generateMarkdown(maybeOverrideProps(c, overrideProps))
      : ''
  ).join('\n')

  return md
}

module.exports = getTabBarAPI

export {}
