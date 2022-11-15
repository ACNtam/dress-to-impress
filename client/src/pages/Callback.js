import React from 'react'
import {useAuth0} from "@auth0/auth0-react"

function Callback() {
    const { error } = useAuth0()
    if(error){
      return (
        <div>
          <h1>error</h1>
          <p>{error.message}</p>
        </div>
      )
    }

  return (
    <div>
        <h1>Login Success!</h1>
    </div>
  )
}

export default Callback