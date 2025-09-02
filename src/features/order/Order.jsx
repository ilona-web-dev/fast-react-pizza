// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router';
import { getOrder, updateOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';
import {
   calcMinutesLeft,
   formatCurrency,
   formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';
import UpdateOrder from './updateOrder';

function Order() {
   const order = useLoaderData();

   const fetcher = useFetcher();
   useEffect(
      function () {
         if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      },
      [fetcher]
   );

   // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
   const {
      id,
      status,
      priority,
      priorityPrice,
      orderPrice,
      estimatedDelivery,
      cart,
   } = order;
   const deliveryIn = calcMinutesLeft(estimatedDelivery);

   return (
      <div className="space-y-8 px-4 py-6">
         <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Order #{id} status</h2>

            <div className="space-x-2">
               {priority && (
                  <span className="uppercase semibold text-red-50 tracking-wide bg-red-500 rounded-full text-sm py-1 px-3">
                     Priority
                  </span>
               )}
               <span className="uppercase semibold text-green-50 tracking-wide bg-green-500 rounded-full text-sm py-1 px-3">
                  {status} order
               </span>
            </div>
         </div>

         <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5 rounded-md">
            <p className="font-medium">
               {deliveryIn >= 0
                  ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                  : 'Order should have arrived'}
            </p>
            <p className="text-xs">
               (Estimated delivery: {formatDate(estimatedDelivery)})
            </p>
         </div>

         <ul className="divide-y divide-stone-200 border-b border-t border-stone-200">
            {cart.map((item) => (
               <OrderItem
                  item={item}
                  key={item.id}
                  isLoadingIngredients={fetcher.state === 'loading'}
                  ingredients={
                     fetcher?.data?.find((el) => el.id === item.pizzaId)
                        ?.ingredients ?? []
                  }
               />
            ))}
         </ul>

         <div className="space-y-2 bg-stone-200 px-6 py-5">
            <p className="font-sm font-medium text-stone-600">
               Price pizza: {formatCurrency(orderPrice)}
            </p>
            {priority && (
               <p className="font-sm font-medium text-stone-600">
                  Price priority: {formatCurrency(priorityPrice)}
               </p>
            )}
            <p className="font-bold">
               To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
            </p>
         </div>
         {!priority && <UpdateOrder order={order} />}
      </div>
   );
}

export async function loader({ params }) {
   const order = await getOrder(params.orderId);
   return order;
}

export default Order;
