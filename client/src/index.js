import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './view/Home/Home';
import Authentication from './view/Authentication/Authentication';
const root = ReactDOM.createRoot(document.getElementById('root'));
 const router = createBrowserRouter([
   {
     path: "/",
     element: <Home />,
   },
   {
     path: "login",
     element: <Authentication />,
   },
 ]);
root.render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);

