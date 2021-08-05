import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Default from '../../layouts/Default/Default';
import DataTable from '../../components/DataTable/DataTable';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([] as User[]);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await api.get('/user');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadUsers();
  }, [history]);

  const addUser = useCallback(() => {
    history.push('/users/new');
  }, [history]);

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
      label: 'Email',
      field: 'email',
    },
    {
      label: 'Role',
      field: 'role',
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
        idField="id"
        columns={columns}
        data={users}
      >
        <Button
          type="button"
          variant="primary"
          onClick={addUser}
        >
          Add
        </Button>
      </DataTable>
    </Default>
  );
};

export default UserList;
