import Header from './Header';
import { Outlet, useNavigation } from 'react-router';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
   const navigation = useNavigation();
   const isLoading = navigation.state === 'loading';

   return (
      <div className="grid h-screen grid-rows-[auto_1fr_auto] font-pizza text-stone-800">
         {isLoading && <Loader />}
         <Header />
         <div className="overflow-scroll">
            <main className=" max-w-3xl mx-auto">
               <Outlet />
            </main>
         </div>
         <CartOverview />
      </div>
   );
}

export default AppLayout;
