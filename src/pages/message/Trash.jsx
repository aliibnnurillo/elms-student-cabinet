import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import MessageTable from './MessageTable';
import { useTranslation } from 'react-i18next';

const Trash = inject('message')(
  observer(({ message: { fetchAll, trash, remove } }) => {
    useEffect(() => {
      fetchAll({ type: 'trash', params: { only_trashed: 1 } });
    }, []);
    const [t] = useTranslation();
    return (
      <div className="all-message">
        <h2>{t('Deleted Messages')}</h2>

        <MessageTable data={trash} type="trash" remove={remove} />
      </div>
    );
  })
);

export default Trash;
