import each from 'lodash.foreach';
import filter from 'lodash.filter';
import chalk from 'chalk';

const removeVerbs = verbs => filter(verbs, v => v !== 'HEAD');

const printRoute = (route) => {
  console.log(`${route.opts.name || 'unknown'} (${chalk.gray(removeVerbs(route.methods))}) - ${route.path}`);
};

export default (router) => {
  console.log(`${chalk.cyan('Registering the following routes:')}`);
  each(router.stack, (item) => {
    printRoute(item);
  });
};
