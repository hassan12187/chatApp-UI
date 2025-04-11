import React from 'react'

const Input = ({name,type,labelTitle,placeholder,value,onEvent,maxLength,minLength}) => {
  return (
    <div className="col-md-12 my-2">
    <label htmlFor={name} className="form-label">{labelTitle}</label>
        <input type={type} name={name} id={name} onChange={onEvent} value={value} className="form-control" placeholder={placeholder} maxLength={maxLength} minLength={minLength} />
    </div>
  )
}

export default Input