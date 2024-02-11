import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import AuthUserNavbar from "../Navbar/AuthenticatedUserNavbar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Issues = () => {
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const notify = (msg) => toast(msg);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = await handleUploadImage();
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/issues/new`;
      const body = { img: imgUrl, description, location };
      await axios.post(url, body, { withCredentials: true });
      notify("Issue uploaded successfully");
      getIssues();
      closeModal();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log("Error", e.message);
    }
  };

  const handleUploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "rlc9tkbi");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dekrbgl4u/image/upload",
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const getIssues = async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/issues`;
      const response = await axios.get(url, { withCredentials: true });
      setIssues(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getIssues();
    }
    fetchData();
  }, []);

  return (
    <div>
      <AuthUserNavbar />
      <div className="flex justify-between w-11/12 m-auto  font-semibold my-3 ">
        <p className="text-[#454746] text-2xl">Issues</p>
        <button
          className="bg-[#2a5738] text-white px-5 py-1 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          + New
        </button>
      </div>
      <hr />

      <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {issues &&
          issues.map((el) => (
            <div key={el._id} className="bg-white p-4 shadow-md">
              <img
                src={el?.img}
                alt={el?.description}
                className="w-full h-40 object-cover mb-4"
              />
              <p className="text-slate-700">Location: {el?.location}</p>
              <p className="text-base text-slate-600">{el?.description}</p>
              <p className="text-lg font-medium">
                Issue:{" "}
                {el?.adminApproved ? (
                  <span className="text-green-500 "> Approved</span>
                ) : (
                  <span className="text-slate-600">Not Approved</span>
                )}
              </p>
              {el?.volunteer && (
                <p className="text-base font-medium">
                  Volunteer : {el?.volunteer}
                </p>
              )}
              {el?.rewards && <p className="text-sm">Rewards: {el?.rewards}</p>}
            </div>
          ))}
      </div>

      {isModalOpen && (
        <Modal closeModal={closeModal} closable={true}>
          <form
            className="w-96 flex flex-col gap-2 font-medium text-slate-600"
            onSubmit={handleSubmit}
          >
            <p className="text-lg text-slate-700">Submit New Issue</p>
            <input
              type="file"
              className=""
              accept="image/*"
              required
              onChange={handleChange}
            />
            <p className="">Location</p>
            <textarea
              rows={2}
              className="border border-black rounded focus:outline-none p-2"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <p className="">Description</p>
            <textarea
              rows={5}
              className="border border-black rounded focus:outline-none p-2"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              disabled={loading}
              className="bg-[#2a5738] text-white rounded-md py-2 font-semibold"
            >
              Submit
            </button>
          </form>
        </Modal>
      )}

      <Toaster />
    </div>
  );
};

export default Issues;
