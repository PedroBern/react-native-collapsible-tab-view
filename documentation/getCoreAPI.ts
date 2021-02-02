const path = require('path')

const getFunctionDocstring = require('./getFunctionDocstring')

const basePath = path.join(__dirname, '../src')

const inputFile = path.join(basePath, 'createCollapsibleTabs.tsx')
const functionName = 'createCollapsibleTabs'

const getCoreAPI = () => {
  let docs = '## ' + functionName + '\n\n'
  docs += getFunctionDocstring(inputFile, functionName)
  return docs
}

module.exports = getCoreAPI

export {}
