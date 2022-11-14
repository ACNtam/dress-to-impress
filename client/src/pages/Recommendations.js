import { useEffect, useState } from "react"
import React  from 'react'

function Recommendations() {
    const [recommendations, setRecommendations] = useState({})

    //fetch request everytime the component is loaded, useEffect is executed
    useEffect(() => {
        fetch("/api/items")

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
    }, [])

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