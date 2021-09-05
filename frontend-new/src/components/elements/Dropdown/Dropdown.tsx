import React from 'react';
import BDropdown from 'react-bootstrap/Dropdown';
import styles from './styles.module.scss';

interface DropdownOption {
  label: string;
  onClick: () => void;
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
          <BDropdown.Item
            key={option.label}
            className={styles.option}
            href="#"
            onClick={option.onClick}
          >
            {option.label}
          </BDropdown.Item>
        ))
      }
    </BDropdown.Menu>
  </BDropdown>
);

export default Dropdown;
