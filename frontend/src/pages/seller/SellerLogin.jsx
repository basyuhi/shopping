import { useState } from "react"
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import authImage from '../../assets/auth-image.jpg';

const SellerLogin = () => {
  const [usernameOrEmail, setusernameOrEmail] = useState("")
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        password: password,
      }
      if (usernameOrEmail.includes('@')) {
        data.email = usernameOrEmail;
      }
      else {
        data.username = usernameOrEmail;
      }
      const response = await api.post('/api/auth/seller/login', data);
      dispatch(login(response.data.user));
      navigate('/create');
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
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Seller Login</h1>
            <p className="text-gray-500">Access your seller dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1.5">Username or Email</label>
              <input
                type="text"
                onChange={(e) => {
                  setusernameOrEmail(e.target.value);
                }}
                value={usernameOrEmail}
                placeholder="Enter username or email"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                value={password}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 text-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="mt-6 text-center text-lg text-gray-500">
            New seller?{' '}
            <a href="/seller/signup" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
              Create an account
            </a>
          </p>

          <p className="mt-3 text-center text-lg text-gray-400">
            Want to buy instead?{' '}
            <a href="/buyer/login" className="text-teal-600 font-medium hover:text-teal-700 transition-colors">
              Log in as buyer
            </a>
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

export default SellerLogin