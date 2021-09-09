import React, { useCallback, useEffect, useState } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import ConfirmationModal from '../../../components/modules/ConfirmationModal/ConfirmationModal';
import Default from '../../../components/layouts/Default/Default';
import Dropdown from '../../../components/elements/Dropdown/Dropdown';
import Loader from '../../../components/elements/Loader/Loader';
import PageHeader from '../../../components/modules/PageHeader/PageHeader';
import StatsCard from '../../../components/modules/StatsCard/StatsCard';
import api from '../../../services/api';
import styles from './styles.module.scss';

interface QueueDashboardParams {
  id?: string;
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

const QueueDashboard: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<QueueDashboardParams>();
  const [queue, setQueue] = useState<Queue>({
    name: '',
    status: '',
    jobCounts: {
      waiting: 0,
      paused: 0,
      active: 0,
      delayed: 0,
      failed: 0,
      completed: 0,
    },
  } as Queue);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);
  const [showResumeModal, setShowResumeModal] = useState<boolean>(false);

  /**
   * Load queue.
   */
  const loadQueue = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Queue>(`/queue/${id}/dashboard`);
      setQueue(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  /**
   * Pause queue.
   */
  const pauseQueue = useCallback(async () => {
    setLoading(true);
    try {
      await api.put(`/queue/${id}/pause`);
      await loadQueue();
      setLoading(false);
      setShowPauseModal(false);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  /**
   * Resume queue.
   */
  const resumeQueue = useCallback(async () => {
    setLoading(true);
    try {
      await api.put(`/queue/${id}/resume`);
      await loadQueue();
      setLoading(false);
      setShowResumeModal(false);
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  /**
   * Open jobs list.
   */
  const openJobsList = useCallback((state: string) => {
    history.push(`/queues/${id}/jobs?state=${state}`);
  }, [id]);

  useEffect(() => {
    loadQueue();
  }, [id]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <ConfirmationModal
        show={showPauseModal}
        title="Pause queue"
        onConfirm={pauseQueue}
        onCancel={() => { setShowPauseModal(false); }}
      >
        Do you want to pause this queue?
      </ConfirmationModal>

      <ConfirmationModal
        show={showResumeModal}
        title="Resume queue"
        onConfirm={resumeQueue}
        onCancel={() => { setShowResumeModal(false); }}
      >
        Do you want to resume this queue?
      </ConfirmationModal>

      <PageHeader
        title={queue.name}
        subtitle="Queue dashboard"
        tools={(
          <div className={styles.actions}>
            <div className={styles.status}>
              <div className={classnames(styles.icon, {
                [styles.running]: queue.status === 'running',
                [styles.paused]: queue.status === 'paused',
              })}
              >
                <FontAwesomeIcon icon={
                queue.status === 'running'
                  ? faPlayCircle
                  : faPauseCircle
              }
                />
              </div>
              <span className={styles.value}>
                {queue.status}
              </span>
            </div>
            <Dropdown
              title="Actions"
              options={[
                {
                  label: 'Pause',
                  onClick: () => {
                    setShowPauseModal(true);
                  },
                },
                {
                  label: 'Resume',
                  onClick: () => {
                    setShowResumeModal(true);
                  },
                },
              ]}
            />
          </div>
        )}
      />

      <Container fluid>
        <Row>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Waiting"
              value={queue.jobCounts.waiting}
              onClick={() => { openJobsList('waiting'); }}
            />
          </Col>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Paused"
              value={queue.jobCounts.paused}
              onClick={() => { openJobsList('paused'); }}
            />
          </Col>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Active"
              value={queue.jobCounts.active}
              onClick={() => { openJobsList('active'); }}
            />
          </Col>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Delayed"
              value={queue.jobCounts.delayed}
              onClick={() => { openJobsList('delayed'); }}
            />
          </Col>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Failed"
              value={queue.jobCounts.failed}
              onClick={() => { openJobsList('failed'); }}
            />
          </Col>
          <Col
            className={styles.statsCard}
            md={2}
            xs={12}
          >
            <StatsCard
              title="Completed"
              value={queue.jobCounts.completed}
              onClick={() => { openJobsList('completed'); }}
            />
          </Col>
        </Row>
      </Container>
    </Default>
  );
};

export default QueueDashboard;
