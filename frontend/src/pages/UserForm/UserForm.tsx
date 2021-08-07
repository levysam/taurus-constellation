import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import Default from '../../layouts/Default/Default';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import Col from '../../components/Col/Col';
import Card, { CardHeader, CardTitle, CardTools } from '../../components/Card/Card';
import styles from './styles.module.scss';
import InputBlock from '../../components/InputBlock/InputBlock';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import api from '../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';

interface UserFormParams {
  id?: string;
}

interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  groups: Group[];
  groupIds: string[];
}
interface Group {
  id: string;
  name: string;
}
interface SelectOption {
  label: string;
  value: any;
}

const UserForm: React.FC = () => {
  const history = useHistory();
  const { id: userId } = useParams<UserFormParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showDisableModal, setShowDisableModal] = useState<boolean>(false);
  const [groups, setGroups] = useState<SelectOption[]>([] as SelectOption[]);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    role: 'guest',
    groups: [],
    groupIds: [],
  } as User);
  const [errors, setErrors] = useState<ValidationErrors>({} as ValidationErrors);
  const title = userId ? 'Edit User' : 'Create User';

  useEffect(() => {
    const loadGroups = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get('/group');
        setGroups(
          data.map((group: Group) => ({
            label: group.name,
            value: group.id,
          })),
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const loadUser = async (id: string): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get(`/user/${id}`);
        setUser(data as User);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    loadGroups();
    if (userId) {
      loadUser(userId);
    }
  }, [history]);

  const handleInput = (
    name: string,
    value: string,
  ): void => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const createUser = async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
      role: Yup.string().required(),
      groupIds: Yup.array().of(Yup.string().required()).min(1).required(),
    });

    try {
      await schema.validate(user, {
        abortEarly: false,
      });

      await api.post('/user', user);
      history.push('/users');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
        setLoading(false);
      }
    }
  };

  const updateUser = async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string(),
      role: Yup.string().required(),
      groupIds: Yup.array().of(Yup.string().required()).min(1).required(),
    });

    try {
      await schema.validate(user, {
        abortEarly: false,
      });

      await api.put(`/user/${userId}`, user);
      history.push('/users');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
        setLoading(false);
      }
    }
  };

  const saveUser = async (): Promise<void> => (userId
    ? updateUser()
    : createUser()
  );

  const disableUser = async (): Promise<void> => {
    setLoading(true);
    setLoading(false);
    setShowDisableModal(false);
  };

  const roles: SelectOption[] = [
    {
      label: 'Guest',
      value: 'guest',
    },
    {
      label: 'Controller',
      value: 'controller',
    },
    {
      label: 'Administrator',
      value: 'administrator',
    },
  ];

  return (
    <Default>

      <ConfirmationModal
        show={showDisableModal}
        title="Disable User"
        onConfirm={disableUser}
        onCancel={() => { setShowDisableModal(false); }}
      >
        Do you really want to disable this user?
      </ConfirmationModal>

      {
        loading
        && <Loader />
      }

      <Card>
        <CardHeader>
          <CardTitle>
            {title}
          </CardTitle>
          <CardTools>
            <Button
              type="button"
              variant="red"
              onClick={() => { setShowDisableModal(true); }}
            >
              Disable
            </Button>
          </CardTools>
        </CardHeader>
        <Container>
          <Row>
            <Col xs={12} style={{ marginBottom: '20px' }}>
              <InputBlock
                label="Name"
                required
                error={errors.name}
              >
                <Input
                  name="name"
                  type="text"
                  value={user.name}
                  handleInput={({ name, value }) => { handleInput(name, value); }}
                  hasError={!!errors.name}
                />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock
                label="Email"
                required
                error={errors.email}
              >
                <Input
                  name="email"
                  type="email"
                  value={user.email}
                  handleInput={({ name, value }) => { handleInput(name, value); }}
                  hasError={!!errors.email}
                />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock
                label="Password"
                required={!userId}
                error={errors.password}
              >
                <Input
                  name="password"
                  type="password"
                  handleInput={({ name, value }) => { handleInput(name, value); }}
                  hasError={!!errors.password}
                />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock
                label="Role"
                required
                error={errors.role}
              >
                <Select
                  name="role"
                  options={roles}
                  value={roles.find((role) => role.value === (user.role || 'guest'))}
                  handleSelect={({ name, value }) => { handleInput(name, value); }}
                  hasError={!!errors.role}
                />
              </InputBlock>
            </Col>
            <Col xs={12} md={6}>
              <InputBlock
                label="Groups"
                required
                error={errors.groupIds}
              >
                <Select
                  name="groupIds"
                  options={groups}
                  value={groups.filter((group) => user.groupIds.includes(group.value))}
                  isMulti
                  handleSelect={({ name, value }) => { handleInput(name, value); }}
                  hasError={!!errors.groupIds}
                />
              </InputBlock>
            </Col>
            <Col xs={12} className={styles.actions}>
              <Button
                type="button"
                variant="default"
                onClick={() => { history.push('/users'); }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={saveUser}
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

export default UserForm;
