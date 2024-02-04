import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
export default function AdminPrivateRoute({ child }) {
  const [auth, setAuth] = useState(true);

  const validateSession = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/admin/valid`;
      await axios.get(url, { withCredentials: true });
    } catch (e) {
      setAuth(false);
      console.log("INVALID SESSION", e.message);
    }
  };

  useEffect(() => {
    validateSession();
  }, []);

  if (auth) {
    return child;
  }

  return <Navigate to="/" />;
}
