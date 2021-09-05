import React from 'react';
import BCard, { CardProps as BCardProps } from 'react-bootstrap/Card';
import BCardHeader, { CardHeaderProps as BCardHeaderProps } from 'react-bootstrap/CardHeader';
import styles from './styles.module.scss';

export const CardHeader: React.FC<BCardHeaderProps> = ({
  className,
  children,
}) => (
  <BCardHeader className={`${styles.header} ${className}`}>
    {children}
  </BCardHeader>
);

export const CardTitle: React.FC = ({
  children,
}) => (
  <BCard.Title className={styles.title}>
    {children}
  </BCard.Title>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
}) => (
  <BCard.Footer className={`${styles.footer} ${className}`}>
    {children}
  </BCard.Footer>
);

const Card: React.FC<BCardProps> = ({
  children,
  className,
  ...props
}) => (
  <BCard
    className={`${styles.card} ${className}`}
    {...props}
  >
    {children}
  </BCard>
);

export default Card;
