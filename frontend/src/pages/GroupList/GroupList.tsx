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
  description: string;
}

const GroupList: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get('/group');
        setGroups(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadGroups();
  }, [history]);

  const addGroup = (): void => {
    history.push('/groups/new');
  };

  const viewGroup = (row: any): void => {
    const { id } = row;
    history.push(`/groups/${id}`);
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
        title="Groups"
        idField="id"
        columns={columns}
        data={groups}
        onClickRow={viewGroup}
      >
        <Button
          type="button"
          variant="primary"
          onClick={addGroup}
        >
          Add
        </Button>
      </DataTable>
    </Default>
  );
};

export default GroupList;
