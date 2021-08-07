import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useHistory, useParams } from 'react-router-dom';
import Default from '../../layouts/Default/Default';
import Card, { CardHeader, CardTitle, CardTools } from '../../components/Card/Card';
import Container from '../../components/Container/Container';
import Row from '../../components/Row/Row';
import Col from '../../components/Col/Col';
import Input, { InputEvent } from '../../components/Input/Input';
import InputBlock from '../../components/InputBlock/InputBlock';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import styles from './styles.module.scss';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';
import api from '../../services/api';

interface GroupFormParams {
  id?: string;
}
interface Group {
  id?: string;
  name: string;
  description?: string;
}

const GroupForm: React.FC = () => {
  const history = useHistory();
  const { id: groupId } = useParams<GroupFormParams>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [group, setGroup] = useState<Group>({
    name: '',
    description: '',
  });
  const title = groupId
    ? 'Edit Group'
    : 'Create Group';

  useEffect(() => {
    const loadGroup = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await api.get(`/group/${groupId}`);
        setGroup(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (groupId) {
      loadGroup();
    }
  }, [history]);

  const handleInput = ({
    name,
    value,
  }: InputEvent): void => {
    setGroup({
      ...group,
      [name]: value,
    });
  };

  const saveGroup = async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string(),
    });

    try {
      await schema.validate(group, {
        abortEarly: false,
      });

      if (groupId) {
        await api.put(`/group/${groupId}`, group);
        history.push('/groups');
        return;
      }

      await api.post('/group', group);
      history.push('/groups');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
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
              md={6}
            >
              <InputBlock
                label="Name"
                required
                error={errors.name}
              >
                <Input
                  type="text"
                  name="name"
                  value={group.name}
                  handleInput={handleInput}
                  hasError={!!errors.name}
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
                  value={group.description}
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
                onClick={() => { history.push('/groups'); }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={saveGroup}
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

export default GroupForm;
