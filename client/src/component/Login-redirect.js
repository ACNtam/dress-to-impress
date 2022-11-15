import React, { useEffect } from 'react'


function LoginRedirect() {
    useEffect(() => {window.location.href="/profile"}, [])
  return (
    <div>Login-redirect</div>
  )
}

export default LoginRedirect