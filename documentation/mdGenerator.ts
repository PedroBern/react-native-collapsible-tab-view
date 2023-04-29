import { Prop, API, Props } from './types'

const escape = (s: any) => {
  if (typeof s === 'string') {
    return s.split('|').join('\\|')
  }
  return s
}

function generateProp(
  propName: string,
  prop: Prop,
  skipDefaults: boolean,
  skipDescription: boolean
) {
  let description = prop.description

  if (prop.description && prop.description.indexOf('\n') > -1) {
    description = prop.description.split('\n').join(' ')
    description = description.replace(/\s+/gm, ' ')
  }

  let md = ''
  md = `|\`${propName}\`|\``
  md += `${escape(prop.type.name)}\`|`
  md += skipDefaults
    ? ''
    : `${prop.defaultValue ? '`' + escape(prop.defaultValue.value) + '`' : ''}|`
  md += skipDescription ? '' : `${escape(description)}|`

  return md
}

function generateProps(props: Props, isHook: boolean) {
  const skipDefaults =
    Object.keys(props)
      .map((p) => props[p].defaultValue)
      .filter((v) => v !== null).length === 0
  const skipDescription =
    Object.keys(props)
      .map((p) => props[p].description)
      .filter((v) => v !== '').length === 0

  let md = ''
  md += `#### ${isHook ? 'Values' : 'Props'}`
  md += '\n\n'
  md += '|name|type|'
  md += skipDefaults ? '' : 'default|'
  md += skipDescription ? '' : 'description|'
  md += '\n'
  md += '|:----:|:----:|'
  md += skipDefaults ? '' : ':----:|'
  md += skipDescription ? '' : ':----:|'
  md += '\n'
  md += Object.keys(props)
    .sort()
    .map(function (propName) {
      return generateProp(
        propName,
        props[propName],
        skipDefaults,
        skipDescription
      )
    })
    .join('\n')

  return md
}

function generateMarkdown(api: API) {
  let markdownString = '### ' + api.displayName + '\n\n'
  if (api.description) {
    markdownString += api.description + '\n\n'
  }
  if (Object.keys(api.props).length > 0) {
    markdownString +=
      generateProps(api.props, api.displayName.startsWith('use')) + '\n\n'
  }

  return markdownString
}

module.exports = generateMarkdown

export {}
