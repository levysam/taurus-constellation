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

interface UsersFormParams {
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

interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  groupIds: string[];
  groups?: Group[];
}

const UsersForm: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<UsersFormParams>();
  const [groups, setGroups] = useState<SelectOption[]>([]);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    role: 'guest',
    groupIds: [],
  } as User);
  const [loading, setLoading] = useState<boolean>(false);
  const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const roles: SelectOption[] = [
    { label: 'Guest', value: 'guest' },
    { label: 'Controller', value: 'controller' },
    { label: 'Administrator', value: 'administrator' },
  ];

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<Group[]>('/group');
        setGroups(
          formatSelectOptions(data, 'name', 'id'),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const loadUser = async (): Promise<void> => {
      setLoading(true);
      try {
        const { data } = await api.get<User>(`/user/${id}`);
        setUser(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadGroups();
    if (id) {
      loadUser();
    }
  }, [id]);

  /**
   * Create new user.
   */
  const createUser = useCallback(async (): Promise<void> => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      role: Yup.string().required(),
      groupIds: Yup.array().of(Yup.string().required()).min(1).required(),
    });

    await schema.validate(user, {
      abortEarly: false,
    });
    await api.post('/user', user);
    history.goBack();
  }, [history, user]);

  /**
   * Update user.
   */
  const updateUser = useCallback(async (): Promise<void> => {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string(),
      role: Yup.string().required(),
      groupIds: Yup.array().of(Yup.string().required()).min(1).required(),
    });

    await schema.validate(user, {
      abortEarly: false,
    });
    await api.put(`/user/${id}`, user);
    history.goBack();
  }, [id, user]);

  /**
   * Delete user.
   */
  const deleteUser = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      await api.delete(`/user/${id}`);
      history.goBack();
    } catch (error) {
      setLoading(false);
    }
  }, [id]);

  /**
   * Handle form submit.
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      if (id) {
        await updateUser();
        return;
      }

      await createUser();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
      }
      setLoading(false);
    }
  }, [history, user, id]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <ConfirmationModal
        title="Delete User"
        show={showRemoveModal}
        onConfirm={deleteUser}
        onCancel={() => { setShowRemoveModal(false); }}
      >
        Do you want to delete this user?
      </ConfirmationModal>

      <Card>
        <CardHeader>
          <CardTitle>
            {id ? 'Edit User' : 'Create User'}
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
                  value={user.name}
                  autoComplete="off"
                  hasError={!!errors.name}
                  onInput={({ currentTarget }) => {
                    setUser({
                      ...user,
                      name: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={6}>
              <FormGroup
                label="Email"
                error={errors.email}
                required
              >
                <Input
                  type="text"
                  name="email"
                  value={user.email}
                  autoComplete="off"
                  hasError={!!errors.email}
                  onInput={({ currentTarget }) => {
                    setUser({
                      ...user,
                      email: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Password"
                error={errors.password}
                required
              >
                <Input
                  type="password"
                  name="password"
                  autoComplete="off"
                  hasError={!!errors.password}
                  onInput={({ currentTarget }) => {
                    setUser({
                      ...user,
                      password: currentTarget.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Role"
                error={errors.role}
                required
              >
                <Select
                  name="role"
                  hasError={!!errors.role}
                  options={roles}
                  handleSelect={({ value }) => {
                    setUser({
                      ...user,
                      role: value,
                    });
                  }}
                  value={roles.find((role) => role.value === user.role)}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={4}>
              <FormGroup
                label="Groups"
                error={errors.groupIds}
                required
              >
                <Select
                  name="groupIds"
                  hasError={!!errors.groupIds}
                  options={groups}
                  handleSelect={({ value }) => {
                    setUser({
                      ...user,
                      groupIds: value,
                    });
                  }}
                  value={groups.filter((group) => user.groupIds.includes(group.value))}
                  isMulti
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

export default UsersForm;
