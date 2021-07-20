import React from 'react';
import styles from './styles.module.scss';

const DataTable: React.FC = () => {
  const a = 'a';

  return (
    <div className={styles.dataTable}>
      <div className={styles.header}>
        <h2>
          Users
        </h2>
      </div>
      <div className={styles.content}>
        <table cellSpacing={0} cellPadding={0}>
          <thead>
            <tr />
          </thead>
          <tbody>
            <tr />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
