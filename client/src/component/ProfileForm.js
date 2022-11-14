import React, { useState } from 'react'



function ProfileForm({ user }) {
    const [data, setData] = useState({ industry: "", occupation: "", gender: "", style: "", occassion: "" })
    const onchange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch("/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({...data, email:user.name})
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data)
        })
        .catch((error)=>{
            console.log(error.message)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Industry</label>
                <input type={"text"} name="industry" value={data.industry}
                    onChange={onchange} />
                <label>Occupation</label>
                <input type={"text"} name="occupation" value={data.occupation}
                    onChange={onchange} />
                <label>Gender</label>
                <input type={"text"} name="gender" value={data.gender}
                    onChange={onchange} />
                <label>Style</label>
                <input type={"text"} name="style" value={data.style}
                    onChange={onchange} />
                <label>Occassion</label>
                <input type={"text"} name="occassion" value={data.occassion}
                    onChange={onchange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default ProfileForm;