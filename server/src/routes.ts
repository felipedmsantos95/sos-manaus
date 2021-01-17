import express from 'express';
import UsersController from './controllers/usersController';
import DonationsController from './controllers/donationsController';
import ConnectionsController from './controllers/connectionsController';

const routes = express.Router();
const usersController = new UsersController();
const donationsControllers = new DonationsController();
const connectionController = new ConnectionsController();

routes.post('/users', usersController.create);
routes.get('/users', usersController.index);
routes.post('/signin', usersController.signin);

routes.post('/donations', donationsControllers.create);
routes.get('/donations', donationsControllers.index);
routes.get('/alldonations', donationsControllers.indexAll);
routes.delete('/donations/:id', donationsControllers.delete);
routes.put('/donations/:id', donationsControllers.edit);


routes.post('/connections', connectionController.create);
routes.get('/connections', connectionController.index);

export default routes;
