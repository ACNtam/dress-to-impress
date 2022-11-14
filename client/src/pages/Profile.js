import React, { useEffect, useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from '../component/ProfileForm';



function Profile() {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    fetch("/api/profile/" + user.name)
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((error) => {
        console.log(error.message)
      })
  }

  //Destructuring keys from useAuth0 object
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout } = useAuth0()
console.log(user.sub)
  if (isAuthenticated) {
    return (

      <div>
        {
          !profile ? <ProfileForm user={user} /> : (
            <div>
              <p>Hello {user.name}{' '}</p>
            <p>Industry: {profile.industry}</p>
            <p>Occupation: {profile.occupation}</p>
            <p>Style: {profile.style}</p>
            <p>Occassion: {profile.occassion}</p>
            <p>Gender: {profile.gender}</p>
              <button onClick={() => logout({ returnTo: window.location.origin })}>
                Log out
              </button>
            </div>
          )
        }

      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}


export default Profile

// {
//   "id": 5,
//   "industry": "Fashion",
//   "occupation": "Stylist",
//   "style": "vintage",
//   "occassion": "hike",
//   "user_email": "alice.ntam@gmail.com                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ",
//   "gender": "Female"
// }

// //if the user is logged in, display log out button
// //if not, dislay log in button
// const saveUser = (user) => {
//   return fetch("/api/me", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   });
// };
// const AuthenticationButton = () => {
//   const { isAuthenticated, user } = useAuth0();
//   useEffect(() => {
//     if (isAuthenticated) {
//       saveUser(user);
//     }
//   }, [isAuthenticated, user]);
//   return isAuthenticated ? <LogoutButton /> : <LoginButton />;
// };
// export default AuthenticationButton;
