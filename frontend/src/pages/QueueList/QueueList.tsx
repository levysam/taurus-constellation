import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Default from '../../layouts/Default/Default';
import DataTable, { DataTableColumn } from '../../components/DataTable/DataTable';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

interface Group {
  id: string;
  name: string;
}

interface Queue {
  id: string;
  name: string;
  group: Group;
  groupName: string;
  description: string;
}

const QueueList: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [queues, setQueues] = useState<Queue[]>([]);

  useEffect(() => {
    const loadQueues = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get<Queue[]>('/queue');
        setQueues(
          data.map((queue) => ({
            ...queue,
            groupName: queue.group.name,
          })),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadQueues();
  }, [history]);

  const columns: DataTableColumn[] = [
    {
      field: 'id',
      text: 'ID',
      hide: true,
    },
    {
      field: 'name',
      text: 'Name',
    },
    {
      field: 'group.name',
      text: 'Group',
    },
    {
      field: 'description',
      text: 'Description',
    },
  ];

  const addQueue = useCallback(() => {
    history.push('/queues/new');
  }, [history]);

  const openQueue = useCallback((row: any) => {
    history.push(`/queues/${row.id}`);
  }, [queues]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <DataTable
        title="Queues"
        keyField="id"
        columns={columns}
        data={queues}
        tools={(
          <>
            <Button
              type="button"
              variant="primary"
              onClick={addQueue}
            >
              Add
            </Button>
          </>
        )}
        onRowClick={openQueue}
      />
    </Default>
  );
};

export default QueueList;
