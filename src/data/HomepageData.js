import { useState, useEffect, createContext } from "react";

const HomepageContext = createContext();

export const HomepageData = ({ children }) => {
  useEffect(() => {
    welcome();
  }, []);

  const [users, setUsers] = useState([
    { id: 2, name: "Rakesh Yadav", contact: 9883962164 },
    { id: 3, name: "Rishu Yadav", contact: 9883979229 },
  ]);
  const welcome = async () => {
    const response = await fetch(
      `https://gourav-node-server.herokuapp.com/users`
    );
    const data = await response.json();
    setUsers(data);
  };
  return (
    <HomepageContext.Provider value={{ users, welcome }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageContext;
