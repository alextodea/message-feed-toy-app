import axios from "axios";
import * as ROUTES from "../helpers/routes";

export const getThreads = async () => {
  try {
    const apiResponse = await axios.get(ROUTES.GET_THREADS);
    return apiResponse.data
  } catch(e) {
    console.error(e);
    return e
  }
};