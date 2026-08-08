import { useEffect, useState } from "react"
import api from "../../services/api"
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";

const MyProducts = () => {
    const [products, setproducts] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await api.get("/api/products/seller/myproducts");
                setproducts(response.data.products);
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        }
        fetchProducts();
    }, []);

    async function handleDelete(id) {
        try {
            await api.delete(`/api/products/${id}`);
            setproducts((prev) => {
                return prev.filter((product) => {
                    return product._id !== id
                })
            })
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg">Loading your products...</span>
                </div>
            </div>
        )
    }

    if (!loading && products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Yet</h2>
                    <p className="text-gray-500 text-lg mb-6">You haven't created any products yet.</p>
                    <a href="/create" className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200">
                        Create Your First Product
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <Link to="/create" className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200">
                        + Add Product
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => {
                        return (
                            <div key={product._id} className="flex flex-col">
                                <ProductCard
                                    id={product._id}
                                    image={product.image}
                                    title={product.title}
                                    price={product.price}
                                    category={product.category}
                                />
                                <button
                                    onClick={() => handleDelete(product._id)}
                                    className="mt-3 w-full py-3 bg-red-100 hover:bg-red-200 text-red-600 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyProducts