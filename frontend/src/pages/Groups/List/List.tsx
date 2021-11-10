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
  description: string;
}

interface GroupListResponse {
  total: number;
  groups: Group[];
}

const GroupsList: React.FC = () => {
  const history = useHistory();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    size: 25,
    total: 0,
  });

  /**
   * Load groups.
   */
  const loadGroups = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<GroupListResponse>('/group', {
        params: {
          page: pagination.page,
          size: pagination.size,
        },
      });
      setGroups(data.groups);
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
    loadGroups();
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
        width: '60%',
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
        title="Groups"
        tools={(
          <>
            <Button onClick={() => { history.push('/groups/form'); }}>
              Create
            </Button>
          </>
        )}
        keyField="id"
        columns={columns}
        data={groups}
        noDataIndication="No groups found"
        rowEvents={{
          onClick: (_, group) => { history.push(`/groups/${group.id}`); },
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

export default GroupsList;
