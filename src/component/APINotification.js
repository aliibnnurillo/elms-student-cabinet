import React, { useEffect } from 'react';
import { notification } from 'antd';
import { inject, observer } from 'mobx-react';

const APINotification = inject('flash')(
  observer((props) => {
    const { flash } = props.flash;
    useEffect(() => {
      if (flash) {
        notification.open({
          type: flash.type,
          message: flash.message,
          duration: 1,
          style: {
            width: 400,
            marginLeft: 335 - 640,
            // marginTop: 70,
          },
        });
      }
    }, [flash]);
    return <div />;
  })
);

export default APINotification;
