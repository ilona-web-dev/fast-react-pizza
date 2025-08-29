import { Link, useNavigate } from 'react-router';

function LinkButton({ children, to }) {
   const navigate = useNavigate();

   const className = 'text-sm text-blue-500 hover:text-blue-600';
   if (to === '-1')
      return (
         <button onClick={() => navigate(-1)} className={className}>
            &larr; <span className="hover:underline">{children}</span>
         </button>
      );

   return (
      <Link to={to} className={className}>
         &larr; <span className="hover:underline">{children}</span>
      </Link>
   );
}

export default LinkButton;
