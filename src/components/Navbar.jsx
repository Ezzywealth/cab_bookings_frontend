/* eslint-disable object-curly-newline */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMediumM, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../redux/slices/menuSlice';
import { signOut } from '../redux/slices/userSlice';

const navLinks = [
  {
    id: 1,
    name: 'Cabs',
    path: '/cabs',
  },
  {
    id: 2,
    name: 'Reserve',
    path: '/reservations/new',
  },
  {
    id: 3,
    name: 'My Reservations',
    path: '/reservations',
  },
  {
    id: 4,
    name: 'Add Cab',
    path: '/cabs/new',
  },
  {
    id: 5,
    name: 'Delete Cab',
    path: '/delete-cab',
  },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(1);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  const date = new Date().getFullYear();

  const handleLinkClick = (id) => {
    setActiveLink(id);
    dispatch(toggleMenu());
  };

  useEffect(() => {
    const link = navLinks.find((item) => location.pathname.includes(item.path));
    setActiveLink(link?.id);
  }, [location.pathname]);

  return (
    <div className="max-h-screen z-10 flex pl-4 flex-col w-full justify-between py-6">
      <section className="flex justify-between gap-12  flex-col">
        <div className="flex justify-between px-4 items-center w-full">
          <h1 className="text-indigo-500 text-3xl  font-extrabold">CarBooky</h1>
          <button
            type="button"
            className="flex p-4 md:hidden "
            onClick={() => dispatch(toggleMenu())}
          >
            <MdOutlineClose className="text-3xl text-lime-800" />
          </button>
        </div>
        <nav>
          <ul className="flex flex-col mt-8 text-lg font-bold text-lime-800">
            {navLinks.map((link) => (
              <Link to={link.path} key={link.id}>
                <li
                  onClick={() => handleLinkClick(link.id)}
                  className={`${
                    activeLink === link.id && 'bg-lime-600 text-white'
                  } px-4 py-2 transition-all duration-300 cursor-pointer ease-linear`}
                  role="presentation"
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex px-4  mt-2 justify-start">
            {user && (
              <button
                onClick={() => dispatch(signOut())}
                type="button"
                className="text-lime-800 font-bold text-lg"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </section>
      <section className="space-y-3 flex flex-col items-center">
        <div className="flex gap-4">
          <FaFacebook className="text-2xl text-[#1877f2] cursor-pointer " />
          <FaTwitter className="text-2xl text-[#1da1f2] cursor-pointer " />
          <FaInstagram className="text-2xl text-[#c32aa3] cursor-pointer " />
          <FaMediumM className="text-2xl text-[#00ab6c] cursor-pointer " />
        </div>
        <div className="flex gap-1 text-sm font-bold">
          <p> &copy;</p>
          <p>{date}</p>
          <p>CarBooky Inc</p>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
