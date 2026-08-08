import { useDispatch, useSelector } from "react-redux"
import { logout } from "../features/auth/authSlice"
import api from "../services/api"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    async function handleLogout() {
        try {
            await api.post('/api/auth/logout');
            dispatch(logout())
            navigate('/buyer/login');
        } catch (err) {
            console.log(err);
        }
    }
    if (!user) {
        return (
            <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center justify-between h-20">
                        <Link
                            to="/"
                            className="text-2xl font-bold text-teal-600"
                        >
                            Shop
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/buyer/login"
                                className="px-4 py-2 text-gray-600 hover:text-teal-600"
                            >
                                Login
                            </Link>
                            <Link
                                to="/buyer/signup"
                                className="px-4 py-2 bg-teal-600 text-white rounded-xl"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
    if (user.role === "buyer") {
        return (
            <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors tracking-tight">
                            Shop
                        </Link>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                to="/"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/cart"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                Cart
                            </Link>
                            <Link
                                to="/buyer-orders"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                My Orders
                            </Link>

                            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-gray-200">
                                <span className="hidden md:block text-base text-gray-500 font-medium">
                                    {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-base font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
    else {
        return (
            <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 md:px-10">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="text-3xl font-bold text-teal-600 hover:text-teal-700 transition-colors tracking-tight">
                            SellerHub
                        </Link>

                        <div className="flex items-center gap-2 md:gap-4">
                            <Link
                                to="/create"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                Create Product
                            </Link>
                            <Link
                                to="/my-product"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                My Products
                            </Link>
                            <Link
                                to="/seller-orders"
                                className="px-4 py-2.5 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-200 text-base md:text-lg font-medium"
                            >
                                Orders
                            </Link>

                            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-gray-200">
                                <span className="hidden md:block text-base text-gray-500 font-medium">
                                    {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2.5 text-base font-medium text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar