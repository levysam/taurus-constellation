import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DataTable, { DataTableColumn } from '../../../../components/modules/DataTable/DataTable';
import Default from '../../../../components/layouts/Default/Default';
import Dropdown from '../../../../components/elements/Dropdown/Dropdown';
import Loader from '../../../../components/elements/Loader/Loader';
import api from '../../../../services/api';
import { capitalize } from '../../../../utils/stringUtils';

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

const JobsList: React.FC = () => {
  const history = useHistory();
  const { queueId, state } = useParams<JobListParams>();
  const [queue, setQueue] = useState<Queue>({} as Queue);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  useEffect(() => {
    loadQueue();
    loadJobs();
  }, [history]);

  /**
   * Get table formatted title.
   */
  const getFormattedTitle = useCallback(() => `Jobs | ${capitalize(state)}`, [state]);

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
      dataField: 'dateTime',
      text: 'Created at',
      headerStyle: () => ({
        width: '10%',
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
        keyField="id"
        title="Jobs"
        tools={(
          <>
            <Dropdown
              title="Actions"
              options={[
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
                  onClick: () => { console.log('a'); },
                },
                {
                  label: 'Retry all',
                  onClick: () => { console.log('a'); },
                },
                {
                  label: 'remove-section',
                  isDivider: true,
                },
                {
                  label: 'Remove selected',
                  onClick: () => { console.log('a'); },
                },
                {
                  label: 'Remove all',
                  onClick: () => { console.log('a'); },
                },
              ]}
            />
          </>
        )}
        columns={columns}
        data={jobs}
        noDataIndication="No jobs so far"
      />
    </Default>
  );
};

export default JobsList;
