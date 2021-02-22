import React, { useState } from 'react'
import './Stepper.scss'
import 'antd/dist/antd.css'

import { Button, InputNumber } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const Stepper = ({ increment, decrement, onStepperChange }) => {

  const [inputColor, setInputColor] = useState('black')

  const handleStepperChange = (value) => {
    onStepperChange(value)
    getColor(value)
  }

  const getColor = (inputValue) => {
    if(inputValue > 10 && inputValue < 100) setInputColor('orange')
    else if(inputValue >= 100) setInputColor('red')
    else setInputColor('black')
  }
  

  return (
    <div className='stepper'>
      <Button onClick={decrement} className='stepper-button' size='large'>
          <MinusOutlined />
        </Button>
      <InputNumber 
        className={`stepper-input ${inputColor}`}
        min={0}  
        defaultValue={1}
        onChange={(value) => handleStepperChange(value)}
      />
        <Button onClick={increment} className='stepper-button' size='large'>
          <PlusOutlined />
        </Button>
    </div>
  )
}

export default Stepper