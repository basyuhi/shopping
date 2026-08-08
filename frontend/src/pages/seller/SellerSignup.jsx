import { useState } from "react"
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from "../../features/auth/authSlice";
import authImage from '../../assets/auth-image.jpg'
const SellerSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    setLoading(true);
    const formdata = new FormData();
    formdata.append('username', username);
    formdata.append("email", email);
    formdata.append('password', password);

    try {
      const response = await api.post("/api/auth/seller/signup", formdata);
      dispatch(login(response.data.user));
      navigate('/create')
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Seller Account</h1>
            <p className="text-gray-500">Start selling your products today</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1.5">Username</label>
              <input
                onChange={(e) => setusername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your username"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1.5">Email</label>
              <input
                onChange={(e) => setemail(e.target.value)}
                type="email"
                value={email}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1.5">Password</label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                value={password}
                placeholder="Create a password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-lg text-gray-500">
            Already have an account?{' '}
            <Link to="/seller/login" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
              Log in
            </Link>
          </p>

          <p className="mt-3 text-center text-lg text-gray-400">
            Want to buy instead?{' '}
            <Link to="/buyer/signup" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
              Sign up as buyer
            </Link>
          </p>
        </div>

        <div className="hidden md:block w-1/2 relative">
          <img
            src={authImage}
            alt="Selling"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  )
}

export default SellerSignup