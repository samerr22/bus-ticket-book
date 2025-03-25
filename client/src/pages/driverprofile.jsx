import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import "react-circular-progressbar/dist/styles.css";
import {
  updateFailure,
  updateSart,
  updateSuccess
} from "../redux/user/userSilce.js";
import { useDispatch } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  console.log(currentUser);
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }

    try {
      dispatch(updateSart());
      const res = await fetch(`/api/auth/dupdate/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
        alert("succesfull");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        setDeleting(true);
        const res = await fetch(`/api/auth/ddelete/${currentUser._id}`, {
          method: "DELETE"
        });
        const data = await res.json();

        if (res.ok) {
          alert("Your account has been deleted.");
          // Redirect to home or login page
          window.location.href = "/"; // Example redirect to homepage
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert("Error deleting the account. Please try again.");
      } finally {
        setDeleting(false);
      }
    }
  };

  useEffect(() => {
    const Roots = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/auth/get`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setroot(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    Roots();
  }, []);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
  {/* Background Image */}
  <div
    className="relative min-h-screen bg-cover bg-center"
    style={{
      backgroundImage:
        "url('https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/traffic-vehicle-urban-reflections-city.jpg?alt=media&token=f6462f17-8cbf-4415-9c15-733f702bc511')"
    }}
  >
    <div className="flex justify-center items-center min-h-screen relative z-10">
      <div className="bg-opacity-80 bg-none p-8 rounded-xl shadow-lg max-w-3xl w-full mx-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-950">User Profile</h2>
        </div>

        <Link
          to={`/dash`}
          className="text-md text-gray-400 mb-6 hover:text-blue-400 underline flex items-center"
        >
          <FaArrowLeft className="mr-2" /> {/* Left arrow icon */}
        </Link>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username & Email Fields */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <label htmlFor="username" className="block text-sm font-medium text-gray-950">
                Name
              </label>
              <input
                type="text"
                id="username"
                defaultValue={currentUser.name}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-950">
                Email
              </label>
              <input
                type="email"
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Password & Telephone Fields */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-950">
                Password
              </label>
              <input
                type="password"
                id="password"
                defaultValue={currentUser.password}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="tel" className="block text-sm font-medium text-gray-950">
                Telephone
              </label>
              <input
                type="text"
                id="tel"
                maxLength={10}
                defaultValue={currentUser.tel}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Rate & Licences Fields */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-950 ml-1 mt-4">Rate</h3>
              <select
                name="rate"
                id="rate"
                defaultValue={currentUser.rate}
                onChange={handleChange}
                className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="5 Star">5 Star</option>
                <option value="4 Star">4 Star</option>
                <option value="3 Star">3 Star</option>
                <option value="2 Star">2 Star</option>
                <option value="1 Star">1 Star</option>
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="licences" className="block text-sm font-medium text-gray-950">
                Licences
              </label>
              <input
                type="text"
                id="licences"
                defaultValue={currentUser.licences}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Seat & User Role Fields */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-950 ml-1 mt-4">Seat</h3>
              <select
                name="seat"
                id="seat"
                defaultValue={currentUser.seat}
                onChange={handleChange}
                className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-950 ml-1 mt-4">User Role</h3>
              <select
                name="userrole"
                id="userrole"
                defaultValue={currentUser.userrole}
                onChange={handleChange}
                className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select</option>
                <option value="Driver">Driver</option>
                <option value="Conductor">Conductor</option>
              </select>
            </div>
          </div>

          {/* NIC Field */}
          <div className="flex gap-6 flex-wrap">
            <div className="flex-1">
              <label htmlFor="nic" className="block text-sm font-medium text-gray-950">
                NIC
              </label>
              <input
                type="text"
                id="nic"
                defaultValue={currentUser.nic}
                onChange={handleChange}
                className="mt-2 p-4 w-full rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none"
            >
              {updateUserSuccess ? (
                <span>{updateUserSuccess}</span>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
        </form>

        {/* Error/Success Messages */}
        {updateUserError && (
          <p className="mt-4 text-red-600 bg-red-300 p-4 rounded-lg text-center">
            {updateUserError}
          </p>
        )}

        {error && (
          <p className="mt-4 text-red-600 bg-red-300 p-4 rounded-lg text-center">
            {error}
          </p>
        )}

        {/* Delete Account Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
