import { useNavigate, useParams } from 'react-router-dom'
import api from '../services/api';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setCart } from '../features/cart/cartslice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setproduct] = useState({})
  const [loading, setloading] = useState(true)
  const [quantity, setquantity] = useState(1);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    async function getProductById() {
      try {
        const response = await api.get(`/api/products/${id}`);
        setproduct(response.data.product)
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false)
      }
    }
    getProductById();
  }, [id])

  async function handleAddToCart() {
    if (!user) {
      navigate('/buyer/login');
      return;
    }
    try {
      const data = {
        productId: id,
        quantity: quantity
      }
      const response = await api.post('/api/cart/add', data);
      dispatch(setCart(response.data.cart));
      navigate('/cart');
    } catch (err) {
      console.log(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading product...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">

          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-8 md:p-12">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto max-h-125 object-contain rounded-2xl"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block w-fit px-3 py-1.5 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg mb-4">
              {product.category}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <p className="text-2xl font-bold text-teal-600 mb-6">
              ${product.price}
            </p>

            <p className="text-lg text-gray-500 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setquantity((prevQuantity) => prevQuantity - 1)
                    }
                  }}
                  className="w-12 h-12 flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <span className="w-12 h-12 flex items-center justify-center text-lg font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    setquantity((prevQuantity) => prevQuantity + 1)
                  }}
                  className="w-12 h-12 flex items-center justify-center text-xl font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 text-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductDetails