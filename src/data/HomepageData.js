import { useState, useEffect, createContext } from "react";
import axios from "axios";

// const proxy = `https://gourav-node-server.herokuapp.com`;
const proxy = `http://localhost:8080`
const HomepageContext = createContext();

const getToken = () => {
  const tokenString = sessionStorage.getItem('token')
  const userToken = JSON.parse(tokenString)
  return userToken
}

export const HomepageData = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    FetchAllData();
  }, [])

  const FetchAllData = async () => {
    const token = await getToken();
    if(token === undefined || token === '') {
      console.log(`Error retrieving the token. Aborting API call`)
      return
    }
    console.log(`Fetching users data. Token is : ${token}`)
    await axios({
      method: "get",
      url: `${proxy}/users`,
      headers: {'authorization': `Bearer ${token}`}
    }).then((response) => {
      console.log(response)
      const data = response.data;
      setUsers(data);
    }).catch((err) => {
      console.error(err)
    })
  };

  const FetchUserData = async (_id) => {
    const token = await getToken();
    if(token === undefined || token === '') {
      console.log(`Error retrieving the token. Aborting API call`)
      return
    }
    console.log(`Fetching user data. Token is : ${token}`)
    await axios({
      method: "get",
      url: `${proxy}/user/${_id}`,
      headers: {'authorization': `Bearer ${token}`}
    }).then((response) => {
      const data = response.data;
      setUserData(data);
    }).catch((err) => {
      console.error(err)
    })
  };

  return (
    <HomepageContext.Provider value={{ users, userData, FetchUserData }}>
      {children}
    </HomepageContext.Provider>
  );
};

export default HomepageContext;
