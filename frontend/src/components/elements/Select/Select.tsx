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
  isMulti,
  ...props
}) => {
  const formattedOptions = isMulti
    ? [{ label: 'Select All', value: 'all' }, ...options]
    : options;

  const onChange = (selected: any): void => {
    if (!name || !handleSelect) {
      return;
    }

    if (Array.isArray(selected)) {
      const all = selected.find((option) => option.value === 'all');
      if (all) {
        handleSelect({
          name,
          value: options.map((option: any) => option.value),
        });
        return;
      }

      handleSelect({
        name,
        value: selected.map(({ value }) => value),
      });
      return;
    }

    const { value } = selected;
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
          borderColor: hasError ? 'var(--danger)' : 'transparent',
          borderRadius: '5px',
          boxShadow: 'none',
          cursor: 'pointer',
          minHeight: '38px',
          padding: '0px 10px',
          zIndex: 99,
          ':hover': {
            ...styles[':hover'],
            borderColor: hasError ? 'var(--danger)' : 'transparent',
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
            fontWeight: 'bold',
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
        singleValue: (styles, { isDisabled }) => ({
          ...styles,
          color: isDisabled ? 'var(--gray2)' : 'var(--white)',
        }),
        multiValue: (styles, { isDisabled }) => ({
          ...styles,
          backgroundColor: isDisabled ? 'var(--gray1)' : 'var(--gray2)',
        }),
        multiValueLabel: (styles) => ({
          ...styles,
          color: 'var(--white)',
        }),
      }}
      options={formattedOptions}
      isMulti={isMulti}
      onChange={onChange}
      {...props}
    />
  );
};

export default Select;
