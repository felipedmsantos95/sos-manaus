import express from 'express';
import ClassesController from './controllers/classesController';
import ConnectionsController from './controllers/connectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionController = new ConnectionsController();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index)

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);

export default routes;
