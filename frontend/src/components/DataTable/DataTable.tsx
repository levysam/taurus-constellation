import React from 'react';
import { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import Dropdown from '../Dropdown/Dropdown';
import Pagination from '../Pagination/Pagination';
import styles from './styles.module.scss';

interface DataTableColumn {
  label: string;
  field: string;
  hidden?: boolean;
}

interface DataTableProps {
  title: string;
  columns: DataTableColumn[];
  data: any[];
  idField: string;
  selection?: boolean;
  pagination?: boolean;
  onSelect?: (selected: any) => void;
  onClickRow?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  idField,
  selection,
  pagination,
  onSelect,
  onClickRow,
  children,
}) => {
  const [selected, setSelected] = useState([] as any);

  const selectAll = (): void => {
    const newSelected = data.map((row: any) => row[idField]);
    setSelected(newSelected);
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const unselectAll = (): void => {
    setSelected([]);
    if (onSelect) {
      onSelect([]);
    }
  };

  const selectRow = (row: any): void => {
    const id = row[idField];
    if (selected.indexOf(id) !== -1) {
      return;
    }
    const newSelected = [
      ...selected,
      id,
    ];
    setSelected(newSelected);
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const unselectRow = (row: any): void => {
    const id = row[idField];
    const newSelected = selected.filter((item: any) => item !== id);
    setSelected(newSelected);
    if (onSelect) {
      onSelect(newSelected);
    }
  };

  const handleClickRow = (row: any): void => {
    if (onClickRow) {
      onClickRow(row);
    }
  };

  return (
    <div className={styles.dataTable}>
      <div className={styles.header}>
        <h2>
          {title}
        </h2>
        <div className={styles.tools}>
          {children}
        </div>
      </div>
      <div className={styles.content}>
        <table cellSpacing={0} cellPadding={0}>
          <thead>
            <tr>
              {
                selection
                && (
                <th className={styles.checkboxColumn}>
                  <Checkbox
                    variant="dark"
                    checked={data.length > 0 && data.length === selected.length}
                    onCheck={() => { selectAll(); }}
                    onUncheck={() => { unselectAll(); }}
                  />
                </th>
                )
              }
              {
                columns.map((column) => (
                  !column.hidden ? <th key={column.field}>{column.label}</th> : null
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((row) => (
                <tr
                  key={row[idField]}
                  onClick={() => { handleClickRow(row); }}
                >
                  {
                    selection
                    && (
                      <td>
                        <Checkbox
                          checked={selected.indexOf(row[idField]) > -1}
                          onCheck={() => { selectRow(row); }}
                          onUncheck={() => { unselectRow(row); }}
                        />
                      </td>
                    )
                  }
                  {
                    columns.map((column) => (
                      !column.hidden ? <td key={`${row[idField]}-${column.field}`}>{row[column.field]}</td> : null
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          pagination
          && (
          <div className={styles.pagination}>
            <Pagination
              pageCount={10}
              pageRangeDisplayed={1}
              marginPagesDisplayed={0}
            />
          </div>
          )
        }
      </div>
    </div>
  );
};

export default DataTable;
