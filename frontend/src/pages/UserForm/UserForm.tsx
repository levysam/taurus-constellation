import React from 'react';
import Default from '../../layouts/Default/Default';
import PageHeader from '../../components/PageHeader/PageHeader';

const UserForm: React.FC = () => {
  const title = 'Create User';

  return (
    <Default>
      <PageHeader title={title} />
    </Default>
  );
};

export default UserForm;
