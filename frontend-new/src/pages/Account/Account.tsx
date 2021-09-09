import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Button from '../../components/elements/Button/Button';
import Card, { CardFooter, CardHeader, CardTitle } from '../../components/elements/Card/Card';
import Default from '../../components/layouts/Default/Default';
import FormGroup from '../../components/modules/FormGroup/FormGroup';
import Input from '../../components/elements/Input/Input';
import Loader from '../../components/elements/Loader/Loader';
import Select from '../../components/elements/Select/Select';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';
import formatSelectOptions from '../../utils/formatSelectOptions';

interface Group {
  id: string;
  name: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  role: string;
  groupIds: string[];
}

interface SelectOption {
  label: string;
  value: any;
}

const Account: React.FC = () => {
  const history = useHistory();
  const { updateUser, user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<SelectOption[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    role: '',
    groupIds: [],
  } as UserData);
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

    setUserData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      groupIds: user.groupIds,
    });
    loadGroups();
  }, [history]);

  /**
   * Update user.
   */
  const handleSubmit = useCallback(async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string(),
      role: Yup.string().required(),
      groupIds: Yup.array().of(Yup.string().required()).required(),
    });

    try {
      await schema.validate(userData, {
        abortEarly: false,
      });
      const { data } = await api.put(`/user/${user.id}`, userData);
      updateUser(data);
      history.push('/dashboard');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
      }
      setLoading(false);
    }
  }, [user, userData]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>
              My Account
            </CardTitle>
          </CardHeader>

          <Container fluid>
            <Row>
              <Col xs={12} md={12}>
                <FormGroup
                  label="Name"
                  error={errors.name}
                  required
                >
                  <Input
                    type="text"
                    name="name"
                    value={userData.name}
                    autoComplete="off"
                    hasError={!!errors.name}
                    onInput={({ currentTarget }) => {
                      setUserData({
                        ...userData,
                        name: currentTarget.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
                <FormGroup
                  label="Email"
                  required
                >
                  <Input
                    type="text"
                    name="email"
                    value={userData.email}
                    autoComplete="off"
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
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
                      setUserData({
                        ...userData,
                        password: currentTarget.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
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
                      if (user.role !== 'administrator') {
                        return;
                      }
                      setUserData({
                        ...userData,
                        role: value,
                      });
                    }}
                    value={roles.find((role) => role.value === user.role)}
                    isDisabled={user.role !== 'administrator'}
                  />
                </FormGroup>
              </Col>

              <Col xs={12} md={6}>
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
                      if (user.role !== 'administrator') {
                        return;
                      }
                      setUserData({
                        ...userData,
                        groupIds: value,
                      });
                    }}
                    value={groups.filter((group) => user.groupIds.includes(group.value))}
                    isMulti
                    isDisabled={user.role !== 'administrator'}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Container>

          <CardFooter>
            <Button type="submit">
              Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Default>
  );
};

export default Account;
