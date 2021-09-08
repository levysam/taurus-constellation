import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import DataTable, { DataTableColumn } from '../../../../components/modules/DataTable/DataTable';
import Default from '../../../../components/layouts/Default/Default';
import Dropdown, { DropdownOption } from '../../../../components/elements/Dropdown/Dropdown';
import Loader from '../../../../components/elements/Loader/Loader';
import PageHeader from '../../../../components/modules/PageHeader/PageHeader';
import api from '../../../../services/api';
import { capitalize } from '../../../../utils/stringUtils';

interface JobListParams {
  queueId: string;
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

const useQuery = (): URLSearchParams => new URLSearchParams(useLocation().search);

const JobsList: React.FC = () => {
  const history = useHistory();
  const { queueId } = useParams<JobListParams>();
  const [queue, setQueue] = useState<Queue>({} as Queue);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const query = useQuery();
  const state = query.get('state');

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
          page: 1,
          size: 25,
        },
      });
      setJobs(data.jobs || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [queueId, state]);

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
   * Retry all jobs.
   */
  const retryAll = useCallback(async () => {
    setLoading(true);
    try {
      await api.post(`/queue/${queueId}/job/retry-all`);
      await loadJobs();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [jobs]);

  /**
   * Retry selected jobs.
   */
  const retrySelected = useCallback(async () => {
    setLoading(true);
    try {
      await api.post(`/queue/${queueId}/job/retry`, {
        jobIds: [],
      });
      await loadJobs();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [jobs]);

  /**
   * Remove selected jobs.
   */
  const removeSelected = useCallback(async () => {
    setLoading(true);
    try {
      await api.delete(`/queue/${queueId}/job`, {
        data: {
          jobIds: selected,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [jobs]);

  useEffect(() => {
    loadQueue();
    loadJobs();
  }, [history]);

  /**
   * Data table columns definition.
   */
  const columns: DataTableColumn[] = [
    {
      dataField: 'id',
      text: 'ID',
      headerStyle: () => ({
        width: '40%',
      }),
    },
    {
      dataField: 'name',
      text: 'Name',
      headerStyle: () => ({
        width: '10%',
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
      dataField: 'dateTime',
      text: 'Created at',
      headerStyle: () => ({
        width: '10%',
      }),
    },
  ];

  /**
   * Data table actions.
   */
  const actions: DropdownOption[] = [
    {
      label: 'Create',
      onClick: () => { history.push(`/queues/${queueId}/jobs/form`); },
    },
    {
      label: 'retry-section',
      isDivider: true,
    },
    {
      label: 'Retry selected',
      onClick: () => { retrySelected(); },
    },
    {
      label: 'Retry all',
      onClick: () => { retryAll(); },
    },
    {
      label: 'remove-section',
      isDivider: true,
    },
    {
      label: 'Remove selected',
      onClick: () => { removeSelected(); },
    },
  ];

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <PageHeader
        title={queue.name}
      />

      <DataTable
        keyField="id"
        title={state ? `${capitalize(state)} Jobs` : 'Jobs'}
        tools={(
          <>
            <Dropdown
              title="Actions"
              options={actions}
            />
          </>
        )}
        columns={columns}
        data={jobs}
        noDataIndication="No jobs so far"
        rowEvents={{
          onClick: (_, row) => {
            const { id } = row;
            history.push(`/queues/${queueId}/jobs/${id}`);
          },
        }}
        selectRow={{
          mode: 'checkbox',
          onSelect: handleSelect,
        }}
      />
    </Default>
  );
};

export default JobsList;
