import React, { useContext } from "react";
import HomepageContext from "../data/HomepageData";

function Homepage() {
  const { users } = useContext(HomepageContext);
  const imageURL =
    "https://raw.githubusercontent.com/gouravt16/MERN/main/public/images/";
  return (
    <div>
      {users && users.length > 0 ? (
        <div className="Profile" style={{ marginTop: "40px" }}>
          {users.map((user) => {
            const url = `/user/${user._id}`;
            return (
              <a href={url} key={user._id} style={{ textDecoration: "none" }}>
                <div className="User">
                  {user.name}
                  <img
                    width={150}
                    src={imageURL + user.image + ".jpg"}
                    alt=""
                  />
                </div>
              </a>
            );
          })}
        </div>
      ) : (
        <h4 style={{ textAlign: "center" }}>
          Session Expired. Please re-login to continue
        </h4>
      )}
    </div>
  );
}

export default Homepage;
