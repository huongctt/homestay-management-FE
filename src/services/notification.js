import { getAsyncWithToken } from "../constant/request";
export async function getNoti() {
  const url = process.env.REACT_APP_BACK_END + "/notifications";
  return getAsyncWithToken(url);
}
