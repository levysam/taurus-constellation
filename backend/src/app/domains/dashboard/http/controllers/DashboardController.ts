import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ShowDashboardService from '../../services/ShowDashboardService';

class DashboardController {
  public async show(_: Request, response: Response): Promise<Response> {
    const showDashboard = container.resolve(ShowDashboardService);
    const dashboard = await showDashboard.execute();
    return response.json(dashboard);
  }
}

export default DashboardController;
