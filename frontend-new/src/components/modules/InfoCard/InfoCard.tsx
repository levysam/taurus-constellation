import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface InfoCardProps {
  label: string;
  value: any;
  variant?: 'primary' | 'success' | 'danger' | undefined;
}

const InfoCard: React.FC<InfoCardProps> = ({
  label,
  value,
  variant,
}) => (
  <div className={classnames(styles.infoCard, {
    [styles.primary]: variant === 'primary',
    [styles.success]: variant === 'success',
    [styles.danger]: variant === 'danger',
  })}
  >
    <div className={styles.label}>
      {label}
    </div>
    <div className={styles.value}>
      {value}
    </div>
  </div>
);

export default InfoCard;
