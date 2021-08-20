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
      field: 'description',
      text: 'Description',
    },
  ];

  const addGroup = useCallback(() => {
    history.push('/groups/new');
  }, [history]);

  const openGroup = useCallback((row: any) => {
    history.push(`/groups/${row.id}`);
  }, [groups]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <DataTable
        title="Groups"
        keyField="id"
        columns={columns}
        data={groups}
        tools={(
          <>
            <Button
              type="button"
              variant="primary"
              onClick={addGroup}
            >
              Add
            </Button>
          </>
        )}
        onRowClick={openGroup}
      />
    </Default>
  );
};

export default GroupList;
