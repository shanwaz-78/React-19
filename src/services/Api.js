import axios from "axios";

const baseURL = `https://jsonplaceholder.typicode.com`;

const api = axios.create({ baseURL });

export const getUsers = (query) => api.get(query);
export const updateEmail = (newEmail) => api.put(newEmail)