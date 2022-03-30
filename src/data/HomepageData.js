import { useState, useEffect, createContext } from "react";

const HomepageContext = createContext();
const proxy = "https://gourav-node-server.herokuapp.com"; //http://localhost:8080

export const HomepageData = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    FetchAllData();
  }, []);

  const FetchAllData = async () => {
    const response = await fetch(`${proxy}/users`);
    const data = await response.json();
    setUsers(data);
  };

  const FetchUserData = async (_id) => {
    const response = await fetch(`${proxy}/user/${_id}`);
    const data = await response.json();
    setUserData(data);
  };

  return (
    <HomepageContext.Provider value={{ users, userData, FetchUserData }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageContext;
