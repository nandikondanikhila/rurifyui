import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div style={{ boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" }}>
      <div className="h-16 flex items-center justify-between w-11/12 m-auto">
        <div className=" h-10 ">
          <Link to="/">
            <p className="text-2xl md:text-3xl font-semibold text-[#2a5738]">
              Rurify
            </p>
          </Link>
        </div>

        <div className="hidden md:flex gap-5 ">
          <Link to="/user-login">
            <button className="bg-[#2a5738] hover:bg-[#3f684c] text-white px-5 p-1 rounded-full font-semibold">
              User Login
            </button>
          </Link>
          <Link to="/admin-login">
            <button className="bg-[#2a5738] hover:bg-[#3f684c] text-white px-5 p-1 rounded-full font-semibold">
              Admin Login
            </button>
          </Link>
        </div>

        <div className="md:hidden w-9 text-2xl font-bold group relative">
          <FiAlignJustify className="cursor-pointer" />

          <div className="z-50 bg-white hidden group-hover:block absolute w-40 right-0 top-6 border rounded py-3">
            <ul>
              <Link to="/user-login">
                <li className="text-base hover:bg-gray-200 px-3 font-medium text-[#2a5738]">
                  User Login
                </li>
              </Link>
              <Link to="/admin-login">
                <li className="text-base hover:bg-gray-200 px-3 font-medium text-[#2a5738]">
                  Admin Login
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
