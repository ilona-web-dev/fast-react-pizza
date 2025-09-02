import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
   );

// const fakeCart = [
//    {
//       pizzaId: 12,
//       name: 'Mediterranean',
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//    },
//    {
//       pizzaId: 6,
//       name: 'Vegetale',
//       quantity: 1,
//       unitPrice: 13,
//       totalPrice: 13,
//    },
//    {
//       pizzaId: 11,
//       name: 'Spinach and Mushroom',
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//    },
// ];

function CreateOrder() {
   const username = useSelector((state) => state.user.username);
   const [withPriority, setWithPriority] = useState(false);
   const navigation = useNavigation();
   const isSubmitting = navigation.state === 'submitting';

   const formErrors = useActionData();
   const cart = useSelector(getCart);
   const totalCartPrice = useSelector(getTotalCartPrice);
   const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
   const totalPrice = totalCartPrice + priorityPrice;

   const dispatch = useDispatch();

   if (!cart.length) return <EmptyCart />;

   return (
      <div className="px-4 py-6">
         <h2 className="mb-8 text-xl font-semibold">
            Ready to order? Let's go!
         </h2>
         <button onClick={() => dispatch(fetchAddress())}>Get position</button>

         <Form method="POST">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">
                  First Name:<sup>*</sup>
               </label>
               <input
                  defaultValue={username}
                  type="text"
                  name="customer"
                  required
                  className="input grow"
               />
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">
                  Phone number:<sup>*</sup>
               </label>
               <div className="grow">
                  <input
                     type="tel"
                     name="phone"
                     required
                     className="input w-full"
                  />
                  {formErrors?.phone && (
                     <p className="text-xs mt-2 text-red-700 bg-red-100 rounded-md p-2">
                        {formErrors.phone}
                     </p>
                  )}
               </div>
            </div>

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
               <label className="sm:basis-40">
                  Address:<sup>*</sup>
               </label>
               <div className="grow">
                  <input
                     type="text"
                     name="address"
                     required
                     className="input w-full"
                  />
               </div>
            </div>

            <div className="mb-12 flex items-center gap-4">
               <input
                  type="checkbox"
                  name="priority"
                  id="priority"
                  value={withPriority}
                  onChange={(e) => setWithPriority(e.target.checked)}
                  className="h-4 w-4 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
               />
               <label htmlFor="priority" className="font-medium">
                  Want to give your order priority?
               </label>
            </div>

            <div>
               <input type="hidden" name="cart" value={JSON.stringify(cart)} />
               <Button disabled={isSubmitting} type="primary">
                  {isSubmitting
                     ? 'Placing order...'
                     : `Order now for ${formatCurrency(totalPrice)}`}
               </Button>
            </div>
         </Form>
      </div>
   );
}

export async function action({ request }) {
   const formData = await request.formData();
   const data = Object.fromEntries(formData);

   const order = {
      ...data,
      cart: JSON.parse(data.cart),
      priority: data.priority === 'true',
   };

   const errors = {};

   if (!isValidPhone(order.phone))
      errors.phone =
         'Please give us your correct phone number. We might need it to contact you';
   if (Object.keys(errors).length > 0) return errors;

   const newOrder = await createOrder(order);

   store.dispatch(clearCart());

   return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
