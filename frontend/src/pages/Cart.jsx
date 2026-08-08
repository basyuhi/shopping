import { useEffect, useState } from "react"
import api from "../services/api"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setCart } from "../features/cart/cartslice"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart?.items || []);
  const [updating, setUpdating] = useState(false);

  const total = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity
  }, 0)

  useEffect(() => {
    async function getItems() {
      try {
        const response = await api.get('/api/cart/');
        dispatch(setCart(response.data.cart));
      } catch (err) {
        console.log(err);
      }
    }
    getItems();
  }, [dispatch])

  async function updateCart(productId, quantity) {
    setUpdating(true);
    try {
      const data = { quantity: quantity }
      const response = await api.patch(`/api/cart/update/${productId}`, data);
      dispatch(setCart(response.data.cart))
    } catch (err) {
      console.log(err);
    } finally {
      setUpdating(false);
    }
  }

  async function handleRemove(productId) {
    setUpdating(true);
    try {
      const response = await api.delete(`/api/cart/remove/${productId}`);
      dispatch(setCart(response.data.cart))
    } catch (err) {
      console.log(err);
    } finally {
      setUpdating(false);
    }
  }

  async function handleOrder() {
    try {
      await api.post('/api/orders/place');
      dispatch(setCart({ items: [] }));
      navigate("/buyer-orders");
    } catch (err) {
      console.log(err);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-lg mb-6">Looks like you haven't added anything yet.</p>
          <a href="/" className="inline-block px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200">
            Continue Shopping
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-6 pb-4 border-b border-gray-200 text-sm font-medium text-gray-400 uppercase tracking-wider">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Qty</div>
              <div className="col-span-2 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            <div className="mt-6 space-y-0">
              {cartItems.map((item) => {
                const itemTotal = item.product.price * item.quantity;

                return (
                  <div key={item._id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-6 border-b border-gray-100">
                    <div className="col-span-5 flex items-center gap-6">
                      <div className="w-28 h-28 bg-gray-100 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.product.title}</h3>
                        <p className="text-base text-gray-400 mt-1">{item.product.category}</p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="md:hidden text-gray-400 text-base mr-2">Price:</span>
                      <span className="text-lg font-medium text-gray-900">${item.product.price}</span>
                    </div>

                    <div className="col-span-2 flex items-center justify-center">
                      <div className={`flex items-center bg-gray-100 rounded-xl overflow-hidden ${updating ? 'opacity-50' : ''}`}>
                        <button
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateCart(item.product._id, item.quantity - 1)
                            }
                          }}
                          disabled={updating}
                          className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors disabled:cursor-not-allowed"
                        >
                          −
                        </button>
                        <span className="w-12 h-10 flex items-center justify-center text-base font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCart(item.product._id, item.quantity + 1)}
                          disabled={updating}
                          className="w-10 h-10 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-200 transition-colors disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 text-right">
                      <span className="md:hidden text-gray-400 text-base mr-2">Total:</span>
                      <span className="text-lg font-semibold text-gray-900">${itemTotal}</span>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => handleRemove(item.product._id)}
                        disabled={updating}
                        className="w-10 h-10 flex items-center justify-center text-gray-600 bg-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                        title="Remove item"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-teal-50 rounded-2xl p-8 sticky top-24">
              <div className="border-b-2 border-gray-900 pb-4 mb-6">
                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">Cart Total</h2>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 uppercase tracking-wider">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">${total}</span>
                </div>
                <p className="text-xs text-gray-400">Shipping & taxes calculated at checkout</p>
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold uppercase tracking-widest rounded-full shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Cart