import axios from "axios";

export const fetchMenus = () => {
  const apiUrls = ["http://localhost/api/", "http://localhost/apiUser_conn/"];

  const requests = apiUrls.map((url) => axios.get(url));

  return axios
    .all(requests)
    .then(
      axios.spread((...responses) => {
        const menuData = responses.map((response) => response.data);
        return menuData;
      })
    )
    .catch((error) => {
      console.log(error);
      return [];
    });
};
