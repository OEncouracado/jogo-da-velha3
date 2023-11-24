import React from 'react'
import { Form } from 'react-bootstrap'


function DisjuntorIA({isIA, toggleGame}) {

  return (
        <Form.Switch className='disjuntor text-white m-3'
        checked={isIA}
        onChange={toggleGame}
        id='custom-switch'
        label={(isIA ? "IA ATIVA ": "ATIVAR IA")}/>
  )
}

export default DisjuntorIA
