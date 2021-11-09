import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '../controllers/UserController';
import checkAuth from '../middlewares/checkAuth';

const router = Router();
const userController = new UserController();

router.use(checkAuth);

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
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      size: Joi.number(),
    },
  }),
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
      password: Joi.string().allow(null, ''),
      role: Joi.string(),
      groupIds: Joi.array().items(Joi.string().required()),
    },
  }, {
    allowUnknown: true,
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
