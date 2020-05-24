import React from "react";
import { useAuth0 } from "../../react-auth0-spa";
import { Image } from 'react-bootstrap';


const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="body">
        <Image src={user.picture} alt="Profile"/>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
};

export default Profile;