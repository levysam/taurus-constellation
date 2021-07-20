import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import QueueController from '../controllers/QueueController';

const router = Router();
const queueController = new QueueController();

router.post(
  '/:id/job/:jobId/clone',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
      jobId: Joi.string().required(),
    },
  }),
  queueController.cloneJob,
);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
      host: Joi.string().required(),
      port: Joi.number().required(),
      groupId: Joi.string().required(),
    },
  }),
  queueController.create,
);

router.post(
  '/:id/job',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      data: Joi.object().required(),
    },
  }),
  queueController.createJob,
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  queueController.delete,
);

router.delete(
  '/:id/job',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      jobIds: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  queueController.deleteJob,
);

router.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      groupId: Joi.string().required(),
    },
  }),
  queueController.list,
);

router.get(
  '/:id/job',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.QUERY]: {
      state: Joi.string().required(),
      page: Joi.number().required(),
      size: Joi.number().required(),
    },
  }),
  queueController.listJobs,
);

router.put(
  '/:id/pause',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  queueController.pause,
);

router.put(
  '/:id/resume',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  queueController.resume,
);

router.post(
  '/:id/job/retry',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      jobIds: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  queueController.retryJobs,
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  queueController.show,
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      description: Joi.string(),
      host: Joi.string(),
      port: Joi.number(),
      groupId: Joi.string(),
    },
  }),
  queueController.update,
);

export default router;
