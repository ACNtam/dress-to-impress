import React from 'react'
import {useAuth0} from "@auth0/auth0-react"
import LoginRedirect from '../component/Login-redirect'

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
        <LoginRedirect />
    </div>
  )
}

export default Callback