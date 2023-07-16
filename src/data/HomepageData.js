import axios from "axios";

// const proxy = `https://gourav-node-server.herokuapp.com`;
const proxy = `http://localhost:8080`;

const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken;
};

export const FetchAllData = async () => {
  console.log(`inside fetchalldata`);
  const token = await getToken();
  if (token === undefined || token === "") {
    console.log(`Error retrieving the token. Aborting API call`);
    return;
  }
  console.log(`Fetching users data. Token is : ${token}`);
  return await axios({
    method: "get",
    url: `${proxy}/users`,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((response) => {
      console.log("All data ", response.data);
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return [];
    });
};

export const FetchUserData = async (_id) => {
  const token = await getToken();
  if (token === undefined || token === "") {
    console.log(`Error retrieving the token. Aborting API call`);
    return;
  }
  console.log(`Fetching user data. Token is : ${token}`);
  return await axios({
    method: "get",
    url: `${proxy}/user/${_id}`,
    headers: { authorization: `Bearer ${token}` },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.error(err);
      return {};
    });
};
