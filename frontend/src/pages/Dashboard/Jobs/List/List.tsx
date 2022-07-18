import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb from '../../../../components/modules/Breadcrumb/Breadcrumb';
import DataTable, { DataTableColumn, DataTablePagination } from '../../../../components/modules/DataTable/DataTable';
import Default from '../../../../components/layouts/Default/Default';
import Dropdown, { DropdownOption } from '../../../../components/elements/Dropdown/Dropdown';
import Loader from '../../../../components/elements/Loader/Loader';
import PageHeader from '../../../../components/modules/PageHeader/PageHeader';
import api from '../../../../services/api';
import { capitalize } from '../../../../utils/stringUtils';
import { PaginationSize } from '../../../../components/modules/Pagination/Pagination';
import ConfirmationModal from '../../../../components/modules/ConfirmationModal/ConfirmationModal';
import { useToast } from '../../../../hooks/toast';

interface JobListParams {
  queueId: string;
  state: string;
}

interface Queue {
  id: string;
  name: string;
}

interface Job {
  id: string;
  name: string;
}

interface JobResponse {
  jobs: Job[];
  total: number;
}

interface RowClickEvent extends React.SyntheticEvent{
  ctrlKey: boolean;
}

const JobsList: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { queueId, state } = useParams<JobListParams>();
  const [queue, setQueue] = useState<Queue>({} as Queue);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [pagination, setPagination] = useState<DataTablePagination>({
    page: 1,
    size: 25,
    total: 0,
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [showRetryModal, setShowRetryModal] = useState<boolean>(false);
  const [showRetryAllModal, setShowRetryAllModal] = useState<boolean>(false);

  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Queue>(`/queue/${queueId}`);
      setQueue(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [queueId]);

  /**
   * Load jobs.
   */
  const loadJobs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<JobResponse>(`/queue/${queueId}/job`, {
        params: {
          state,
          page: pagination.page,
          size: pagination.size,
        },
      });
      setJobs(data.jobs || []);
      setPagination({
        ...pagination,
        total: data.total,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [history, pagination]);

  /**
   * Handle select job.
   */
  const handleSelect = useCallback((
    job: Job,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setSelected(
        (previous) => [
          ...previous,
          job.id,
        ],
      );
      return;
    }
    setSelected(
      (previous) => previous.filter((item) => item !== job.id),
    );
  }, [jobs]);

  /**
   * Handle select all.
   */
  const handleSelectAll = useCallback((
    isSelected: boolean,
    rows: Job[],
  ) => {
    if (isSelected) {
      setSelected(rows.map((row) => row.id));
      return;
    }
    setSelected([]);
  }, [jobs]);

  /**
   * Retry all jobs.
   */
  const retryAll = useCallback(async () => {
    setLoading(true);
    try {
      await api.post(`/queue/${queueId}/job/retry-all`);
      await loadJobs();
      addToast({
        type: 'success',
        title: 'Jobs sent to queue again.',
      });
      setShowRetryAllModal(false);
      setLoading(false);
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occured',
        description: 'We could not retry the jobs.',
      });
      setShowRetryAllModal(false);
      setLoading(false);
    }
  }, [jobs]);

  /**
   * Retry selected jobs.
   */
  const retrySelected = useCallback(async () => {
    if (!selected.length) {
      addToast({
        type: 'error',
        title: 'No jobs selected',
        description: 'Please, select at least one job to retry.',
      });
      setShowRetryModal(false);
      return;
    }

    setLoading(true);
    try {
      await api.post(`/queue/${queueId}/job/retry`, {
        jobIds: selected,
      });
      await loadJobs();
      setSelected([]);
      setShowRetryModal(false);
      addToast({
        type: 'success',
        title: 'Jobs sent to queue again.',
      });
      setLoading(false);
    } catch (error) {
      setShowRetryModal(false);
      addToast({
        type: 'error',
        title: 'An error has occured',
        description: 'We could not retry the jobs.',
      });
      setLoading(false);
    }
  }, [selected]);

  /**
   * Remove selected jobs.
   */
  const removeSelected = useCallback(async () => {
    if (!selected.length) {
      addToast({
        type: 'error',
        title: 'No jobs selected',
        description: 'Please, select at least one job to remove.',
      });
      setShowRemoveModal(false);
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/queue/${queueId}/job`, {
        data: {
          jobIds: selected,
        },
      });
      await loadJobs();
      setSelected([]);
      setShowRemoveModal(false);
      addToast({
        type: 'success',
        title: 'Jobs removed successfully.',
      });
      setLoading(false);
    } catch (error) {
      setShowRemoveModal(false);
      addToast({
        type: 'error',
        title: 'An error occurred',
        description: 'We could not remove the jobs.',
      });
      setLoading(false);
    }
  }, [selected]);

  /**
   * Get dropdown options.
   */
  const getDropdownOptions = useCallback((): DropdownOption[] => {
    let options: DropdownOption[] = [];

    if (state === 'waiting') {
      options = options.concat([
        {
          label: 'Create',
          onClick: () => {
            history.push(`/dashboard/queues/${queueId}/${state}/jobs/form`);
          },
        }, {
          label: 'section-a',
          isDivider: true,
        },
      ]);
    }

    options.push({
      label: 'Remove selected',
      onClick: () => { setShowRemoveModal(true); },
    });

    if (state === 'failed') {
      options = options.concat([
        {
          label: 'section-b',
          isDivider: true,
        },
        {
          label: 'Retry selected',
          onClick: () => { setShowRetryModal(true); },
        },
        {
          label: 'Retry all',
          onClick: () => { setShowRetryAllModal(true); },
        },
      ]);
    }

    return options;
  }, [history]);

  useEffect(() => {
    loadQueue();
    loadJobs();
  }, [history]);

  useEffect(() => {
    loadJobs();
  }, [pagination.size, pagination.page]);

  /**
   * Data table columns definition.
   */
  const columns: DataTableColumn[] = [
    {
      dataField: 'id',
      text: 'ID',
      headerStyle: () => ({
        width: '25%',
      }),
    },
    {
      dataField: 'name',
      text: 'Name',
      headerStyle: () => ({
        width: '15%',
      }),
    },
    {
      dataField: 'attemptsMade',
      text: 'Attempts',
      headerStyle: () => ({
        width: '10%',
      }),
    },
    {
      dataField: 'createdAt',
      text: 'Created at',
      headerStyle: () => ({
        width: '15%',
      }),
    },
    {
      dataField: 'processedAt',
      text: 'Processed at',
      headerStyle: () => ({
        width: '15%',
      }),
      formatter: (cell) => (
        cell || '-'
      ),
    },
    {
      dataField: 'finishedAt',
      text: 'Finished at',
      headerStyle: () => ({
        width: '15%',
      }),
      formatter: (cell) => (
        cell || '-'
      ),
    },
  ];

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <ConfirmationModal
        show={showRemoveModal}
        title="Remove selected jobs"
        onConfirm={removeSelected}
        onCancel={() => { setShowRemoveModal(false); }}
      >
        Do you really want to remove these jobs?
      </ConfirmationModal>

      <ConfirmationModal
        show={showRetryModal}
        title="Retry selected jobs"
        onConfirm={retrySelected}
        onCancel={() => { setShowRetryModal(false); }}
      >
        Do you really want to retry these jobs?
      </ConfirmationModal>

      <ConfirmationModal
        show={showRetryAllModal}
        title="Retry all jobs"
        onConfirm={retryAll}
        onCancel={() => { setShowRetryAllModal(false); }}
      >
        Do you really want to retry all jobs?
      </ConfirmationModal>

      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: queue.name || '', path: `/dashboard/queues/${queue.id}` },
          { label: `${capitalize(state)} Jobs`, path: `/dashboard/queues/${queue.id}/${state}/jobs` },
        ]}
      />

      <PageHeader
        title={queue.name}
        subtitle={state ? `${capitalize(state)} Jobs` : 'Jobs'}
      />

      <DataTable
        keyField="id"
        title="Jobs"
        tools={(
          <>
            <Dropdown
              title="Actions"
              options={getDropdownOptions()}
            />
          </>
        )}
        columns={columns}
        data={jobs}
        noDataIndication="No jobs so far"
        rowEvents={{
          onClick: (e, row) => {
            const { id } = row;
            const event = e as RowClickEvent;

            if (event.ctrlKey) {
              return window.open(`/dashboard/queues/${queueId}/${state}/jobs/${id}`, '_blank');
            }

            return history.push(`/dashboard/queues/${queueId}/${state}/jobs/${id}`);
          },
        }}
        selectRow={{
          mode: 'checkbox',
          onSelect: handleSelect,
          onSelectAll: handleSelectAll,
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

export default JobsList;
