import React, { useContext } from "react";
import HomepageContext from "../data/HomepageData";

function Homepage() {
  const { users } = useContext(HomepageContext);
  return (
    <div>
      {users &&
        users.length > 0 &&
        users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
    </div>
  );
}

export default Homepage;
