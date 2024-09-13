import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GiHiking } from "react-icons/gi";

const Navbar = () => {

    return (
      <div className="sticky top-0 z-50 border-b-2 bg-white">
        <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><NavLink to='/'>Home </NavLink></li>
            <li><NavLink to='products'>Products </NavLink></li>
            <li><NavLink to='product-management'>Products Management</NavLink></li>
            <li><NavLink to='about'>About </NavLink></li>
            <li><NavLink to='cart'>Cart </NavLink></li>
            </ul>
          </div>
          {/* btn btn-ghost */}
          <Link to={'/'} style={{fontFamily:'cursive', letterSpacing:'2px'}}  className=" text-xl flex items-center gap-2 text-[#00ad00] font-bold" ><GiHiking className="text-3xl" />
          <span>HikinG</span></Link>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><NavLink to='/'>Home </NavLink></li>
            <li><NavLink to='products'>Products </NavLink></li>
            <li><NavLink to='product-management'>Products Management</NavLink></li>
            <li><NavLink to='about'>About </NavLink></li>
            <li><NavLink to='cart'>Cart </NavLink></li>
          </ul>
        </div>
        </div>
      </div>
    );
};

export default Navbar;