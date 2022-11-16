import React from 'react'
import { Link, Outlet } from "react-router-dom";
import AuthenticationButton from './authentication-button';

function Navbar() {


    return (
        <div className='navbar'>
            <h2>Dress To Impress</h2>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>

                <li>
                    <Link to={"/profile"}>Profile</Link>
                </li>

                <li>
                    <Link to={"/recommend"}>Recommendations</Link>
                </li>
                <li>
                    <Link to={"/contact"}>Contact</Link>
                </li>
            </ul>
            <AuthenticationButton/>
    </div >
  )
}

export default Navbar