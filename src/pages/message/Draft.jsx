import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import MessageTable from './MessageTable';
import { SendOutlined, DeleteOutlined } from '@ant-design/icons';
import { remove } from 'mobx';
import { Divider } from 'antd';
import { useTranslation } from 'react-i18next';
import { isExistUser, getUser } from '../../common/utils/utils';

const Draft = inject('message')(
  observer(({ message: { fetchAll, draft, sendMessage } }) => {
    useEffect(() => {
      fetchAll({ type: 'draft', params: { status: false, sender_id: isExistUser() && getUser().id } });
    }, []);

    const newCol = {
      className: 'action-col',
      render: (cell, record, index) => (
        <>
          <SendOutlined onClick={() => sendMessage(record.id)} />
          <Divider type="vertical" />
          <DeleteOutlined
            onClick={() => remove({ type: 'draft', id: record.id })}
          />
        </>
      ),
    };
    const [t] = useTranslation();
    return (
      <div className="all-message">
        <h2>{t('Draft Messages')}</h2>
        <MessageTable data={draft} newCol={newCol} />
      </div>
    );
  })
);

export default Draft;
