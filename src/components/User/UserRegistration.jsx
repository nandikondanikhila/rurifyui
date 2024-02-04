import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const UserRegistration = () => {
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
      const url = `${import.meta.env.VITE_SERVER_URL}/user/signup`;
      await axios.post(url, userData);
      notify("User created successfully");
      setLoading(false);
      navigate("/user-login");
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
                User Registration
              </p>
              <div>
                <label className="font-semibold py-2 text-gray-700">Name</label>
                <br />
                <input
                  className="px-2 focus:outline-none border h-10 rounded w-full"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleUserData}
                  required
                />
              </div>
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
                  Phone No
                </label>
                <br />
                <input
                  className="px-2 focus:outline-none border h-10 rounded w-full"
                  type="text"
                  placeholder="Phone"
                  onChange={handleUserData}
                  required
                  name="phone"
                />
              </div>

              <div>
                <label className="font-semibold py-2 text-gray-700">
                  Village
                </label>
                <br />
                <input
                  className="px-2 focus:outline-none border h-10 rounded w-full"
                  type="text"
                  placeholder="Village"
                  onChange={handleUserData}
                  required
                  name="village"
                />
              </div>
              <p className="text-xs text-slate-700">
                If your already registed please click{" "}
                <Link to="/user-login">
                  <span className="text-sky-600 cursor-pointer"> link</span>
                </Link>{" "}
                to Login.
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

export default UserRegistration;
