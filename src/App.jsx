import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './ui/AppLayout';
import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Cart from './features/cart/Cart';
import Order from './features/order/Order';
import CreateOrder from './features/order/CreateOrder';
import Error from './ui/Error';

const router = createBrowserRouter([
   {
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
         {
            path: '/',
            element: <Home />,
         },
         {
            path: '/menu',
            element: <Menu />,
            loader: menuLoader,
            errorElement: <Error />,
         },
         {
            path: '/order/new',
            element: <CreateOrder />,
         },
         {
            path: '/order/:orderId',
            element: <Order />,
         },
         {
            path: '/cart',
            element: <Cart />,
         },
      ],
   },
]);

function App() {
   return <RouterProvider router={router}></RouterProvider>;
}

export default App;
