import React from 'react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Dropdown from '../Dropdown/Dropdown';
import styles from './styles.module.scss';

const Pagination: React.FC<ReactPaginateProps> = ({
  ...props
}) => (
  <div className={styles.container}>
    <ReactPaginate
      previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
      nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
      breakLabel="..."
      containerClassName={styles.pagination}
      pageClassName={styles.page}
      activeClassName={styles.active}
      breakClassName={styles.break}
      previousClassName={styles.page}
      nextClassName={styles.page}
      {...props}
    />
    <Dropdown
      title="10"
      options={[
        { label: '10' },
        { label: '25' },
        { label: '50' },
        { label: '100' },
        { label: '1000' },
      ]}
    />
  </div>
);

export default Pagination;
