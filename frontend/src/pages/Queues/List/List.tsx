import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/elements/Button/Button';
import DataTable, { DataTableColumn, DataTablePagination } from '../../../components/modules/DataTable/DataTable';
import Default from '../../../components/layouts/Default/Default';
import Loader from '../../../components/elements/Loader/Loader';
import api from '../../../services/api';
import { PaginationSize } from '../../../components/modules/Pagination/Pagination';

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

interface QueueListResponse {
  total: number;
  queues: Queue[];
}

const QueuesList: React.FC = () => {
  const history = useHistory();
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    size: 25,
    total: 0,
  });

  /**
   * Load queues.
   */
  const loadQueues = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<QueueListResponse>('/queue', {
        params: {
          page: pagination.page,
          size: pagination.size,
        },
      });
      setQueues(data.queues);
      setPagination({
        ...pagination,
        total: data.total,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [history, pagination]);

  useEffect(() => {
    loadQueues();
  }, [history, pagination.size, pagination.page]);

  const columns: DataTableColumn[] = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      headerStyle: () => ({
        width: '40%',
      }),
    },
    {
      dataField: 'description',
      text: 'Description',
      formatter: (cell: any) => (
        cell || '-'
      ),
      headerStyle: () => ({
        width: '40%',
      }),
    },
    {
      dataField: 'group.name',
      text: 'Group',
      headerStyle: () => ({
        width: '20%',
      }),
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
        enablePagination
        pagination={pagination}
        onChangeSize={(size: PaginationSize) => {
          setPagination({
            ...pagination,
            size,
          });
        }}
        onChangePage={(page: number) => {
          setPagination({
            ...pagination,
            page,
          });
        }}
      />
    </Default>
  );
};

export default QueuesList;
