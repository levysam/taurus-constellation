import React from 'react';
import BDropdown from 'react-bootstrap/Dropdown';
import styles from './styles.module.scss';

export interface DropdownOption {
  label: string;
  onClick?: () => void;
  isDivider?: boolean;
  disabled?: boolean;
}

interface DropdownProps {
  title: string;
  options: DropdownOption[];
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
}) => (
  <BDropdown className={styles.dropdown}>
    <BDropdown.Toggle className={styles.toggle}>
      {title}
    </BDropdown.Toggle>

    <BDropdown.Menu className={styles.menu}>
      {
        options.map((option) => (
          option.isDivider
            ? <BDropdown.Divider key={option.label} />
            : (
              <BDropdown.Item
                key={option.label}
                className={styles.option}
                href="#"
                onClick={option.onClick}
                disabled={option.disabled}
              >
                {option.label}
              </BDropdown.Item>
            )
        ))
      }
    </BDropdown.Menu>
  </BDropdown>
);

export default Dropdown;
