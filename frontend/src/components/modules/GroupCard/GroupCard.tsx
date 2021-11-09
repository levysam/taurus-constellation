import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from '../../elements/Button/Button';
import Card, { CardHeader, CardTitle } from '../../elements/Card/Card';
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

interface GroupCardProps {
  group: Group;
  queues: Queue[];
  onPause: (queueId: string) => void;
  onResume: (queueId: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  queues,
  onPause,
  onResume,
}) => {
  const history = useHistory();

  /**
   * Handle pause.
   */
  const handlePause = useCallback((queueId: string) => {
    if (onPause) {
      onPause(queueId);
    }
  }, [queues]);

  /**
   * Handle resume.
   */
  const handleResume = useCallback((queueId: string) => {
    if (onResume) {
      onResume(queueId);
    }
  }, [queues]);

  return (
    <Card className={styles.groupCard}>
      <CardHeader className={styles.header}>
        <CardTitle>
          <span
            role="button"
            tabIndex={0}
            onClick={() => { history.push(`/dashboard/${group.id}`); }}
          >
            {group.name}
          </span>
        </CardTitle>
      </CardHeader>

      {
      queues.map((queue, index) => (
        <div key={queue.id} className={styles.queue}>
          <div className={styles.header}>
            <div className={styles.title}>
              <span
                role="button"
                tabIndex={index + 1}
                className={styles.name}
                onClick={() => { history.push(`/dashboard/queues/${queue.id}`); }}
              >
                {queue.name}
              </span>
              <span className={classnames(styles.status, {
                [styles.running]: queue.status === 'running',
                [styles.paused]: queue.status === 'paused',
              })}
              >
                {queue.status}
              </span>
            </div>
            <div className={styles.actions}>
              {
                queue.status === 'running'
                && (
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => { handlePause(queue.id); }}
                  >
                    <FontAwesomeIcon icon={faPause} />
                  </Button>
                )
              }
              {
                queue.status === 'paused'
                && (
                  <Button
                    size="sm"
                    variant="dark"
                    onClick={() => { handleResume(queue.id); }}
                  >
                    <FontAwesomeIcon icon={faPlay} />
                  </Button>
                )
              }
            </div>
          </div>
          <div className={styles.jobs}>
            <div
              role="button"
              tabIndex={index + 1}
              className={styles.job}
              onClick={() => { history.push(`/dashboard/queues/${queue.id}/waiting/jobs`); }}
            >
              <span className={styles.value}>
                {queue.jobCounts.waiting}
              </span>
              <span className={styles.label}>
                Waiting
              </span>
            </div>
            <div
              role="button"
              tabIndex={index + 1}
              className={styles.job}
              onClick={() => { history.push(`/dashboard/queues/${queue.id}/paused/jobs`); }}
            >
              <span className={styles.value}>
                {queue.jobCounts.paused}
              </span>
              <span className={styles.label}>
                Paused
              </span>
            </div>
            <div
              role="button"
              tabIndex={index + 1}
              className={styles.job}
              onClick={() => { history.push(`/dashboard/queues/${queue.id}/active/jobs`); }}
            >
              <span className={styles.value}>
                {queue.jobCounts.active}
              </span>
              <span className={styles.label}>
                Active
              </span>
            </div>
            <div
              role="button"
              tabIndex={index + 1}
              className={styles.job}
              onClick={() => { history.push(`/dashboard/queues/${queue.id}/delayed/jobs`); }}
            >
              <span className={styles.value}>
                {queue.jobCounts.delayed}
              </span>
              <span className={styles.label}>
                Delayed
              </span>
            </div>
            <div
              role="button"
              tabIndex={index + 1}
              className={styles.job}
              onClick={() => { history.push(`/dashboard/queues/${queue.id}/failed/jobs`); }}
            >
              <span className={styles.value}>
                {queue.jobCounts.failed}
              </span>
              <span className={styles.label}>
                Failed
              </span>
            </div>
          </div>
          {
            (queues.length > 1 && index !== queues.length - 1)
            && (
              <hr className={styles.divider} />
            )
          }
        </div>
      ))
    }
    </Card>
  );
};

export default GroupCard;
