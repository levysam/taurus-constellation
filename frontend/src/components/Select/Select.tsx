import React from 'react';
import ReactSelect, { OptionTypeBase } from 'react-select';

export interface SelectEvent {
  name: string;
  value: any;
}

interface SelectProps extends OptionTypeBase {
  name?: string;
  hasError?: boolean;
  handleSelect?: (event: SelectEvent) => void;
}

const Select: React.FC<SelectProps> = ({
  name,
  hasError,
  handleSelect,
  options,
  ...props
}) => {
  const onChange = (event: any): void => {
    if (!name || !handleSelect) {
      return;
    }

    if (Array.isArray(event)) {
      handleSelect({
        name,
        value: event.map(({ value }) => value),
      });
      return;
    }

    const { value } = event;
    handleSelect({
      name,
      value,
    });
  };

  return (
    <ReactSelect
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: 'var(--dark)',
          borderWidth: '2px',
          borderColor: hasError ? 'var(--red)' : 'transparent',
          borderRadius: '5px',
          boxShadow: 'none',
          cursor: 'pointer',
          height: '38px',
          padding: '0px 10px',
          zIndex: 99,
          ':hover': {
            ...styles[':hover'],
            borderColor: hasError ? 'var(--red)' : 'transparent',
          },
        }),
        indicatorSeparator: (styles) => ({
          ...styles,
          display: 'none',
        }),
        menu: (styles) => ({
          ...styles,
          backgroundColor: 'var(--dark)',
          marginTop: '-10px',
          paddingTop: '10px',
        }),
        option: (styles) => ({
          ...styles,
          backgroundColor: 'var(--dark)',
          borderTop: '1px solid var(--gray1)',
          color: 'var(--gray2)',
          cursor: 'pointer',
          ':first-of-type': {
            ...styles[':first-of-type'],
            borderTop: 'none',
          },
          ':active': {
            ...styles[':active'],
            backgroundColor: 'var(--dark)',
          },
          ':hover': {
            ...styles[':hover'],
            color: 'var(--white)',
          },
        }),
        singleValue: (styles) => ({
          ...styles,
          color: 'var(--white)',
        }),
        multiValue: (styles) => ({
          ...styles,
          backgroundColor: 'var(--gray2)',
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: 'var(--white)',
        }),
      }}
      options={options}
      onChange={onChange}
      {...props}
    />
  );
};

export default Select;
