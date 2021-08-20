import React from 'react';
import styles from './styles.module.scss';

interface QueueCardProps {
  name: string;
}

const QueueCard: React.FC<QueueCardProps> = ({
  name,
}) => {
  const a = '';

  return (
    <div className={styles.queueCard}>
      <div className={styles.header}>
        {name}
      </div>
    </div>
  );
};

export default QueueCard;
