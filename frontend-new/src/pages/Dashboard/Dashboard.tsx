import React from 'react';
import Default from '../../components/layouts/Default/Default';
import FormGroup from '../../components/modules/FormGroup/FormGroup';
import Input from '../../components/elements/Input/Input';

const Dashboard: React.FC = () => (
  <div>
    <Default>
      <FormGroup label="Name">
        <Input type="text" />
      </FormGroup>
    </Default>
  </div>
);

export default Dashboard;
