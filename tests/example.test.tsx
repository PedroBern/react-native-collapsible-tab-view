import React from 'react'
import renderer from 'react-test-renderer'

import Demo from './components/DemoComponent'

describe('<Demo />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Demo />).toJSON()
    // @ts-ignore
    expect(tree.children.length).toBe(1)
  })
})
