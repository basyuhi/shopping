import { Link } from "react-router-dom"

const ProductCard = ({ id, image, title, category, price }) => {
    return (
        <Link
            to={`/products/${id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="aspect-4/3 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
                <span className="inline-block px-2.5 py-1 bg-teal-50 text-teal-700 text-sm font-medium rounded-lg mb-2">
                    {category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-teal-600 transition-colors">
                    {title}
                </h3>
                <p className="text-xl font-bold text-gray-900 mt-1">
                    ${price}
                </p>
            </div>
        </Link>
    )
}

export default ProductCard