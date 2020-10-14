import React from 'react'
import { create, act } from 'react-test-renderer'
import ProfileStatus from './ProfileStatus'

// describe('Status component', () => {
//   test('Matches the snapshot', () => {
//     const app = create(<ProfileStatus />)
//     expect(app.toJSON()).toMatchSnapshot()
//   })
// })

describe("ProfileStatus component", () => {

  test('status from props should be displayed in span', () => {
    const component = create(<ProfileStatus status='matrix' />)
    const instance = component.root
    const span = instance.findByType("span")
    expect(span.props.children).toBe('matrix')
  })

  test('after creation span should be contains correct status', () => {
    const component = create(<ProfileStatus status='matrix' />)
    const instance = component.root
    const span = instance.findByType('span')
    expect(span).not.toBeNull()
  })

  test('after creation input should"t be displayed', () => {
    const component = create(<ProfileStatus status='matrix' />)
    const instance = component.root
    expect(() => {
      const input = instance.findByType('input');
    }).toThrow()
  })

  test('input should be displayed in editMode instead of span', () => {
    const component = create(<ProfileStatus status='matrix' />)
    const instance = component.root
    const span = instance.findByType('span')
    act(()=> {
      span.props.onClick()
    })
    const input = instance.findByType('input')
    
    expect(input.props.value).toBe('matrix')
  })

  // test('callback should be colled', () => {
  //   const mockCallback = jest.fn(status => !status)
    
  //   const component = create(<ProfileStatus status='matrix' updateStatus={mockCallback} />)
    
  //   const instance = component.root
  //   const span = instance.findByType('span')
  //   act(()=> {
  //     span.props.onClick()
  //   })
  //   expect(mockCallback.mock.calls.length).toBe(1)
  // })
})