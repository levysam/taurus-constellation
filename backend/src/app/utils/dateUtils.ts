import moment from 'moment';
import Queue from '../domains/queue/entities/Queue';
import { Job } from '../providers/QueueProvider/types';

export const timestampToDate = (timestamp?: number): string | undefined => (
  !timestamp ? undefined : moment(timestamp).format('YYYY-MM-DD HH:m:s')
);

export const compliance = (job: Job | undefined, queue: Queue): Job | undefined => {
  if (
    job && 
    queue.compliance &&
    job.data
  ) {
    const compliance = queue.compliance.split(',');
    compliance.forEach((element) => {
      if (job.data[element]) {
        job.data[element] = '{{hidden}}';
      }
    });
  }
  return job;
}

export default {
  timestampToDate,
  compliance,
};
