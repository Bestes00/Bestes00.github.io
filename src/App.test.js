import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

const setup = () => {
  const utils = render(<App />)
  const display = screen.getByRole('heading')
  const stepper = screen.getByRole('spinbutton')
  const add = screen.getByLabelText('plus')
  const subtract = screen.getByLabelText('minus')
    return {
      display, 
      stepper, 
      add,
      subtract, 
      ...utils
    }
}

// describe('App Renders', () => {
//   test('renders App component', () => {
//     setup()
//     // screen.debug()
//   })
// })

// checks that pressing the + button adds value
describe('+', () => {
  test('+ press increases by stepper amount', () => {
    const { stepper, display, add } = setup()

    expect(stepper.value).toBe('0')
    userEvent.type(stepper, '5')
    userEvent.click(add)
    expect(display).toHaveTextContent('5')
    expect(display).not.toHaveTextContent('6')
  })
})

describe('-', () => {
  test('- press decreases by stepper amount', () => {
    const { stepper, display, subtract } = setup()

    expect(stepper.value).toBe('0')
    userEvent.type(stepper, '5')
    userEvent.click(subtract)
    expect(display).toHaveTextContent('-5')
    expect(display).not.toHaveTextContent('-6')
  })
})

// Checks that the + and - button increase by the amount in the stepper.
describe('amounts', () => {
  test('checks that the + and - buttons increase display by correct amounts', () => {
    const { stepper, display, add, subtract } = setup()
    
    userEvent.type(stepper, '10')
    userEvent.click(add)
    expect(display).toHaveTextContent('10')
    userEvent.clear(stepper)
    userEvent.type(stepper, '50')
    userEvent.click(subtract)
    expect(display).toHaveTextContent('-40')
    userEvent.clear(stepper)
    userEvent.type(stepper, '560')
    userEvent.click(add)
    expect(display).toHaveTextContent('520')
    })
})

describe('colors', () => {
  test('checks that the color is orange when stepper > 10 and red when > 100', async () => {
    const { stepper } = setup()
    const container = stepper.parentElement.parentElement

    expect(container).toHaveClass('black')
    userEvent.type(stepper, '11')
    await waitFor(() => expect(container).toHaveClass('orange'))
    userEvent.clear(stepper)
    userEvent.type(stepper, '101')
    await waitFor(() => expect(container).toHaveClass('red'))
  })
})

// Checkes if values will surpass 1000 and checks to make sure it does nothing in the event.
describe('nothing if > 1000', () => {
  test('will check if adding stepper value will make display go over 1000', () => {
    const { stepper, display, add } = setup()

    userEvent.type(stepper, '999')
    userEvent.click(add)
    expect(display).toHaveTextContent('999')
    userEvent.clear(stepper)
    userEvent.type(stepper, '2')
    userEvent.click(add)
    expect(display).toHaveTextContent('999')
  })
})

describe('nothing if < -1000', () => {
  test('will check if subtracting stepper value will make display go under -1000', () => {
    const { stepper, display, subtract } = setup()

    userEvent.type(stepper, '999')
    userEvent.click(subtract)
    expect(display).toHaveTextContent('999')
    userEvent.clear(stepper)
    userEvent.type(stepper, '2')
    userEvent.click(subtract)
    expect(display).toHaveTextContent('-999')
  })
})