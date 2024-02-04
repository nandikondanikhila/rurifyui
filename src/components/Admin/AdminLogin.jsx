import { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context";

const AdminLogin = () => {
  const setState= useContext(Context)[1];
  const [adminData, setAdminData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const handleAdminData = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/admin/signin`;
      await axios.post(url, adminData,{withCredentials:true});
      notify("User Logged successfully");
      setLoading(false);
      setState({ role: "admin" });
      navigate("/dashboard");
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
                Admin Login
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
                  onChange={handleAdminData}
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
                  onChange={handleAdminData}
                  required
                  name="password"
                />
              </div>

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

export default AdminLogin;
