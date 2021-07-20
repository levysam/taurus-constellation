import React from 'react';
import ReactSelect, { OptionTypeBase } from 'react-select';

const Select: React.FC<OptionTypeBase> = ({
  ...props
}) => (
  <ReactSelect
    styles={{
      control: (styles) => ({
        ...styles,
        backgroundColor: 'var(--dark)',
        borderColor: 'transparent',
        borderRadius: '5px',
        boxShadow: 'none',
        cursor: 'pointer',
        height: '38px',
        padding: '0px 10px',
        zIndex: 99,
        ':hover': {
          ...styles[':hover'],
          borderColor: 'transparent',
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
        ':first-child': {
          ...styles[':first-child'],
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
    {...props}
  />
);

export default Select;
