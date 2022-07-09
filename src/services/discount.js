import { postAsyncWithToken, getAsyncWithToken } from "../constant/request";
export async function createDiscount(data) {
  const url = process.env.REACT_APP_BACK_END + "/discounts";
  return postAsyncWithToken(url, data);
}

export async function getListDiscount() {
  const url = process.env.REACT_APP_BACK_END + "/discounts";
  return getAsyncWithToken(url);
}

export async function getDiscountsByHomestay(id) {
  const url = process.env.REACT_APP_BACK_END + "/discounts/homestays/" + id;
  return getAsyncWithToken(url);
}
