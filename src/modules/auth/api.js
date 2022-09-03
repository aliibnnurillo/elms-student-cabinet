import { client } from "common/utils/request";

export const Profile = (params) =>
  client.get("/profile/show", {
    params,
  });
