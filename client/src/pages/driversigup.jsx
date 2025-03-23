import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [root, setroot] = useState([]);
  console.log("done", root)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:3000/api/auth/asignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/sign");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://firebasestorage.googleapis.com/v0/b/fir-8506f.appspot.com/o/wmremove-transformed.png?alt=media&token=6d934c84-4025-45c6-b8f3-c2bb7498e384")',
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      <div className="bg-opacity-80 bg-black p-8 rounded-xl shadow-xl max-w-lg w-full">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex  gap-8">
            <div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Email</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Username</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Username"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Password</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">
                  Phone Number
                </h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Phone Number"
                  id="tel"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Rate</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Rate"
                  id="rate"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Licences</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Licenses"
                  id="licences"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">Seat</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Seat"
                  id="seat"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">User Role</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="User Role"
                  id="userrole"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">NIC</h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="NIC"
                  id="nic"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-300 ml-1">
                  License Number
                </h3>
                <input
                  className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Number"
                  id="number"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            className="bg-blue-600 text-white p-4 rounded-lg w-full h-12 hover:bg-blue-700 transition-all duration-300 focus:outline-none"
            type="submit"
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : "Sign Up"}
          </button>
        </form>

        <div className="flex gap-2 text-sm mt-5 text-white justify-center">
          <span>Have an account?</span>
          <Link to="/sign" className="text-blue-400 hover:text-blue-500">
            Sign In
          </Link>
        </div>

        {errorMessage && (
          <p className="mt-5 text-red-600 bg-red-200 p-4 rounded-lg text-center">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}
