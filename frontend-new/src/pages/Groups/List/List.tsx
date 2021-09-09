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
  description: string;
}

const GroupsList: React.FC = () => {
  const history = useHistory();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Group[]>('/group');
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
      />
    </Default>
  );
};

export default GroupsList;
