import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import SigninPage from '../pages/Signin';
import SignupPage from '../pages/Signup';
import HomePage from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/signin',
        element: <SigninPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/home/:id',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
