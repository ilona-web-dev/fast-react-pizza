import { Link } from 'react-router';
import { useSelector } from 'react-redux';
formatCurrency;
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
   const totalCartQuantity = useSelector(getTotalCartQuantity);
   const totalCartPrice = useSelector(getTotalCartPrice);

   if (!totalCartQuantity) return null;

   return (
      <div className="flex items-center justify-between bg-stone-800 text-sm text-stone-200 uppercase px-4 py-4 sm:px-6 md:text-base">
         <p className="space-x-4 font-semibold sm:space-x-4">
            <span>{totalCartQuantity} pizzas</span>
            <span>{formatCurrency(totalCartPrice)}</span>
         </p>
         <Link to="/cart">Open cart &rarr;</Link>
      </div>
   );
}

export default CartOverview;
