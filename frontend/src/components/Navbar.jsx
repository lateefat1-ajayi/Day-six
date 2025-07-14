import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">
        <Link to="/">TaskMate</Link>
      </h1>
      <div className="space-x-4">
        {user ? (
          <>
            <span className="text-gray-700">Hi, {user.name}</span>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
