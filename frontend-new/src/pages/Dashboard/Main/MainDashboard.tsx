import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faTable } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../components/elements/Button/Button';
import ButtonGroup from '../../../components/modules/ButtonGroup/ButtonGroup';
import DataTable, { DataTableColumn } from '../../../components/modules/DataTable/DataTable';
import Default from '../../../components/layouts/Default/Default';
import Dropdown from '../../../components/elements/Dropdown/Dropdown';
import GroupCard from '../../../components/modules/GroupCard/GroupCard';
import Loader from '../../../components/elements/Loader/Loader';
import PageHeader from '../../../components/modules/PageHeader/PageHeader';
import api from '../../../services/api';
import styles from './styles.module.scss';

interface Group {
  id: string;
  name: string;
}

interface Queue {
  id: string;
  name: string;
  status: string;
  jobCounts: {
    waiting: number;
    paused: number;
    active: number;
    delayed: number;
    failed: number;
    completed: number;
  }
}
interface GroupDashboard {
  group: Group;
  queues: Queue[];
}

type DashboardMode = 'table' | 'cards';

const MainDashboard: React.FC = () => {
  const history = useHistory();
  const [groupDashboards, setGroupDashboards] = useState<GroupDashboard[]>([]);
  const [mode, setMode] = useState<DashboardMode>('table');
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Load dashboard data.
   */
  const loadDashboard = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const { data: groups } = await api.get<Group[]>('/group');
      const dashboards: GroupDashboard[] = [];
      await Promise.all(
        groups.map(async (group) => {
          const { data: dashboard } = await api.get<GroupDashboard>(`/group/${group.id}/dashboard`);
          dashboards.push(dashboard);
        }),
      );
      setGroupDashboards(dashboards);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [history]);

  useEffect(() => {
    loadDashboard();
  }, [history]);

  /**
   * Get queue link.
   */
  const getQueueLink = useCallback((
    queue: Queue,
    state: string,
    content: string,
  ) => {
    const { id } = queue;
    const href = `/dashboard/queues/${id}/${state}/jobs`;

    return (
      <span
        onClick={() => { history.push(href); }}
        onKeyDown={() => { history.push(href); }}
        role="button"
        tabIndex={0}
      >
        {content}
      </span>
    );
  }, [groupDashboards]);

  /**
   * Handle table row selection.
   */
  const handleSelect = useCallback((
    row: Queue,
    isSelected: boolean,
  ): void => {
    if (isSelected) {
      setSelected(
        (prevSelected) => ([
          ...prevSelected,
          row.id,
        ]),
      );
      return;
    }
    setSelected(
      (prevSelected) => prevSelected.filter((item) => item !== row.id),
    );
  }, []);

  /**
   * Handle table all rows selection.
   */
  const handleSelectAll = useCallback((
    isSelected: boolean,
    rows: Queue[],
  ): void => {
    if (isSelected) {
      setSelected(
        rows.map((row) => row.id),
      );
      return;
    }
    setSelected([]);
  }, []);

  /**
   * Pause queues.
   */
  const pauseQueues = useCallback(async (ids: string[]) => {
    setLoading(true);
    try {
      await api.put('/queue/pause', {
        ids,
      });
      await loadDashboard();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [groupDashboards]);

  /**
   * Resume queues.
   */
  const resumeQueues = useCallback(async (ids: string[]) => {
    setLoading(true);
    try {
      await api.put('/queue/resume', {
        ids,
      });
      await loadDashboard();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [groupDashboards]);

  /**
   * Table columns definition.
   */
  const columns: DataTableColumn[] = [
    {
      dataField: 'id',
      text: 'ID',
      hidden: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      formatter: (cell, row) => (
        <a
          role="button"
          tabIndex={0}
          onKeyDown={() => { history.push(`/dashboard/queues/${row.id}`); }}
          onClick={() => { history.push(`/dashboard/queues/${row.id}`); }}
        >{cell}
        </a>
      ),
      headerStyle: () => ({
        width: '35%',
      }),
    },
    {
      dataField: 'status',
      text: 'Status',
      width: 30,
      formatter: (cell) => (
        <span className={classnames('text-capitalize', {
          'text-success': cell === 'running',
          'text-danger': cell === 'paused',
        })}
        >
          {cell}
        </span>
      ),
      headerStyle: () => ({
        width: '10%',
      }),
    },
    {
      dataField: 'jobCounts.waiting',
      text: 'Waiting',
      classes: styles.numberColumn,
      headerStyle: () => ({
        width: '10%',
      }),
      formatter: (cell, row) => getQueueLink(
        row,
        'waiting',
        cell,
      ),
    },
    {
      dataField: 'jobCounts.paused',
      text: 'Paused',
      classes: styles.numberColumn,
      headerStyle: () => ({
        width: '10%',
      }),
      formatter: (cell, row) => getQueueLink(
        row,
        'paused',
        cell,
      ),
    },
    {
      dataField: 'jobCounts.active',
      text: 'Active',
      classes: styles.numberColumn,
      headerStyle: () => ({
        width: '10%',
      }),
      formatter: (cell, row) => getQueueLink(
        row,
        'active',
        cell,
      ),
    },
    {
      dataField: 'jobCounts.delayed',
      text: 'Delayed',
      classes: styles.numberColumn,
      headerStyle: () => ({
        width: '10%',
      }),
      formatter: (cell, row) => getQueueLink(
        row,
        'delayed',
        cell,
      ),
    },
    {
      dataField: 'jobCounts.failed',
      text: 'Failed',
      classes: styles.numberColumn,
      headerStyle: () => ({
        width: '10%',
      }),
      formatter: (cell, row) => getQueueLink(
        row,
        'failed',
        cell,
      ),
    },
  ];

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <PageHeader
        title="Dashboard"
        tools={(
          <div className={styles.pageHeaderTools}>
            <Dropdown
              className="mr-1"
              title="Actions"
              options={[
                {
                  label: 'Pause',
                  onClick: () => { pauseQueues(selected); },
                },
                {
                  label: 'Resume',
                  onClick: () => { resumeQueues(selected); },
                },
              ]}
            />
            <ButtonGroup className="mr-1">
              <Button
                variant="dark"
                onClick={() => { setMode('table'); }}
              >
                <FontAwesomeIcon icon={faTable} />
              </Button>
              <Button
                variant="dark"
                onClick={() => { setMode('cards'); }}
              >
                <FontAwesomeIcon icon={faStream} />
              </Button>
            </ButtonGroup>
          </div>
        )}
      />

      {
        groupDashboards.length === 0
        && (
          <span>No groups found</span>
        )
      }

      {
        mode === 'cards'
        && (
          groupDashboards.map((item) => (
            <GroupCard
              key={item.group.id}
              group={item.group}
              queues={item.queues}
              onPause={(queueId: string) => { pauseQueues([queueId]); }}
              onResume={(queueId: string) => { resumeQueues([queueId]); }}
            />
          ))
        )
      }

      {
        mode === 'table'
        && (
          groupDashboards.map((item) => (
            <DataTable
              className={styles.dataTable}
              key={item.group.id}
              title={item.group.name}
              keyField="id"
              columns={columns}
              data={item.queues}
              noDataIndication="No results found"
              selectRow={{
                mode: 'checkbox',
                onSelect: handleSelect,
                onSelectAll: handleSelectAll,
              }}
            />
          ))
        )
      }
    </Default>
  );
};

export default MainDashboard;
