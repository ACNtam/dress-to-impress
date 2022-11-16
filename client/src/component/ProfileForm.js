import React, {useState} from 'react'


function ProfileForm() {
    const [data, setData] = useState({industry:"", occupation: "", gender:"", style:"", occassion:""})
  const onchange = (event)=>{
        setData({...data,[event.target.name]:event.target.value})
  }
    return (
    <div>
        <form>
            <label>Industry</label>
            <input type={"text"} name="industry" value={data.industry}
            onChange={onchange}/>
            <label>Occupation</label>
            <input type={"text"} name="occupation" value={data.occupation}
            onChange={onchange}/>
            <label>Gender</label>
            <input type={"text"} name="gender" value={data.gender}
            onChange={onchange}/>
            <label>Style</label>
            <input type={"text"} name="style" value={data.style}
            onChange={onchange}/>
            <label>Occassion</label>
            <input type={"text"} name="occassion" value={data.occassion}
            onChange={onchange}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default ProfileForm;