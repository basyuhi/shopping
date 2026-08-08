import { useEffect, useState } from "react";
import api from "../../services/api";

const BuyerOrder = () => {
    const [orders, setorders] = useState([])
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function getBuyerOrders() {
            try {
                const response = await api.get('/api/orders/my-orders');
                setorders(response.data.orders);
            } catch (err) {
                console.log(err);
            } finally {
                setloading(false);
            }
        }
        getBuyerOrders();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-lg">Loading orders...</span>
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
                    <p className="text-gray-500 text-lg mb-6">You haven't placed any orders yet.</p>
                    <a href="/" className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200">
                        Start Shopping
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => {
                        const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        return (
                            <div key={order._id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">Order Date</p>
                                        <p className="text-base font-semibold text-gray-900">{orderDate}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-400 uppercase tracking-wider font-medium">Total</p>
                                        <p className="text-xl font-bold text-teal-600">₹{order.totalAmount}</p>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-100">
                                    {order.items.map((item) => {
                                        return (
                                            <div key={item.product._id || item.product} className="flex items-center gap-4 p-4 md:p-6">
                                                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
                                                    <img
                                                        src={item.product.image}
                                                        alt={item.product.title}
                                                        className="w-full h-full object-contain p-2"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product.title}</h3>
                                                    <p className="text-sm text-gray-400 mt-0.5">{item.product.category}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-sm text-gray-500">Qty: <span className="font-medium text-gray-900">{item.quantity}</span></span>
                                                        <span className="text-sm text-gray-500">Price: <span className="font-medium text-gray-900">₹{item.price}</span></span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default BuyerOrder