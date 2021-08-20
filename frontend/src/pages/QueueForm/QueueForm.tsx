import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Default from '../../layouts/Default/Default';
import Card, { CardHeader, CardTitle } from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import Col from '../../components/Col/Col';
import Input, { InputEvent } from '../../components/Input/Input';
import InputBlock from '../../components/InputBlock/InputBlock';
import Button from '../../components/Button/Button';
import Select from '../../components/Select/Select';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import api from '../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';

interface QueueFormParams {
  id?: string;
}

interface Queue {
  id?: string;
  name: string;
  host: string;
  port: number;
  groupId: string;
  description?: string;
}

interface Group {
  id: string;
  name: string;
}

interface GroupOption {
  label: string;
  value: string;
}

const QueueForm: React.FC = () => {
  const history = useHistory();
  const { id: queueId } = useParams<QueueFormParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [queue, setQueue] = useState<Queue>({
    name: '',
    host: '',
    port: 6379,
    groupId: '',
    description: '',
  });
  const [groups, setGroups] = useState<GroupOption[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const title = queueId
    ? 'Edit Queue'
    : 'Create Queue';

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Group[]>('/group');
        setGroups(
          data.map((group) => ({
            label: group.name,
            value: group.id,
          })),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const loadQueue = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Queue>(`/queue/${queueId}`);
        setQueue(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadGroups();
    if (queueId) {
      loadQueue();
    }
  }, [history]);

  const handleInput = ({
    name,
    value,
  }: InputEvent): void => {
    setQueue({
      ...queue,
      [name]: value,
    });
  };

  const saveQueue = async (): Promise<void> => {
    setLoading(true);
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      host: Yup.string().required(),
      port: Yup.number().required(),
      groupId: Yup.string().required(),
      description: Yup.string(),
    });

    try {
      await schema.validate(queue, {
        abortEarly: false,
      });

      if (queueId) {
        await api.put(`/queue/${queueId}`, queue);
        history.push('/queues');
        return;
      }

      await api.post('/queue', queue);
      history.push('/queues');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(
            error,
          ),
        );
      }
      setLoading(false);
    }
  };

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <Card>
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
        </CardHeader>
        <Container>
          <Row>
            <Col
              xs={12}
              md={4}
            >
              <InputBlock
                label="Name"
                required
                error={errors.name}
              >
                <Input
                  type="text"
                  name="name"
                  value={queue.name}
                  handleInput={handleInput}
                  hasError={!!errors.name}
                />
              </InputBlock>
            </Col>
            <Col
              xs={12}
              md={4}
            >
              <InputBlock
                label="Host"
                required
                error={errors.host}
              >
                <Input
                  type="text"
                  name="host"
                  value={queue.host}
                  handleInput={handleInput}
                  hasError={!!errors.host}
                />
              </InputBlock>
            </Col>
            <Col
              xs={12}
              md={4}
            >
              <InputBlock
                label="Port"
                required
                error={errors.port}
              >
                <Input
                  type="number"
                  name="port"
                  value={queue.port}
                  handleInput={handleInput}
                  hasError={!!errors.port}
                />
              </InputBlock>
            </Col>
            <Col
              xs={12}
              md={6}
            >
              <InputBlock
                label="Group"
                required
                error={errors.groupId}
              >
                <Select
                  name="groupId"
                  options={groups}
                  value={groups.filter((group) => group.value === queue.groupId)}
                  handleSelect={handleInput}
                  hasError={!!errors.groupId}
                />
              </InputBlock>
            </Col>
            <Col
              xs={12}
              md={6}
            >
              <InputBlock
                label="Description"
                error={errors.description}
              >
                <Input
                  type="text"
                  name="description"
                  value={queue.description || ''}
                  handleInput={handleInput}
                  hasError={!!errors.description}
                />
              </InputBlock>
            </Col>
            <Col
              xs={12}
              className={styles.actions}
            >
              <Button
                type="button"
                variant="default"
                onClick={() => { history.push('/queues'); }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={saveQueue}
              >
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
