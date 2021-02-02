const fs = require('fs')
const path = require('path')
const docgen = require('react-docgen-typescript')

const generateMarkdown = require('./mdGenerator')

const options = {
  savePropValueAsString: true,
  propFilter: (_prop: any, component: any) => {
    if (
      component.name === 'Tabs.FlatList' ||
      component.name === 'Tabs.ScrollView' ||
      component.name === 'useTabNameContext'
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

  // add hooks as components
  data += `
    const UseTabsContext = (c: ContextType<T>) => null,
    const UseTabNameContext = (c: {name: T}) => null,
    const UseCollapsibleStyle = (c: CollapsibleStyle) => null,
  `

  // export everything
  data +=
    'export { Container, Lazy, FlatList, ScrollView, UseTabsContext, UseCollapsibleStyle }'

  return data
}

const getCoreComponentsAPI = () => {
  const core = getCoreComponents()  
  fs.writeFileSync(paths.createCollapsibleTabs_tmp, core)
  const core_docs = docs.parse(paths.createCollapsibleTabs_tmp)
  const md = core_docs.map((c: string) => generateMarkdown(c)).join('\n')
  fs.unlink(paths.createCollapsibleTabs_tmp, (err: any) => {
    if (err) throw err
  })
  return md
}

module.exports = getCoreComponentsAPI

export {}
