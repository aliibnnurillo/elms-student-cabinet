import { client } from "../utils/request";

export async function query() {
  return client("/users");
}
export async function queryCurrent() {
  return client("/currentUser");
}
export async function queryNotices() {
  return client("/notices");
}
