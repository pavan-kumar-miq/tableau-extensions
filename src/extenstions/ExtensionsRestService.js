import axios from "axios";
 

export const triggerDatabricksAPI = (requestBody) => {
    const url = `https://tableau.mediaiqdigital.com/api/datalookup/reachCurve`;
    const headers = {
      "Content-Type": "application/json",
    };
  return axios.post(url, requestBody, headers);
};