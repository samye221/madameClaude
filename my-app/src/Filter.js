import React from 'react'
import style from './button.css'

const Filter = ({ toggle, current, type, value, children }) => 
  <button
    onClick={() => toggle(type, value)}
    className={ current === value ? 'Filter' : 'FilterCurrent' }>
    {children ? children : value}
  </button>

  

export default Filter