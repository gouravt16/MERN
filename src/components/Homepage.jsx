import React, { useState, useEffect } from "react";
import { FetchAllData } from "../data/HomepageData";
import Logout from "./Logout";

function Homepage() {
  const imageURL = require.context('../../public/images', true);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    FetchAllData().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <h5 style={{ textAlign: "center" }}>Loading...</h5>
      ) : (users && users.length > 0) ? (
        <div className="Profile" style={{ marginTop: "40px" }}>
          <Logout/>
          {users.map((user) => {
            const url = `/user/${user._id}`;
            const userImage = imageURL(`./${user.image}`)
            return (
              <a href={url} key={user._id} style={{ textDecoration: "none" }}>
                <div className="User">
                  <img width={150} src={userImage} alt="" />
                  {user.name}
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
