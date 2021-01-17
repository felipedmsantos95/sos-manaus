import express from 'express';
import DonationsController from './controllers/donationsController';
import ConnectionsController from './controllers/connectionsController';

const routes = express.Router();
const donationsControllers = new DonationsController();
const connectionController = new ConnectionsController();

routes.post('/users', donationsControllers.create);
routes.get('/users', donationsControllers.index)

routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);

export default routes;
