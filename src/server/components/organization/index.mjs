import organizationController from './organizationController.mjs';
import listRoutes from '../../util/debug/list-routes.mjs';

listRoutes(organizationController.router);

export default organizationController;
