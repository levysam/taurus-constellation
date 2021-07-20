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
import styles from './styles.module.scss';

const GroupForm: React.FC = () => {
  const a = '';

  return (
    <Default>
      <Card title="Create Group">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <InputBlock label="Name" required>
                <Input type="text" />
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

export default GroupForm;
