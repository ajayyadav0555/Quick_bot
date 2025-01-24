import React from 'react'

const Input = ({placeholder,handleinput,name}) => {
  return (
    <div>
        <input name={name} type='text' placeholder={placeholder} onChange={handleinput}/>
    </div>
  )
}

export default Input