import CreateUser from '../features/user/CreateUser';

function Home() {
   return (
      <div className="my-10 text-center sm:my-16">
         <h1 className="mb-8 text-xl text-stone-700 font-semibold">
            The best pizza.
            <br />
            Straight out of the oven, straight to you.
         </h1>
         <CreateUser />
      </div>
   );
}

export default Home;
