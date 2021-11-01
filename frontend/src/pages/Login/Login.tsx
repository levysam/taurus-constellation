import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Auth from '../../components/layouts/Auth/Auth';
import Button from '../../components/elements/Button/Button';
import FormGroup from '../../components/modules/FormGroup/FormGroup';
import Input from '../../components/elements/Input/Input';
import Loader from '../../components/elements/Loader/Loader';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';
import { useAuth } from '../../hooks/auth';
import styles from './styles.module.scss';

interface Data {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });
  const { signIn } = useAuth();

  /**
   * Authenticate user.
   */
  const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      await signIn(data);
      history.push('/dashboard');
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
    <Auth>

      {
        loading
        && <Loader />
      }

      <Container fluid>
        <Row>
          <Col>
            <div className={styles.main}>
              <div className={styles.title}>
                <span>
                  Welcome to
                </span>
                <h2>
                  Taurus Constellation
                </h2>
              </div>
              <form
                className={styles.content}
                onSubmit={handleSubmit}
              >
                <FormGroup
                  className="mb-1"
                  label="Email"
                  error={errors.email}
                  required
                >
                  <Input
                    type="email"
                    placeholder="Enter you email"
                    hasError={!!errors.email}
                    onInput={({ currentTarget }) => {
                      setData({
                        ...data,
                        email: currentTarget.value,
                      });
                    }}
                  />
                </FormGroup>

                <FormGroup
                  label="Password"
                  error={errors.password}
                  required
                >
                  <Input
                    type="password"
                    placeholder="Enter you password"
                    hasError={!!errors.password}
                    onInput={({ currentTarget }) => {
                      setData({
                        ...data,
                        password: currentTarget.value,
                      });
                    }}
                  />
                </FormGroup>

                <Button
                  type="submit"
                  variant="primary"
                >
                  Enter
                </Button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </Auth>
  );
};

export default Login;
