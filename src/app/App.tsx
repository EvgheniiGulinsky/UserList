import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import UserList from '../pages/users/components/UserList/UserList';
import UserForm from '../pages/users/components/UserForm';

const router = createBrowserRouter([
  {
    path: "*",
    element: <UserList />,
  },
  {
    path: "users/:userId/edit",
    element: <UserForm />,
    errorElement: <div>User not found!</div>
  },
  {
    path: "createuser",
    element: <UserForm />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
