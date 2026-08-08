import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get('/api/products/');
        setproducts(response.data.products);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading products...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {products.map((e) => {
            return (
              <ProductCard
                key={e._id}
                id={e._id}
                image={e.image}
                title={e.title}
                price={e.price}
                category={e.category}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home