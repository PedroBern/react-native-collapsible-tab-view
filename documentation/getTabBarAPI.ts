const path = require('path')
const docgen = require('react-docgen-typescript')

const generateMarkdown = require('./mdGenerator')

const basePath = path.join(__dirname, '../src/MaterialTabBar')

const paths = {
  TabBar: path.join(basePath, 'TabBar.tsx'),
  TabItem: path.join(basePath, 'TabItem.tsx'),
}

const options = {
  savePropValueAsString: true,
  propFilter: (prop: any, _component: any) => {
    if (prop.parent) return false
    return true
  },
  componentNameResolver: (exp: any, _source: any) => {
    return 'Material' + exp.escapedName
  },
}

const tsconfig = path.join(__dirname, '../tsconfig.json')
const docs = docgen.withCustomConfig(tsconfig, options)

const getTabBarAPI = () => {
  let md = ''

  const tabBarDocs = docs.parse(paths.TabBar)
  const TabItemDocs = docs.parse(paths.TabItem)

  md += tabBarDocs
    .map((c: { displayName: string }) =>
      c.displayName.match(/function/i) === null ? generateMarkdown(c) : ''
    )
    .join('\n')
  md += TabItemDocs.map((c: { displayName: string }) =>
    c.displayName.match(/function/i) === null ? generateMarkdown(c) : ''
  ).join('\n')

  return md
}

module.exports = getTabBarAPI

export {}
