import { OverrideProps, API } from './types'

const path = require('path')

const generateMarkdown = require('./mdGenerator')

const maybeOverrideProps = (api: API, config?: OverrideProps) => {
  if (config && config[api.displayName]) {
    const newProps = {}
    Object.keys(api.props).forEach((key) => {
      if (config[api.displayName][key]) {
        // @ts-ignore
        newProps[key] = {
          ...api.props[key],
          ...config[api.displayName][key],
        }
      } else {
        // @ts-ignore
        newProps[key] = { ...api.props[key] }
      }
    })

    return {
      ...api,
      props: newProps,
    }
  } else return api
}

const writeDocs = (apis: API[], overrideProps?: OverrideProps) => {
  return apis
    .map((api: API) =>
      api.displayName.match(/function/i) === null
        ? generateMarkdown(maybeOverrideProps(api, overrideProps))
        : ''
    )
    .join('\n')
}

const basePath = path.join(__dirname, '../src')

const getComponentPaths = (fileNames: string[]) => {
  return fileNames.map((f) => path.join(basePath, f + '.tsx'))
}

module.exports = {
  maybeOverrideProps,
  writeDocs,
  getComponentPaths,
}

export {}
