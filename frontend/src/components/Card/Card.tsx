import React from 'react';
import styles from './styles.module.scss';

interface CardProps {
  title?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
}) => (
  <div className={styles.card}>
    {
      title
      && (
      <h2 className={styles.title}>
        {title}
      </h2>
      )
    }

    {children}
  </div>
);

export default Card;
