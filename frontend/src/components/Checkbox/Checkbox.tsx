import React from 'react';
import classnames from 'classnames';
import styles from './styles.module.scss';

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  variant?: 'dark';
  onCheck?: () => void;
  onUncheck?: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  variant,
  onCheck,
  onUncheck,
  ...props
}) => {
  const toggle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.checked && onCheck) {
      onCheck();
      return;
    }
    if (onUncheck) {
      onUncheck();
    }
  };

  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        onChange={toggle}
        {...props}
      />
      <span className={classnames(styles.checkmark, {
        [styles.dark]: variant === 'dark',
      })}
      />
    </label>
  );
};

export default Checkbox;
