import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import Button from '../../../components/elements/Button/Button';
import Card, { CardFooter, CardHeader, CardTitle } from '../../../components/elements/Card/Card';
import ConfirmationModal from '../../../components/modules/ConfirmationModal/ConfirmationModal';
import Default from '../../../components/layouts/Default/Default';
import Dropdown from '../../../components/elements/Dropdown/Dropdown';
import FormGroup from '../../../components/modules/FormGroup/FormGroup';
import Input from '../../../components/elements/Input/Input';
import Loader from '../../../components/elements/Loader/Loader';
import Select from '../../../components/elements/Select/Select';
import api from '../../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../../utils/extractValidationErrors';
import formatSelectOptions from '../../../utils/formatSelectOptions';
import { useToast } from '../../../hooks/toast';

interface QueuesFormParams {
  id?: string;
}

interface SelectOption {
  label: string;
  value: any;
}

interface Group {
  id: string;
  name: string;
}

interface Queue {
  id?: string;
  name: string;
  description?: string;
  compliance?: string;
  host: string;
  port: number;
  groupId: string;
  group?: Group;
}

interface GroupListResponse {
  total: number;
  groups: Group[];
}

const QueuesForm: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams<QueuesFormParams>();
  const [groups, setGroups] = useState<SelectOption[]>([]);
  const [queue, setQueue] = useState<Queue>({
    name: '',
    description: '',
    compliance: '',
    host: '',
    port: 6379,
    groupId: '',
  } as Queue);
  const [loading, setLoading] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<GroupListResponse>('/group');
        setGroups(
          formatSelectOptions(data.groups, 'name', 'id'),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const loadQueue = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Queue>(`/queue/${id}`);
        setQueue(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadGroups();
    if (id) {
      loadQueue();
    }
  }, [id]);

  /**
   * Create new queue.
   */
  const createQueue = useCallback(async (): Promise<void> => {
    await api.post('/queue', queue);
    addToast({
      type: 'success',
      title: 'Queue created successfully',
    });
    history.goBack();
  }, [history, queue]);

  /**
   * Update queue.
   */
  const updateQueue = useCallback(async (): Promise<void> => {
    await api.put(`/queue/${id}`, queue);
    addToast({
      type: 'success',
      title: 'Queue updated successfully',
    });
    history.goBack();
  }, [id, queue]);

  /**
   * Delete queue.
   */
  const deleteQueue = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`/queue/${id}`);
      addToast({
        type: 'success',
        title: 'Queue removed successfully',
      });
      history.goBack();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not remove the queue.',
      });
      setLoading(false);
    }
  }, [id]);

  /**
   * Handle form submit.
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
      compliance: Yup.string(),
      host: Yup.string().required(),
      port: Yup.number().required(),
      groupId: Yup.string().required(),
    });

    try {
      await schema.validate(queue, {
        abortEarly: false,
      });

      if (id) {
        await updateQueue();
        return;
      }

      await createQueue();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not create/update the queue.',
      });
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
      }
      setLoading(false);
    }
  }, [history, queue, id]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <ConfirmationModal
        title="Delete queue"
        show={showRemoveModal}
        onConfirm={deleteQueue}
        onCancel={() => { setShowRemoveModal(false); }}
      >
        Do you want to delete this queue?
      </ConfirmationModal>

      <Card>
        <CardHeader>
          <CardTitle>
            {id ? 'Edit Queue' : 'Create Queue'}
          </CardTitle>
          {
            id
            && (
              <Dropdown
                title="Actions"
                options={[
                  {
                    label: 'Delete',
                    onClick: () => { setShowRemoveModal(true); },
                  },
                ]}
              />
            )
          }
        </CardHeader>

        <Container fluid>
          <Row>
            <Col xs={12} md={6}>
              <FormGroup
                label="Name"
                error={errors.name}
                required
              >
                <Input
                  type="text"
                  name="name"
                  value={queue.name}
                  autoComplete="off"
                  hasError={!!errors.name}
                  onInput={({ currentTarget }) => {
                    setQueue({
                      ...queue,
                      name: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={6}>
              <FormGroup
                label="Description"
                error={errors.description}
              >
                <Input
                  type="text"
                  name="description"
                  value={queue.description}
                  autoComplete="off"
                  hasError={!!errors.description}
                  onInput={({ currentTarget }) => {
                    setQueue({
                      ...queue,
                      description: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Host"
                error={errors.host}
                required
              >
                <Input
                  type="text"
                  name="host"
                  value={queue.host}
                  autoComplete="off"
                  hasError={!!errors.host}
                  onInput={({ currentTarget }) => {
                    setQueue({
                      ...queue,
                      host: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Port"
                error={errors.port}
                required
              >
                <Input
                  type="number"
                  name="port"
                  value={queue.port}
                  autoComplete="off"
                  hasError={!!errors.port}
                  onInput={({ currentTarget }) => {
                    setQueue({
                      ...queue,
                      port: Number(currentTarget.value),
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Group"
                error={errors.groupId}
                required
              >
                <Select
                  name="groupId"
                  hasError={!!errors.groupId}
                  options={groups}
                  handleSelect={({ value }) => {
                    setQueue({
                      ...queue,
                      groupId: value,
                    });
                  }}
                  value={groups.find((group) => group.value === queue.groupId)}
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={12}>
              <FormGroup
                label="Compliance"
                error={errors.compliance}
                required
              >
                <Input
                  type="text"
                  name="compliance"
                  value={queue.compliance}
                  autoComplete="off"
                  hasError={!!errors.compliance}
                  onInput={({ currentTarget }) => {
                    setQueue({
                      ...queue,
                      compliance: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
        </Container>

        <CardFooter>
          <Button
            className="mr-1"
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button
            variant="dark"
            onClick={() => { history.goBack(); }}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </Default>
  );
};

export default QueuesForm;
