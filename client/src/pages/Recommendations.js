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
            <p>{product.image.caption}</p>
        ))}
        </div>
    )
}

export default Recommendations