import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";

const AuthWrapper = ({ children, store }) => {
  useEffect(() => {
    if (store.accessToken) store.Profile();
  }, [store.accessToken]);

  return <>{children(store)}</>;
};

export default inject((stores) => ({ store: stores.authStore }))(
  observer(AuthWrapper)
);
