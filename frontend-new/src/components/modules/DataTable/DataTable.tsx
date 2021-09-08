import React, { useCallback } from 'react';
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
  title: string;
  tools?: React.ReactNode;
  enablePagination?: boolean;
  pagination?: DataTablePagination;
  onChangeSize?: (newSize: PaginationSize) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  className,
  title,
  tools,
  enablePagination,
  pagination,
  onChangeSize,
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

  return (
    <Card className={`${styles.dataTable} ${className}`}>
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
