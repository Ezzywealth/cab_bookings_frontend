/* eslint-disable object-curly-newline */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMediumM, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(1);
  const navLinks = [
    {
      id: 1,
      name: 'Cabs',
      path: '/cabs',
    },
    {
      id: 2,
      name: 'Reserve',
      path: '/reservation-new',
    },
    {
      id: 3,
      name: 'My Reservations',
      path: '/reservations',
    },
    {
      id: 4,
      name: 'Add Cab',
      path: '/cabs-new',
    },
    {
      id: 5,
      name: 'Delete Cab',
      path: '/delete-cab',
    },
  ];
  const date = new Date().getFullYear();

  const handleLinkClick = (id) => {
    setActiveLink(id);
  };

  return (
    <div className="h-screen flex flex-col justify-between py-6">
      <section className="flex justify-between gap-24 pl-6 flex-col">
        <h1 className="text-indigo-500 text-3xl  font-extrabold">CarBooky</h1>
        <nav>
          <ul className="flex flex-col  text-lg font-bold text-[#6d6b6b]">
            {navLinks.map((link) => (
              <li
                onClick={() => handleLinkClick(link.id)}
                key={link.id}
                className={`${
                  activeLink === link.id && 'bg-lime-600 text-white'
                } px-4 py-2 transition-all duration-300 cursor-pointer ease-linear`}
                role="presentation"
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
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