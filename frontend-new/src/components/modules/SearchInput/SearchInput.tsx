import React from 'react';
import ReactSelect, { OptionTypeBase } from 'react-select';

export interface SearchInputEvent {
  value: any;
}

interface SearchInputProps extends OptionTypeBase {
  handleSelect?: (event: SearchInputEvent) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  handleSelect,
  options,
  ...props
}) => {
  const onChange = (event: any): void => {
    if (!handleSelect) {
      return;
    }

    const { value } = event;

    handleSelect({
      value,
    });
  };

  return (
    <ReactSelect
      styles={{
        control: (styles) => ({
          ...styles,
          backgroundColor: 'var(--gray0)',
          borderColor: 'var(--dark)',
          borderRadius: '5px',
          boxShadow: '0 5px 35px rgba(0, 0, 0, 0.20), 0 15px 12px rgba(0, 0, 0, 0.22)',
          cursor: 'pointer',
          height: '38px',
          minWidth: '170px',
          padding: '0px 10px',
          zIndex: 99,
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
      options={options}
      onChange={onChange}
      {...props}
    />
  );
};

export default SearchInput;
