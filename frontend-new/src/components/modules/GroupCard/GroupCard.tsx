import React from 'react';
import Button from '../../elements/Button/Button';
import Card, { CardHeader, CardTitle } from '../../elements/Card/Card';
import styles from './styles.module.scss';

const GroupCard: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        organic-search
      </CardTitle>
    </CardHeader>

    <div className={styles.queue}>
      <div className={styles.header}>
        <div className={styles.title}>
          emission-sync
        </div>
        <div className={styles.actions}>
          <Button
            size="sm"
            variant="primary"
          >
            Pause
          </Button>
        </div>
      </div>
      <div className={styles.jobs}>
        <div className={styles.job}>
          <span className={styles.value}>
            10
          </span>
          <span className={styles.label}>
            Waiting
          </span>
        </div>
        <div className={styles.job}>
          <span className={styles.value}>
            10
          </span>
          <span className={styles.label}>
            Paused
          </span>
        </div>
        <div className={styles.job}>
          <span className={styles.value}>
            10
          </span>
          <span className={styles.label}>
            Active
          </span>
        </div>
        <div className={styles.job}>
          <span className={styles.value}>
            10
          </span>
          <span className={styles.label}>
            Delayed
          </span>
        </div>
        <div className={styles.job}>
          <span className={styles.value}>
            10
          </span>
          <span className={styles.label}>
            Failed
          </span>
        </div>
      </div>
    </div>
  </Card>
);

export default GroupCard;
