import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import GroupController from '../controllers/GroupController';
import checkAuth from '../../../user/http/middlewares/checkAuth';

const router = Router();
const groupController = new GroupController();

router.use(checkAuth);

router.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().allow(null, ''),
    },
  }, {
    allowUnknown: true,
  }),
  groupController.create,
);

router.get(
  '/',
  groupController.list,
);

router.get(
  '/dashboard',
  groupController.showDashboard,
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
      description: Joi.string().allow(null, ''),
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
