import { useLoaderData } from 'react-router';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
   const menu = useLoaderData();
   return (
      <div className="my-5 px-2">
         <h1 className="text-2xl mb-3">Menu</h1>
         <ul className="divide-y divide-stone-200">
            {menu.map((pizza) => (
               <MenuItem pizza={pizza} key={pizza.id} />
            ))}
         </ul>
      </div>
   );
}

export async function loader() {
   const menu = await getMenu();
   return menu;
}

export default Menu;
