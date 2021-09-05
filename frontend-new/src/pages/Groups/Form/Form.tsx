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
import Default from '../../../components/layouts/Default/Default';
import FormGroup from '../../../components/modules/FormGroup/FormGroup';
import Input from '../../../components/elements/Input/Input';
import Loader from '../../../components/elements/Loader/Loader';
import api from '../../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../../utils/extractValidationErrors';

interface GroupsFormParams {
  id?: string;
}

interface Group {
  id?: string;
  name: string;
  description?: string;
}

const GroupsForm: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<GroupsFormParams>();
  const [group, setGroup] = useState<Group>({} as Group);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

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
    history.goBack();
  }, [history, group]);

  /**
   * Update group.
   */
  const updateGroup = useCallback(async (): Promise<void> => {
    await api.put(`/group/${id}`, group);
    history.goBack();
  }, [id, group]);

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

      <Card>
        <CardHeader>
          <CardTitle>
            Create Group
          </CardTitle>
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
