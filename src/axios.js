import axios from "axios";
const backend = axios.create({ baseURL: "https://help-hand12.herokuapp.com/" });

export default backend;
export const assest = "https://help-hand12.herokuapp.com/";
export const massageSocket = "https://help-hand12.herokuapp.com/";

export const source = axios.CancelToken.source();
