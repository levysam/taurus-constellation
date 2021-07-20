import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '../controllers/UserController';

const router = Router();
const userController = new UserController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
      groupIds: Joi.array().items(Joi.string().required()).required(),
    },
  }),
  userController.create,
);

router.get(
  '/',
  userController.list,
);

router.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  userController.show,
);

router.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string(),
      role: Joi.string(),
    },
  }),
  userController.update,
);

router.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  userController.delete,
);

export default router;
