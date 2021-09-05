import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../../components/elements/Button/Button';
import Default from '../../../components/layouts/Default/Default';
import Loader from '../../../components/elements/Loader/Loader';
import DataTable, { DataTableColumn } from '../../../components/modules/DataTable/DataTable';
import api from '../../../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UsersList: React.FC = () => {
  const history = useHistory();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadUsers = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<User[]>('/user');
        setUsers(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadUsers();
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
      dataField: 'email',
      text: 'Email',
    },
    {
      dataField: 'role',
      text: 'Role',
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
        rowEvents={{
          onClick: (_, user) => { history.push(`/users/${user.id}`); },
        }}
      />
    </Default>
  );
};

export default UsersList;
