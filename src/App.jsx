import "./App.css";

import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Login from "./Components/Register/Login";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes.jsx";
import { UserProfileProvider } from "./Context/UserProfile/User.jsx";
function App() {
  let routes = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home", element:  <ProtectedRoutes><Home />  </ProtectedRoutes>  },
        { index: true, element:  <ProtectedRoutes><Home />  </ProtectedRoutes>  },
        { path: "Register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <h1>NotFound</h1> },

      ],
    },
  ]);
  return (
    <>
    <UserProfileProvider>
      <RouterProvider router={routes}></RouterProvider>
      </UserProfileProvider>
    </>
  );
}
export default App;
