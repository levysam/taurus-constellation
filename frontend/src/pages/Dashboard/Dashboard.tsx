import React, { useEffect, useState } from 'react';
import Col from '../../components/Col/Col';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import Default from '../../layouts/Default/Default';
import Loader from '../../components/Loader/Loader';
import QueueCard from '../../components/QueueCard/QueueCard';
import styles from './styles.module.scss';

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

      <Container>
        <Row>
          <Col md={3}>
            <QueueCard
              name="arktis-event"
            />
          </Col>
        </Row>
      </Container>
    </Default>
  );
};

export default Dashboard;
