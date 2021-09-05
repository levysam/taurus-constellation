import React, { useCallback, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import styles from './styles.module.scss';

export interface DataTableColumn {
  field: string;
  text?: string;
  hide?: boolean;
  style?: React.CSSProperties;
  formatter?: (row: any) => any;
}

interface DataTableProps {
  title: string;
  keyField: string;
  columns: DataTableColumn[];
  data: any[];
  tools?: React.ReactNode;
  enableSelection?: boolean;
  onSelect?: (row: any) => void;
  onUnselect?: (row: any) => void;
  onSelectAll?: () => void;
  onUnselectAll?: () => void;
  onRowClick?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  keyField,
  columns,
  data,
  tools,
  enableSelection,
  onSelect,
  onUnselect,
  onSelectAll,
  onUnselectAll,
  onRowClick,
}) => {
  const handleRowClick = useCallback((row: any) => {
    if (onRowClick) {
      onRowClick(row);
    }
  }, [data, onRowClick]);

  const isNestedField = useCallback((field: string): boolean => field.includes('.'), [columns]);

  const showNestedFieldValue = useCallback((row: any, field: string) => {
    const levels = field.split('.');
    let value = row;
    levels.forEach((level) => {
      value = value[level];
    });
    return value;
  }, [data]);

  return (
    <div className={styles.dataTable}>
      <div className={styles.header}>
        <h2>
          {title}
        </h2>
        <div className={styles.tools}>
          {tools}
        </div>
      </div>
      <div className={styles.content}>
        <table
          cellSpacing={0}
          cellPadding={0}
        >
          <thead>
            <tr>
              {
                enableSelection
                && (
                  <th>
                    <Checkbox
                      variant="dark"
                    />
                  </th>
                )
              }
              {
                columns.map((column) => {
                  const style = column.style || undefined;
                  if (column.hide) {
                    return null;
                  }
                  return (
                    <th key={column.field} style={style}>
                      {column.text}
                    </th>
                  );
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              !data.length
              && (
                <tr>
                  <td colSpan={columns.length}>
                    No data available.
                  </td>
                </tr>
              )
            }
            {
              data.map((row) => (
                <tr
                  key={row[keyField]}
                  onClick={() => { handleRowClick(row); }}
                >
                  {
                    enableSelection
                    && (
                      <td>
                        <Checkbox />
                      </td>
                    )
                  }
                  {
                    columns.map((column) => {
                      const style = column.style || undefined;

                      if (column.hide) {
                        return null;
                      }
                      if (column.formatter) {
                        return (
                          <td key={column.field} style={style}>
                            {column.formatter(row)}
                          </td>
                        );
                      }
                      if (isNestedField(column.field)) {
                        return (
                          <td key={column.field} style={style}>
                            { showNestedFieldValue(row, column.field) }
                          </td>
                        );
                      }
                      return (
                        <td key={column.field} style={style}>
                          {row[column.field]}
                        </td>
                      );
                    })
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
