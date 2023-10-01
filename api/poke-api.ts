import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default pokeApi;
