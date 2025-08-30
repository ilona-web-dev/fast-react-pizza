import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem } from '../cart/cartSlice';

function MenuItem({ pizza }) {
   const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

   const dispatch = useDispatch();

   function handleAddToCart() {
      const newItem = {
         pizzaId: id,
         name,
         quantity: 1,
         unitPrice,
         totalPrice: unitPrice * 1,
      };
      dispatch(addItem(newItem));
   }

   return (
      <li className="flex gap-4 pb-2 pt-2">
         <img
            src={imageUrl}
            alt={name}
            className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
         />
         <div className="flex flex-col flex-grow-1">
            <p className="font-medium  pt-0.5">{name}</p>
            <p className="text-sm italic text-stone-500 capitalize">
               {ingredients.join(', ')}
            </p>
            <div className="mt-auto flex items-center justify-between">
               {!soldOut ? (
                  <p className="text-sm">{formatCurrency(unitPrice)}</p>
               ) : (
                  <p className="text-sm uppercase text-medium text-stone-500">
                     Sold out
                  </p>
               )}

               {!soldOut && (
                  <Button type="small" onClick={handleAddToCart}>
                     Add to cart
                  </Button>
               )}
            </div>
         </div>
      </li>
   );
}

export default MenuItem;
