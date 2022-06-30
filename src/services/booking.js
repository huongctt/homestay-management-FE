import { postAsyncWithToken } from "../constant/request";
export async function search(data) {
  const url = process.env.REACT_APP_BACK_END + "/search";
  return postAsyncWithToken(url, data);
}
