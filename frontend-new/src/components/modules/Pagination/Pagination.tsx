import React, { useCallback } from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../../elements/Dropdown/Dropdown';
import styles from './styles.module.scss';

export type PaginationSize = 10 | 25 | 50 | 100 | 1000;

interface PaginationProps extends ReactPaginateProps {
  size: PaginationSize;
  onChangeSize?: (size: PaginationSize) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  size,
  onChangeSize,
  ...props
}) => {
  /**
   * Handle change size.
   */
  const handleChangeSize = useCallback((newSize: PaginationSize) => {
    if (onChangeSize) {
      onChangeSize(newSize);
    }
  }, [onChangeSize]);

  return (
    <div className={styles.container}>
      <Dropdown
        title={size.toString()}
        options={[
          { label: '10', onClick: () => { handleChangeSize(10); } },
          { label: '25', onClick: () => { handleChangeSize(25); } },
          { label: '50', onClick: () => { handleChangeSize(50); } },
          { label: '100', onClick: () => { handleChangeSize(100); } },
          { label: '1000', onClick: () => { handleChangeSize(1000); } },
        ]}
      />
      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        breakLabel="..."
        containerClassName={styles.pagination}
        pageClassName={styles.page}
        pageLinkClassName={styles.link}
        activeClassName={styles.active}
        breakClassName={styles.break}
        previousClassName={styles.page}
        previousLinkClassName={styles.link}
        nextClassName={styles.page}
        nextLinkClassName={styles.link}
        {...props}
      />
    </div>
  );
};

export default Pagination;
