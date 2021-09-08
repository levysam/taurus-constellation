import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/elements/Button/Button';
import Default from '../../../components/layouts/Default/Default';
import Loader from '../../../components/elements/Loader/Loader';
import DataTable, { DataTableColumn } from '../../../components/modules/DataTable/DataTable';
import api from '../../../services/api';

interface Group {
  id: string;
  name: string;
}

interface Queue {
  id: string;
  name: string;
  description: string;
  group: Group;
}

const QueuesList: React.FC = () => {
  const history = useHistory();
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadQueues = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Queue[]>('/queue');
        setQueues(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadQueues();
  }, [history]);

  const columns: DataTableColumn[] = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
    },
    {
      dataField: 'description',
      text: 'Description',
      formatter: (cell: any) => (
        cell || '-'
      ),
    },
    {
      dataField: 'group.name',
      text: 'Group',
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
        tools={(
          <>
            <Button onClick={() => { history.push('/queues/form'); }}>
              Create
            </Button>
          </>
        )}
        keyField="id"
        columns={columns}
        data={queues}
        noDataIndication="No queues found"
        rowEvents={{
          onClick: (_, queue) => { history.push(`/queues/${queue.id}`); },
        }}
      />
    </Default>
  );
};

export default QueuesList;
