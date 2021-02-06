import { OverrideProps, API } from './types'

const maybeOverrideProps = (api: API, config: OverrideProps) => {
  if (config[api.displayName]) {
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

module.exports = {
  maybeOverrideProps,
}

export {}
