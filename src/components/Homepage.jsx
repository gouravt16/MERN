import React, { useContext } from "react";
import HomepageContext from "../data/HomepageData";

function Homepage() {
  const { users } = useContext(HomepageContext);
  const imageURL =
    "https://raw.githubusercontent.com/gouravt16/MERN/main/client/public/images/";
  return (
    <div className="Profile">
      {users &&
        users.length > 0 &&
        users.map((user) => {
          return (
            <div className="User">
              {user.name}
              <img
                width={200}
                src={imageURL + user.image + ".jpg"}
                alt="Yaha Photo Hona Chahiye tha"
              />
              {user.currentOrganization}
              <br></br>
              {user.contact}
            </div>
          );
        })}
    </div>
  );
}

export default Homepage;
