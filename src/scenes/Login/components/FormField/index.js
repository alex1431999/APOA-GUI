import React from 'react'
import ButtonLogIn from './components/ButtonLogIn'

function FormField() {
  return (
    <div className="FormField">
      <input type="text" placeholder="Username"/>
      <br/>
      <input type="password" placeholder="Password"/>
      <ButtonLogIn/>
    </div>
  )
}

export default FormField;
