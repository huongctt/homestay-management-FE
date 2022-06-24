import {
  postAsyncWithHeader,
  getCookie,
  postAsyncWithToken,
} from "../constant/request";
import axios from "axios";
export async function createHomestay(data, image) {
  const url = process.env.REACT_APP_BACK_END + "/homestays";
  return postAsyncWithToken(url, data);
}
