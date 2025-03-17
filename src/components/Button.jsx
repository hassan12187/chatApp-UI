import React from 'react'

const Button = ({text,onEvent}) => {
  return (
    <button className='btn btn-primary btn-sm' onClick={onEvent} >{text}</button>
  )
}

export default Button