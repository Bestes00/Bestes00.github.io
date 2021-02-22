import React from 'react'
import './Display.scss'

const Display = ({ value }) => {
  return (
    <div>
      <h1 className='display'>{value}</h1>
    </div>
  )
}

export default Display