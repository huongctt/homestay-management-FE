import { postAsyncWithToken } from "../constant/request";
export async function createService(data, image) {
  const url = process.env.REACT_APP_BACK_END + "/services";
  return postAsyncWithToken(url, data);
}
