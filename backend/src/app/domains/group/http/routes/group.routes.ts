import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import GroupController from '../controllers/GroupController';

const router = Router();
const groupController = new GroupController();

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().allow(null, ''),
    },
  }),
  groupController.create,
);

router.get(
  '/',
  groupController.list,
);

router.get(
  '/:id',
  groupController.show,
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
    },
  }, {
    allowUnknown: true,
  }),
  groupController.update,
);

router.delete(
  '/:id',
  groupController.delete,
);

export default router;
