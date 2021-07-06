import axios from "axios";

axios.defaults.baseURL = "https://restcountries.eu/rest/v2";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json";

export const Country = {
  getCountryInfo: (body) => axios.get("/all", body),
  filterCountryInfo: (params) => axios.get(`/name/${params}`),
};
