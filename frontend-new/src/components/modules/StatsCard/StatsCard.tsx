import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface StatsCardProps {
  title: string;
  value: any;
  color?: 'primary' | 'green' | 'yellow' | 'orange' | 'red';
  className?: string;
  onClick?: () => void;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  color,
  className,
  onClick,
}) => (
  <div
    className={`${styles.card} ${className}`}
    onClick={onClick}
    onKeyDown={onClick}
    role="button"
    tabIndex={0}
  >
    <div className={styles.header}>
      <span className={styles.title}>
        {title}
      </span>
    </div>
    <div className={classnames(styles.content, {
      [styles.primary]: color === 'primary',
      [styles.green]: color === 'green',
      [styles.yellow]: color === 'yellow',
      [styles.orange]: color === 'orange',
      [styles.red]: color === 'red',
    })}
    >
      {value}
    </div>
  </div>
);

export default StatsCard;
