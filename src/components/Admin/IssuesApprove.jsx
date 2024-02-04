import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AuthNavbar from "../Navbar/AuthenticatedNavbar";
import Modal from "../Modal/Modal";
const ApproveIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [volunteer, setVolunteer] = useState("John");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [approveIssueId, setApproveIssueId] = useState("");
  const notify = (msg) => toast(msg);

  const handleApproveIssue = async (e) => {
    e.preventDefault();
    try {
      const url = `${
        import.meta.env.VITE_SERVER_URL
      }/admin/approve-issue/${approveIssueId}`;
      await axios.patch(url, { volunteer });
      closeModal()
      getIssues();
      notify("Issue approved successfully");
    } catch (e) {
      console.log(e.message);
      notify(e?.response?.data?.message);
    }
  };

  const getIssues = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_SERVER_URL}/admin/issues`;
      const response = await axios.get(url);
      setIssues(response.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const closeModal = (id = "") => {
    setApproveIssueId(id);
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    async function fetchData() {
      await getIssues();
    }
    fetchData();
  }, []);

  if (loading) {
    return <Fragment>Loading...</Fragment>;
  }

  return (
    <div>
      <AuthNavbar />

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
              <p className="text-slate-800 font-medium">Issue Uploaded By : {el?.user?.name}</p>
              <p className="text-lg font-medium">
                Issue:{" "}
                {el?.adminApproved ? (
                  <span className="text-green-500 "> Approved</span>
                ) : (
                  <button
                    className="text-white rounded-full px-5 py-1 bg-[#2a5738] text-sm"
                    onClick={() => closeModal(el._id)}
                  >
                    Approve
                  </button>
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
            onSubmit={handleApproveIssue}
          >
            <p className="text-lg text-slate-700">Approve Issue</p>
            <select
              className="h-10 px-5 border-2 focus:outline-none rounded"
              value={volunteer}
              onChange={(e) => setVolunteer(e.target.value)}
            >
              <option value="John">John</option>
              <option value="Emily">Emily</option>
              <option value="Michael">Michael</option>
              <option value="Sophia">Sophia</option>
              <option value="Daniel">Daniel</option>
              <option value="Olivia">Olivia</option>
              <option value="William">William</option>
              <option value="Ava">Ava</option>
              <option value="Ethan">Ethan</option>
              <option value="Isabella">Isabella</option>
            </select>

            <button
              disabled={loading}
              className="bg-[#2a5738] text-white rounded-md py-2 font-semibold"
            >
              Approve
            </button>
          </form>
        </Modal>
      )}

      <Toaster />
    </div>
  );
};

export default ApproveIssues;
