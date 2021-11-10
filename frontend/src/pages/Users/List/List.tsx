import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/elements/Button/Button';
import DataTable, { DataTableColumn, DataTablePagination } from '../../../components/modules/DataTable/DataTable';
import Default from '../../../components/layouts/Default/Default';
import Loader from '../../../components/elements/Loader/Loader';
import { PaginationSize } from '../../../components/modules/Pagination/Pagination';
import api from '../../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserListResponse {
  total: number;
  users: User[];
}

const UsersList: React.FC = () => {
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    size: 25,
    total: 0,
  });

  /**
   * Load users.
   */
  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<UserListResponse>('/user', {
        params: {
          page: pagination.page,
          size: pagination.size,
        },
      });
      setUsers(data.users);
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
    loadUsers();
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
      dataField: 'email',
      text: 'Email',
      headerStyle: () => ({
        width: '30%',
      }),
    },
    {
      dataField: 'role',
      text: 'Role',
      headerStyle: () => ({
        width: '30%',
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
        title="Users"
        tools={(
          <>
            <Button onClick={() => { history.push('/users/form'); }}>
              Create
            </Button>
          </>
        )}
        keyField="id"
        columns={columns}
        data={users}
        noDataIndication="No users found"
        rowEvents={{
          onClick: (_, user) => { history.push(`/users/${user.id}`); },
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

export default UsersList;
