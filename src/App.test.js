import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

const setup = () => {
  const { container } = render(<App />)
  const display = screen.getByRole('heading')
  const stepper = screen.getByRole('spinbutton')
  const add = screen.getByRole('button', { name: 'plus' })
  const subtract = screen.getByRole('button', { name: 'minus' })
  const increaseStepper = screen.getByRole('button', { name: 'Increase Value' })
  const decreaseStepper = screen.getByRole('button', { name: 'Decrease Value' })
  return {
    display, 
    stepper, 
    add,
    subtract,
    increaseStepper,
    decreaseStepper,
    container
  }
}

describe('Check Render', () => {
  test('Checks app is rendered to DOM', () => {
    const { container } = setup()
    expect(container.firstChild).toBeInTheDocument()
    screen.getByRole('')
  })
})

describe('Initial values', () => {
  test('Checks buttons to ensure there are no wrong intial values', () => {
    const { display, add, subtract } = setup()
    userEvent.click(add)
    expect(display).toHaveTextContent('0')
    userEvent.click(subtract) 
    expect(display).toHaveTextContent('0')
  })
})

describe('Stepper Values', () => {
  test('Changes stepper values accordingly', () => {
    const { increaseStepper, decreaseStepper, stepper } = setup()
    expect(stepper.value).toBe('0')
    userEvent.click(increaseStepper)
    expect(stepper.value).toBe('1')
    userEvent.click(increaseStepper)
    userEvent.click(increaseStepper)
    userEvent.click(increaseStepper)
    expect(stepper.value).toBe('4')
    userEvent.click(decreaseStepper)
    userEvent.click(decreaseStepper)
    userEvent.click(decreaseStepper)
    userEvent.click(decreaseStepper)
    expect(stepper.value).toBe('0')
    userEvent.click(decreaseStepper)
    expect(stepper.value).toBe('0')
  })
})

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