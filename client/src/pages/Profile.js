import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
    const { isAuthenticated } = useAuth0()
    if (isAuthenticated) {
        return (
          <div>
            Hello {user.name}{' '}
            <button onClick={() => logout({ returnTo: window.location.origin })}>
              Log out
            </button>
          </div>
        );
      } else {
        return <button onClick={loginWithRedirect}>Log in</button>;
      }
    }

  return (
    <div>Profile</div>
  )

export default Profile