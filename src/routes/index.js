import { indexRoute, redirect } from 'react-router';
import App from '../containers/App/index.jsx';
import Table from '../containers/Table/index.jsx';
import Stats from '../containers/Stats/index.jsx';

const routes = {
  path: '/',
  component: App,
  indexRoute: { component: Table },
  childRoutes: [
    { path: 'timers/:filter', component: Table },
    { path: 'stats', components: Stats }
  ]
};

export default routes;