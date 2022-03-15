import React, { useContext, useEffect } from "react";
import HomepageContext from "../data/HomepageData";
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userData, FetchUserData } = useContext(HomepageContext);
  const { id } = useParams();
  useEffect(() => {
    FetchUserData(id);
  }, []);
  const imageURL =
    "https://raw.githubusercontent.com/gouravt16/MERN/main/public/images/";
  return (
    <div>
      {userData &&
        userData.length > 0 &&
        userData.map((user) => (
          <div className="User" key={user._id}>
            {user.name}
            <br />
            <img width={150} src={imageURL + user.image + ".jpg"} alt="" />
            <br />
            {user.currentOrganization}
            <br />
            {user.contact}
          </div>
        ))}
    </div>
  );
}

export default UserProfile;
