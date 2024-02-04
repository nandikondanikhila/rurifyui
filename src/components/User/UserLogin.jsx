import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const handleUserData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/signin`;
      await axios.post(url, userData, { withCredentials: true });
      notify("User Logged successfully");
      setLoading(false);
      navigate("/issues");
    } catch (e) {
      notify(e?.response?.data?.message);
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-11/12 m-auto md:h-[80vh] flex items-center">
        <div className="flex flex-col-reverse items-center gap-10 md:grid md:grid-cols-2">
          <div>
            <img
              src="https://www.villagesquare.in/wp-content/uploads/2022/09/Comp-01.jpg"
              alt="Login Image"
            />
          </div>
          <div className="w-8/12 m-auto">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <p className="text-2xl text-[#646464] font-semibold my-2">
                User Login
              </p>

              <div>
                <label className="font-semibold py-2 text-gray-700">
                  Email
                </label>
                <br />
                <input
                  className="px-2 focus:outline-none border h-10 rounded w-full"
                  type="email"
                  placeholder="Email"
                  onChange={handleUserData}
                  required
                  name="email"
                />
              </div>
              <div>
                <label className="font-semibold py-2 text-gray-700">
                  Password
                </label>
                <br />
                <input
                  className="px-2 focus:outline-none border h-10 rounded w-full"
                  type="password"
                  placeholder="Password"
                  onChange={handleUserData}
                  required
                  name="password"
                />
              </div>

              <p className="text-xs text-slate-700">
                {" If you haven't registered. please click"}
                <Link to="/user-registration">
                  <span className="text-sky-600 cursor-pointer"> link</span>
                </Link>{" "}
                to Register.
              </p>
              <div>
                <button
                  disabled={loading}
                  className={`w-full h-10 ${
                    loading ? "bg-[#76b086]" : "bg-[#2a5738]"
                  } my-2 text-white rounded-md`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default UserLogin;
