const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, '../example/src/Shared/QuickStartDemo.tsx')

const getQuickStartCode = () => {
  const md = fs.readFileSync(file, 'utf-8')
  return md
}

module.exports = getQuickStartCode

export {}
