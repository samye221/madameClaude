import React from 'react'

const Filter = ({ toggle, current, type, value, children }) => 
  <button
    onClick={() => toggle(type, value)}
    style={{ color: current === value ? 'red' : 'blue' }}>
    {children ? children : value}
  </button>

  

export default Filter