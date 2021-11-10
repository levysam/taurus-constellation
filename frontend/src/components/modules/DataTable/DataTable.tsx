import React, { useCallback } from 'react';
import classnames from 'classnames';
import BTable, { BootstrapTableProps, ColumnDescription } from 'react-bootstrap-table-next';
import Card, { CardFooter, CardHeader, CardTitle } from '../../elements/Card/Card';
import Pagination, { PaginationSize } from '../Pagination/Pagination';
import styles from './styles.module.scss';

export type DataTableColumn = ColumnDescription;

export interface DataTablePagination {
  page: number;
  size: PaginationSize;
  total: number;
}

interface DataTableProps extends Omit<BootstrapTableProps, 'pagination'> {
  className?: string;
  title: string | React.ReactNode;
  tools?: React.ReactNode;
  enablePagination?: boolean;
  pagination?: DataTablePagination;
  onChangeSize?: (newSize: PaginationSize) => void;
  onChangePage?: (page: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  className,
  title,
  tools,
  enablePagination,
  pagination,
  onChangeSize,
  onChangePage,
  ...props
}) => {
  /**
   * Get page count.
   */
  const getPageCount = useCallback((): number => {
    if (!pagination) {
      return 0;
    }

    const {
      total,
      size,
    } = pagination;

    return Math.ceil(total / size);
  }, [pagination]);

  /**
   * Get data table class name.
   */
  const getDataTableClassName = (): string => {
    const classes = classnames(styles.dataTable, {
      [styles.paginated]: !!pagination,
    });
    return `${classes} ${className}`;
  };

  return (
    <Card className={getDataTableClassName()}>
      <CardHeader className={styles.header}>
        <CardTitle>
          {title}
        </CardTitle>

        {
          tools
          && (
          <div className={styles.tools}>
            {tools}
          </div>
          )
        }
      </CardHeader>

      <BTable
        classes={styles.table}
        headerClasses={styles.header}
        rowClasses={styles.row}
        hover
        wrapperClasses="table-responsive"
        {...props}
      />

      {
      enablePagination
      && (
      <CardFooter className={styles.footer}>
        <Pagination
          size={pagination ? pagination.size : 25}
          onChangeSize={onChangeSize}
          onPageChange={({ selected }) => {
            if (onChangePage) {
              onChangePage(selected + 1);
            }
          }}
          pageCount={getPageCount()}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
        />
      </CardFooter>
      )
    }
    </Card>
  );
};

export default DataTable;
