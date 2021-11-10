import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import classnames from 'classnames';
import DataTable, { DataTableColumn } from '../../../components/modules/DataTable/DataTable';
import Default from '../../../components/layouts/Default/Default';
import Dropdown from '../../../components/elements/Dropdown/Dropdown';
import Loader from '../../../components/elements/Loader/Loader';
import PageHeader from '../../../components/modules/PageHeader/PageHeader';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import styles from './styles.module.scss';

interface GroupDashboardParams {
  id?: string;
}

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

const GroupDashboard: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams<GroupDashboardParams>();
  const [groupDashboard, setGroupDashboard] = useState<GroupDashboard>();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Load dashboard data.
   */
  const loadDashboard = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const { data: dashboard } = await api.get<GroupDashboard>(`/group/dashboard/${id}`);
      setGroupDashboard(dashboard);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadDashboard();
  }, [history, id]);

  /**
   * Get queue link.
   */
  const getQueueLink = useCallback((
    queue: Queue,
    state: string,
    content: string,
  ) => {
    const href = `/dashboard/queues/${queue.id}/${state}/jobs`;

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
  }, [groupDashboard]);

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
    if (!ids.length) {
      addToast({
        type: 'error',
        title: 'No queues selected',
        description: 'Select the queues to be paused.',
      });
      return;
    }

    setLoading(true);
    try {
      await api.put('/queue/pause', {
        ids,
      });
      await loadDashboard();
      addToast({
        type: 'success',
        title: 'Queues paused',
      });
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not pause the selected queues.',
      });
      setLoading(false);
    }
  }, [groupDashboard]);

  /**
   * Resume queues.
   */
  const resumeQueues = useCallback(async (ids: string[]) => {
    if (!ids.length) {
      addToast({
        type: 'error',
        title: 'No queues selected',
        description: 'Select the queues to be resumed.',
      });
      return;
    }

    setLoading(true);
    try {
      await api.put('/queue/resume', {
        ids,
      });
      await loadDashboard();
      addToast({
        type: 'success',
        title: 'Queues resumed',
      });
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not resume the selected queues.',
      });
      setLoading(false);
    }
  }, [groupDashboard]);

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
        title="Group Dashboard"
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
          </div>
        )}
      />

      {
        !groupDashboard
        && (
          <span>Group not found</span>
        )
      }

      {
        !!groupDashboard
        && (
          <DataTable
            className={styles.dataTable}
            key={groupDashboard.group.id}
            title={groupDashboard.group.name}
            keyField="id"
            columns={columns}
            data={groupDashboard.queues}
            noDataIndication="No results found"
            selectRow={{
              mode: 'checkbox',
              onSelect: handleSelect,
              onSelectAll: handleSelectAll,
            }}
          />
        )
      }
    </Default>
  );
};

export default GroupDashboard;
