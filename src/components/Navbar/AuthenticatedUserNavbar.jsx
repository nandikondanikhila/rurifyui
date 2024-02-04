import { Link, useNavigate } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
import axios from "axios";
import { useState } from "react";
const AuthUserNavbar = () => {
  const [closeSidebar, setClodeSidebar] = useState(false);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/logout`;
      await axios.get(url, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div style={{ boxShadow: "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px" }}>
      <div className="h-16 flex items-center justify-between w-11/12 m-auto">
        <div className=" h-10 ">
          <p className="text-2xl md:text-3xl font-semibold text-[#2a5738]">
            Rurify
          </p>
        </div>

        <div className="flex gap-5 relative">
          <button
            onClick={handleLogout}
            className="bg-[#2a5738] hover:bg-[#3f684c] text-white px-5 p-1 rounded-full font-semibold"
          >
            Logout
          </button>
          <button
            className="bg-[#2a5738] hover:bg-[#3f684c] text-white px-5 p-1 rounded-full font-semibold"
            onClick={() => setClodeSidebar(!closeSidebar)}
          >
            <FiAlignJustify className="cursor-pointer" />
          </button>
          {closeSidebar && (
            <div
              style={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
              className="h-screen w-60 fixed top-0 right-0 bg-white py-5"
            >
              <div>
                <button
                  className="text-lg font-semibold border-2 mx-5 px-2 py-1"
                  onClick={() => setClodeSidebar(!closeSidebar)}
                >
                  X
                </button>
              </div>
              <ul className="flex flex-col gap-2 text-lg font-medium text-slate-700 my-5">
                <Link to="/issues">
                  <li className="hover:bg-gray-300 px-5 py-1">Issues</li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthUserNavbar;
