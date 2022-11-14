import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

// async 
async function Protected() {
    //gives token for login user
    const { getAccessTokenSilently } = useAuth0()
    //gives access token
    const accessToken = await getAccessTokenSilently()
    fetch("/protected", {
        headers: {Authorization: `Bearer ${accessToken}`, 
        "content-type": "application/json"
    }   
    }).then((res)=>{
        return res.json() 
    }).then((data)=>{
        console.log(data)
    })
    .catch((e)=>{
        console.log(e)
    })
   
console.log(accessToken)
    return (
        <div>
            <h1>Protected</h1>
            {/* <p>{accessToken}</p> */}
        </div>
    )
}

export default Protected