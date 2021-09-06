import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateGroupService from '../../services/CreateGroupService';
import DeleteGroupService from '../../services/DeleteGroupService';
import ListGroupService from '../../services/ListGroupService';
import ShowGroupDashboardService from '../../services/ShowGroupDashboardService';
import ShowGroupService from '../../services/ShowGroupService';
import UpdateGroupService from '../../services/UpdateGroupService';

class GroupController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      description,
    } = request.body;
    const createGroup = container.resolve(CreateGroupService);
    const group = await createGroup.execute({
      name,
      description,
    });
    return response.json(classToClass(group));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const deleteGroup = container.resolve(DeleteGroupService);
    const result = await deleteGroup.execute(String(id));
    return response.json(result);
  }

  public async list(_: Request, response: Response): Promise<Response> {
    const listGroup = container.resolve(ListGroupService);
    const groups = await listGroup.execute();
    return response.json(groups);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const showGroup = container.resolve(ShowGroupService);
    const group = await showGroup.execute(String(id));
    return response.json(classToClass(group));
  }

  public async showDashboard(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const showGroupDashboard = container.resolve(ShowGroupDashboardService);
    const groupDashboard = await showGroupDashboard.execute(String(id));
    return response.json(groupDashboard);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      id,
    } = request.params;
    const {
      name,
      description,
    } = request.body;
    const updateGroup = container.resolve(UpdateGroupService);
    const group = await updateGroup.execute({
      id: String(id),
      name,
      description,
    });
    return response.json(classToClass(group));
  }
}

export default GroupController;
