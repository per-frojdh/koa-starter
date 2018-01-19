import usersController from './usersController.mjs';
import listRoutes from '../../util/debug/list-routes.mjs';

listRoutes(usersController.router);

export default usersController;
