import { client } from "../utils/request";

export async function login(params) {
  return client("/login/account", {
    method: "POST",
    data: params
  });
}
