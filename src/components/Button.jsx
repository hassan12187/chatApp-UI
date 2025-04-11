import React from 'react'

const Button = ({text,onEvent,type}) => {
  return (
    <button type={type} className='btn btn-primary btn-sm' onClick={onEvent} >{text}</button>
  )
}

export default Button