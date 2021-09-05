import { Router } from 'express';

import dashboardRoutes from './domains/dashboard/http/routes/dashboard.routes';
import groupRoutes from './domains/group/http/routes/group.routes';
import queueRoutes from './domains/queue/http/routes/queue.routes';
import userRoutes from './domains/user/http/routes/user.routes';

const router = Router();

router.use('/dashboard', dashboardRoutes);
router.use('/group', groupRoutes);
router.use('/queue', queueRoutes);
router.use('/user', userRoutes);

export default router;
