import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Protected() {
    //gives token for login user
    const { getAccessTokenSilently } = useAuth0()
    

    return (
        <div>Protected</div>
    )
}

export default Protected