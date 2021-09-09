import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import * as Yup from 'yup';
import Breadcrumb from '../../../../components/modules/Breadcrumb/Breadcrumb';
import Button from '../../../../components/elements/Button/Button';
import Card, { CardFooter, CardHeader, CardTitle } from '../../../../components/elements/Card/Card';
import Default from '../../../../components/layouts/Default/Default';
import FormGroup from '../../../../components/modules/FormGroup/FormGroup';
import Loader from '../../../../components/elements/Loader/Loader';
import Textarea from '../../../../components/elements/Textarea/Textarea';
import api from '../../../../services/api';
import { capitalize } from '../../../../utils/stringUtils';
import extractValidationErrors, { ValidationErrors } from '../../../../utils/extractValidationErrors';

interface JobsFormParams {
  queueId: string;
  state: string;
}

interface Queue {
  id: string;
  name: string;
}

interface Job {
  data: any;
}

const JobsForm: React.FC = () => {
  const history = useHistory();
  const { queueId, state } = useParams<JobsFormParams>();
  const [queue, setQueue] = useState<Queue>({} as Queue);
  const [job, setJob] = useState<Job>({} as Job);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  /**
   * Load queue.
   */
  const loadQueue = useCallback(async (): Promise<void> => {
    const { data } = await api.get<Queue>(`/queue/${queueId}`);
    setQueue(data);
  }, [queueId]);

  useEffect(() => {
    setLoading(true);
    try {
      loadQueue();
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [history]);

  /**
   * Handle form submit.
   */
  const handleSubmit = useCallback(async (): Promise<void> => {
    setLoading(true);

    const schema = Yup.object().shape({
      data: Yup.object().required(),
    });

    try {
      await schema.validate(job, {
        abortEarly: false,
      });

      await api.post(`/queue/${queueId}/job`, {
        data: JSON.parse(job.data),
      });
      history.goBack();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors(
          extractValidationErrors(error),
        );
      }
      setLoading(false);
    }
  }, [history, job]);

  return (
    <Default>
      {
        loading
        && <Loader />
      }

      <Breadcrumb
        items={[
          { label: 'Dashboard', path: '/dashboard' },
          { label: queue.name || '', path: `/dashboard/queues/${queue.id}` },
          { label: `${capitalize(state)} Jobs`, path: `/dashboard/queues/${queue.id}/${state}/jobs` },
          { label: 'Form', path: `/dashboard/queues/${queue.id}/${state}/jobs/form` },
        ]}
      />

      <Card>
        <CardHeader>
          <CardTitle>
            Create Job
          </CardTitle>
        </CardHeader>

        <Container fluid>
          <Row>
            <Col xs={12}>
              <FormGroup
                label="Data"
                error={errors.data}
                required
              >
                <Textarea
                  type="text"
                  name="data"
                  autoComplete="off"
                  rows={5}
                  hasError={!!errors.data}
                  onInput={({ currentTarget }) => {
                    setJob({
                      ...job,
                      data: currentTarget.value,
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

export default JobsForm;
