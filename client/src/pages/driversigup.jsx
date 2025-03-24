import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [root, setRoot] = useState([]);
  const navigate = useNavigate();
  const [filter, setfilter] = useState([]);
  const [query, setQuery] = useState("");
  const [validation, setValidation] = useState(null);

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
        navigate("/dsign");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRoots = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/get");
        const data = await res.json();
        if (res.ok) {
          setRoot(data.root); // Set the root data received from API
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRoots();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setfilter([...root]);
    } else {
      const filteredData = root.filter(
        (course) =>
          course.root && course.root.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, root]);

  //validation
  const handlePhoneNumberChange = (e) => {
    const tel = e.target.value.trim();
    const phonePattern =
      /^[\+]?[0-9]{1,4}[\s\-]?[0-9]{1,4}[\s\-]?[0-9]{1,4}[\s\-]?[0-9]{1,4}$/; // Pattern for phone numbers

    if (tel === "") {
      setValidation(null);
    } else if (!phonePattern.test(tel)) {
      setValidation(" valid phone number");
    } else {
      setFormData({ ...formData, tel });
      setValidation(null);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        backgroundPosition: "center",
        backgroundSize: "cover"
      }}
    >
      {" "}
      <div></div>
      <div className="flex gap-24">
        <div className="bg-opacity-80  bg-none p-8 rounded-xl  max-w-lg w-full">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* Your form content */}
            <div className="flex gap-8">

             
              <div>
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Email
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Username
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Username"
                    id="name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Password
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                </div>
               
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Licences
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Licenses"
                    id="licences"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-300 ml-1  mt-4">
                    NIC
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="NIC"
                    id="nic"
                    maxLength={10}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
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

             
              <div>

              <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Rate
                  </h3>
                  <select
                    name="rate"
                    id="rate"
                    onChange={handleChange}
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">select</option>
                    <option value="5 Star">5 Star</option>
                    <option value="4 Star">4 Star</option>
                    <option value="3 Star">3 Star</option>
                    <option value="2 Star">2 Star</option>
                    <option value="1 Star">1 Star</option>
                  </select>
                </div>


               
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    Seat
                  </h3>
                  <select
                    name="seat"
                    id="seat"
                    onChange={handleChange}
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">select</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                  </select>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-950 ml-1  mt-4">
                    User Role
                  </h3>
                  <select
                    name="rate"
                    id="rate"
                    onChange={handleChange}
                    className="bg-slate-800 bg-opacity-70 text-white border-white p-4 rounded-lg w-full h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">select</option>
                    <option value="Driver">Driver</option>
                    <option value="User">conductor</option>
                  </select>
                </div>
               

                <div>
                  <h3 className="font-semibold text-blue-950 ml-1 mt-5">
                    Phone Number
                  </h3>
                  <input
                    className="bg-slate-800 bg-opacity-70  text-white border-white p-4 rounded-lg w-full h-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Phone Number"
                    id="tel"
                    maxLength={10}
                    onChange={handlePhoneNumberChange}
                  />
                  <div className="mt-[4px]">
                    {validation && (
                      <p className=" text-red-700 bg-white opacity-60    text-sm    rounded-lg text-center ">
                        {validation}
                      </p>
                    )}
                  </div>
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
            <Link to="/dsign" className="text-blue-400 hover:text-blue-500">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-200 p-4 rounded-lg text-center">
              {errorMessage}
            </p>
          )}

          {/* Display the root data horizontally */}
        </div>
      </div>
      <div className="ml-16">


        <div className="text-white font-serif text-xl">
         Registration Available Root
        </div>
        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search..."
            className="w-[400px] h-10 mt-4 rounded-full bg-black shadow-xl border border-white bg-opacity-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto lg:h-[500px] scrollbar-none">
          <div className="mt-6 w-[400px] h flex flex-wrap gap-4 justify-center">
            {filter && filter.length > 0 ? (
              filter.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-800 bg-opacity-90 text-white p-4 rounded-lg w-48"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                  }}
                >
                  <h4 className="font-semibold">{item.root}</h4>
                  <p className="text-xs">{`Created At: ${new Date(
                    item.createdAt
                  ).toLocaleString()}`}</p>
                  <p className="text-xs">{`Updated At: ${new Date(
                    item.updatedAt
                  ).toLocaleString()}`}</p>
                </div>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-gray-500 py-4">
                  No records found
                </td>
              </tr>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
