import React, { useContext } from "react";
import HomepageContext from "../data/HomepageData";

function Homepage() {
  const { users } = useContext(HomepageContext);
  const imageURL =
    "https://raw.githubusercontent.com/gouravt16/MERN/main/public/images/";
  return (
    <div className="Profile">
      {users &&
        users.length > 0 &&
        users.map((user) => {
          const url = `/user/${user._id}`;
          return (
            <a href={url} key={user._id} style={{ textDecoration: "none" }}>
              <div className="User">
                {user.name}
                <img width={150} src={imageURL + user.image + ".jpg"} alt="" />
                <br></br>
                {user.currentOrganization}
              </div>
            </a>
          );
        })}
    </div>
  );
}

export default Homepage;
