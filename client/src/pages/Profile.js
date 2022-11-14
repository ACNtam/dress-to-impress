import React, { useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from '../component/ProfileForm';



function Profile() {
  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    fetch("/api/profile/" + user.name )
  }

  //Destructuring keys from useAuth0 object
  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout } = useAuth0()

  if (isAuthenticated) {
    return (

      <div>
        Hello {user.name}{' '}
        <ProfileForm user={user} />
        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
}


export default Profile

// //if the user is logged in, display log out button
// //if not, dislay log in button
// const saveUser = (user) => {
//   return fetch("http://localhost:8080/api/me", {
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
