import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import Auth from '../../components/layouts/Auth/Auth';
import Button from '../../components/elements/Button/Button';
import FormGroup from '../../components/modules/FormGroup/FormGroup';
import Input from '../../components/elements/Input/Input';
import Loader from '../../components/elements/Loader/Loader';
import extractValidationErrors, { ValidationErrors } from '../../utils/extractValidationErrors';
import styles from './styles.module.scss';

interface Data {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [data, setData] = useState<Data>({
    email: '',
    password: '',
  });

  /**
   * Authenticate user.
   */
  const authenticate = async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    try {
      await schema.validate(data, {
        abortEarly: false,
      });
      setLoading(false);
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
              <div className={styles.content}>
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
                  type="button"
                  variant="primary"
                  onClick={authenticate}
                >
                  Enter
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Auth>
  );
};

export default Login;
