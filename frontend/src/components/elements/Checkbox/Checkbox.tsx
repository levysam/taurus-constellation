import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  variant?: 'dark';
}

const Checkbox: React.FC<CheckboxProps> = ({
  variant,
  ...props
}) => (
  <label className={styles.container}>
    <input
      type="checkbox"
      {...props}
    />
    <span className={classnames(styles.checkmark, {
      [styles.dark]: variant === 'dark',
    })}
    />
  </label>
);

export default Checkbox;
