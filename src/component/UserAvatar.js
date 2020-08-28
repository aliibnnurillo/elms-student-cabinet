import React, { useEffect, useState } from "react";
import { Avatar } from "antd";
import { extractFirstCharacter } from "../common/utils/utils";

export default function UserAvatar({ user }) {
  const [a, setA] = useState(false);
  useEffect(() => {
    setA(!a);
  }, [user]);

  return user && user.avatar ? (
    <Avatar
      size={40}
      className="img-avatars user-icon"
      src={user.avatar}
      alt="avatar"
    />
  ) : (
    <Avatar
      size={40}
      className="img-avatars user-icon"
      style={{
        background:
          "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0"),
      }}
    >
      {user && user.username
        ? extractFirstCharacter(user.username).toUpperCase()
        : "U"}
    </Avatar>
  );
}
