import { useEffect, useState } from "react"
import React  from 'react'
import { useAuth0 } from "@auth0/auth0-react"

function Recommendations() {
    const [recommendations, setRecommendations] = useState({})
    const {user, isAuthenticated} = useAuth0()

    //fetch request everytime the component is loaded, useEffect is executed
    useEffect(() => {
        //if no user sub dont't fetch
    if(!user.sub){
        return 
    }
        fetch(`/api/items?sub=${user.sub}`)

            //callback will accept response from server
            .then((res) => {
                //converting json to js object format
                return res.json()
            })
            //updating the recommendation state with data received from fetch request
            .then((data) => {
                setRecommendations(data)
            })
            .catch((error) => {
                console.log(error)
            })
        
        }, [isAuthenticated])

    return (
        <div>
        {recommendations?.data?.products?.map(product=>(
            <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <p>
                <img src={product.image.sizes[1].url} alt=""/>
            </p>
            <p>
                {/* target allows to open link on new tab */}
                <a href={product.referralUrl} rel="noreferrer" target="_blank">Buy Now</a>
            </p>
            </div>
        ))}
        </div>
    )
}

export default Recommendations