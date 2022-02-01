import { useState } from 'react';
import { Link } from 'react-router-dom';

import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../../../images/logo.png'

const NavbarItem = ({ title, classProps, link }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )
}

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false)

  return (
    <>
      <nav className='w-full flex md:justify-center justify-between items-center p-4'>
        <div className="md:flex-[0.5] flex-initial justify-center items-center">
          <img src={logo} className='w-32 cursor-pointer' alt="" />
        </div>

        <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          <Link to="/">
            <NavbarItem title={"Home"} />
          </Link>
          <Link to="ico">
            <NavbarItem title={"Ico"} />
          </Link>
          <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>
            Login
          </li>
        </ul>

        <div className="flex-relative">
          {toggleMenu 
            ? <AiOutlineClose fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(false)} /> 
            : <HiMenuAlt4 fontSize={28} className='text-white md:hidden cursor-pointer' onClick={() => setToggleMenu(true)} />
          }
          {toggleMenu && (
            <ul className='z-index-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
              <li className='text-xl w-full my-2'>
                <AiOutlineClose onClick={() => setToggleMenu(false)} />
              </li>
              <Link to="/">
                <NavbarItem title={"Home"} classProps="my-2 text-lg" />
              </Link>
              <Link to="ico">
                <NavbarItem title={"Ico"} classProps="my-2 text-lg" />
              </Link>
            </ul>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar;