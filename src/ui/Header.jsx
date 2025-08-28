import { Link } from 'react-router';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/user/UserName';

function Header() {
   return (
      <header className="px-4 py-3 bg-yellow-500 uppercase border-b border-stone-500 sm:px-6">
         <Link to="/" className="tracking-widest">
            Fast React Pizza Co.
         </Link>
         <SearchOrder />
         <UserName />
      </header>
   );
}

export default Header;
