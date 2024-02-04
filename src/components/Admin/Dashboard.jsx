import { useEffect, useState } from "react";
import axios from "axios";
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const getData = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user`;
      const usersData = await axios.get(url);
      setUserData(usersData.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleApprove = async (id) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/admin/approve/${id}`;
      await axios.get(url);
      await getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/user/${id}`;
      await axios.delete(url);
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);
  return (
    <div>
      <AuthNavbar />

      <div>
        <table className="w-full my-10">
          <thead>
            <tr>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Name
              </th>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Email
              </th>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Phone
              </th>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Village
              </th>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Status
              </th>
              <th className="px-2 py-3 text-left border-b border-gray-200 bg-gray-100 whitespace-nowrap">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.map((el) => (
                <tr key={el._id} className="hover:bg-gray-50 transition-all">
                  <td className="px-2 py-4 border-b border-gray-200">
                    {el?.name}
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    {el?.email}
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    {el?.phone}
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    {el?.village}
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    {el?.adminApproved ? (
                      <span>Active</span>
                    ) : (
                      <span
                        className="text-green-600 cursor-pointer"
                        onClick={() => handleApprove(el._id)}
                      >
                        Approve
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-4 border-b border-gray-200">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleDelete(el._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
