import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HelpPg from '../helpPg';
import Login from '../login';

const router = createBrowserRouter([
  {
    path: '/help',
    element: <HelpPg />,
  },
]);

const AuthWrapper = () => {
  return <RouterProvider router={router} />;
};

export default AuthWrapper;
