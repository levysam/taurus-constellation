import React, { useState } from 'react';
import Default from '../../layouts/Default/Default';
import Loader from '../../components/Loader/Loader';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <h2 style={{ marginBottom: '50px' }}>
        Dashboard
      </h2>

    </Default>
  );
};

export default Dashboard;
