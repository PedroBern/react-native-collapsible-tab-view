/**
 * nasty script to build a funky docs.
 */

const fs = require('fs')
const path = require('path')

const getCoreAPI = require('./getCoreAPI')
const getCoreComponentsAPI = require('./getCoreComponentsAPI')
const getQuickStartCode = require('./getQuickStartCode')
const getTabBarAPI = require('./getTabBarAPI')

const TEMPLATE = path.join(__dirname, 'README_TEMPLATE.md')
const README = path.join(__dirname, '..', 'README.md')

fs.copyFileSync(TEMPLATE, README)
let data = fs.readFileSync(README, 'utf-8')

const coreAPI = getCoreAPI()
const coreComponentsAPI = getCoreComponentsAPI()
const tabBarAPI = getTabBarAPI()
const quickStartCode = getQuickStartCode()

data = data.replace('$CORE_API', coreAPI)
data = data.replace('$CORE_COMPONENTS_API', coreComponentsAPI)
data = data.replace('$TAB_BAR_API', tabBarAPI)
data = data.replace('$QUICK_START_CODE', quickStartCode)

fs.writeFileSync(README, data)

export {}
