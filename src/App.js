import './App.css';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Cookies from 'js-cookie';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import { fetchCabs } from './redux/slices/cabSlice';
import { toggleMenu } from './redux/slices/menuSlice';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const isMenuOpen = useSelector((state) => state.menu.isMenuOpen);

  useEffect(() => {
    dispatch(fetchCabs());
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      navigate('/welcome');
    } else {
      navigate('/cabs');
    }
  }, [navigate, user]);

  return (
    <div className="grid relative grid-cols-1 md:grid-cols-7 lg:grid-cols-11 overflow-auto divide-x-2 divide-gray-200">
      <section className="hidden w-full md:flex md:col-span-2 max-h-screen lg:col-span-2">
        <ToastContainer position="top-center" />
        <Navbar />
      </section>
      {isMenuOpen && (
        <section className="animate-slide-in w-full flex md:hidden md:col-span-2 z-10 h-screen lg:col-span-2">
          <Navbar />
        </section>
      )}
      <section className="relative md:col-span-5 py-20 md:py-10 lg:py-0 pt-0 overflow-auto bg-lime-50 lg:col-span-9">
        {!isMenuOpen && (
          <button
            type="button"
            className="flex md:hidden w-auto absolute z-0 left-0 top-0 p-4"
            onClick={() => dispatch(toggleMenu())}
          >
            <AiOutlineMenuUnfold
              className={`text-4xl  ${
                location.pathname === '/reservations/new'
                  ? 'text-lime-50'
                  : 'text-lime-800'
              }`}
            />
          </button>
        )}
        <Outlet />
      </section>
    </div>
  );
}

export default App;
