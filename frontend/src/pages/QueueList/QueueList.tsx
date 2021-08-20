import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Default from '../../layouts/Default/Default';
import DataTable from '../../components/DataTable/DataTable';
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

  const addQueue = (): void => {
    history.push('/queues/new');
  };

  const viewQueue = (row: any): void => {
    const { id } = row;
    history.push(`/queues/${id}`);
  };

  const columns = [
    {
      label: 'ID',
      field: 'id',
      hidden: true,
    },
    {
      label: 'Name',
      field: 'name',
    },
    {
      label: 'Group',
      field: 'groupName',
    },
    {
      label: 'Description',
      field: 'description',
    },
  ];

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <DataTable
        title="Queues"
        idField="id"
        columns={columns}
        data={queues}
        onClickRow={viewQueue}
      >
        <Button
          type="button"
          variant="primary"
          onClick={addQueue}
        >
          Add
        </Button>
      </DataTable>
    </Default>
  );
};

export default QueueList;
