import React from 'react';
import Default from '../../layouts/Default/Default';
import Card from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import Col from '../../components/Col/Col';
import Input from '../../components/Input/Input';
import InputBlock from '../../components/InputBlock/InputBlock';
import Textarea from '../../components/Textarea/Textarea';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import styles from './styles.module.scss';

const QueueForm: React.FC = () => {
  const a = '';

  const groupsOptions = [
    {
      label: 'arktis',
      value: '1',
    },
    {
      label: 'organic-search',
      value: '2',
    },
  ];

  return (
    <Default>
      <Card title="Create Queue">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <InputBlock label="Name" required>
                <Input type="text" />
              </InputBlock>
            </Col>
            <Col xs={12} md={4}>
              <InputBlock label="Host" required>
                <Input type="text" />
              </InputBlock>
            </Col>
            <Col xs={12} md={4}>
              <InputBlock label="Port" required>
                <Input type="text" />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock label="Group" required>
                <Select options={groupsOptions} />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock label="Description">
                <Textarea />
              </InputBlock>
            </Col>
            <Col xs={12} className={styles.actions}>
              <Button variant="default">
                Cancel
              </Button>
              <Button variant="primary">
                Save
              </Button>
            </Col>
          </Row>
        </Container>
      </Card>
    </Default>
  );
};

export default QueueForm;
