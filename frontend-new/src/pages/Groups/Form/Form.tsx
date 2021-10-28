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
import api from '../../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../../utils/extractValidationErrors';
import { useToast } from '../../../hooks/toast';

interface GroupsFormParams {
  id?: string;
}

interface Queue {
  id: string;
}

interface Group {
  id?: string;
  name: string;
  description?: string;
  queues: Queue[];
}

const GroupsForm: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const { id } = useParams<GroupsFormParams>();
  const [group, setGroup] = useState<Group>({
    name: '',
    description: '',
    queues: [],
  } as Group);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);

  useEffect(() => {
    const loadGroup = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Group>(`/group/${id}`);
        setGroup(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (id) {
      loadGroup();
    }
  }, [id]);

  /**
   * Create new group.
   */
  const createGroup = useCallback(async (): Promise<void> => {
    await api.post('/group', group);
    addToast({
      type: 'success',
      title: 'Group created successfully',
    });
    history.goBack();
  }, [history, group]);

  /**
   * Update group.
   */
  const updateGroup = useCallback(async (): Promise<void> => {
    await api.put(`/group/${id}`, group);
    addToast({
      type: 'success',
      title: 'Group updated successfully',
    });
    history.goBack();
  }, [id, group]);

  /**
   * Delete group.
   */
  const deleteGroup = useCallback(async (): Promise<void> => {
    if (group.queues.length) {
      addToast({
        type: 'error',
        title: 'Group cannot be removed',
        description: 'This group has queues.',
      });
      setShowRemoveModal(false);
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/group/${id}`);
      addToast({
        type: 'success',
        title: 'Group removed successfully',
      });
      history.goBack();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not remove the group.',
      });
      setShowRemoveModal(false);
      setLoading(false);
    }
  }, [group]);

  /**
   * Handle form submit.
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
    });

    try {
      await schema.validate(group, {
        abortEarly: false,
      });

      if (id) {
        await updateGroup();
        return;
      }

      await createGroup();
    } catch (error) {
      addToast({
        type: 'error',
        title: 'An error has occurred',
        description: 'We could not create/update the group.',
      });
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
      }
      setLoading(false);
    }
  }, [history, group, id]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <ConfirmationModal
        title="Delete queue"
        show={showRemoveModal}
        onConfirm={deleteGroup}
        onCancel={() => { setShowRemoveModal(false); }}
      >
        Do you want to delete this queue?
      </ConfirmationModal>

      <Card>
        <CardHeader>
          <CardTitle>
            {id ? 'Edit Group' : 'Create Group'}
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
                  value={group.name || ''}
                  autoComplete="off"
                  hasError={!!errors.name}
                  onInput={({ currentTarget }) => {
                    setGroup({
                      ...group,
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
                  value={group.description || ''}
                  autoComplete="off"
                  hasError={!!errors.description}
                  onInput={({ currentTarget }) => {
                    setGroup({
                      ...group,
                      description: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            {
              id
              && (
                <Col xs={12} md={6}>
                  <span>{group.queues.length} queue(s) in this group.</span>
                </Col>
              )
            }

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

export default GroupsForm;
