import { http } from "services";

export const Profile = (params) =>
  http.request.get("/profile/show", {
    params,
  });
