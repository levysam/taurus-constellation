import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DataTable, { DataTableColumn } from '../../components/DataTable/DataTable';
import Default from '../../layouts/Default/Default';
import Dropdown from '../../components/Dropdown/Dropdown';
import Loader from '../../components/Loader/Loader';
import api from '../../services/api';

interface Group {
  id: string;
  name: string;
}

interface Queue {
  id: string;
  name: string;
  jobCounts: {
    waiting: number;
    paused: number;
    active: number;
    delayed: number;
    failed: number;
    completed: number;
  }
}

interface DashboardItem {
  group: Group;
  queues: Queue[];
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<DashboardItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const loadDashboard = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get<DashboardItem[]>('/dashboard');
        setDashboard(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadDashboard();
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
      style: {
        minWidth: '200px',
      },
    },
    {
      field: 'status',
      text: 'Status',
      style: {
        minWidth: '100px',
      },
    },
    {
      field: 'jobCounts.waiting',
      text: 'Waiting',
      style: {
        minWidth: '80px',
      },
    },
    {
      field: 'jobCounts.paused',
      text: 'Paused',
      style: {
        minWidth: '80px',
      },
    },
    {
      field: 'jobCounts.active',
      text: 'Active',
      style: {
        minWidth: '80px',
      },
    },
    {
      field: 'jobCounts.delayed',
      text: 'Delayed',
      style: {
        minWidth: '80px',
      },
    },
    {
      field: 'jobCounts.failed',
      text: 'Failed',
      style: {
        minWidth: '80px',
      },
    },
  ];

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <div style={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '50px',
      }}
      >
        <h2 style={{ flex: 1 }}>
          Dashboard
        </h2>
        <div>
          <Dropdown
            title="Actions"
            options={[
              { label: 'Pause', onClick: () => { console.log('pause'); } },
              { label: 'Resume', onClick: () => { console.log(selected); } },
            ]}
          />
        </div>
      </div>

      {
        dashboard.map((item) => (
          <div
            key={item.group.id}
            style={{ marginBottom: '50px' }}
          >
            <DataTable
              title={item.group.name}
              keyField="id"
              columns={columns}
              data={item.queues}
              enableSelection
            />
          </div>
        ))
      }

    </Default>
  );
};

export default Dashboard;
