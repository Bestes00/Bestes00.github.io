import React, { Component } from 'react'

import Display from '../src/features/Display'
import Stepper from '../src/features/Stepper'


class App extends Component {
  state = {
    currentNumber: 0,
    currentStepper: 0
  }

  increaseCurrentNumber = () => {
    if (this.state.currentNumber + this.state.currentStepper <= 1000) {
      this.setState((state) => {
        return { currentNumber: state.currentNumber + state.currentStepper }
      })
    }
  }

  decreaseCurrentNumber = () => {
    if (this.state.currentNumber - this.state.currentStepper >= -1000) {
      this.setState((state) => {
        return { currentNumber: state.currentNumber - state.currentStepper }
      })
    }
  }

  handleStepperChange = (data) => {
    this.setState({ currentStepper: data })
  }

  render() {
    return (
      <div>
        <Display
          value={this.state.currentNumber}
        />
        <Stepper
          value={this.state.currentStepper}
          onStepperChange={this.handleStepperChange}
          increment={this.increaseCurrentNumber}
          decrement={this.decreaseCurrentNumber}
        />
      </div>
    )
  }
}

export default App;
