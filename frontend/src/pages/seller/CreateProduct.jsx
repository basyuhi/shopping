import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [category, setcategory] = useState("");
    const [image, setimage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    async function createProduct(e) {
        e.preventDefault();
        if (Number(price) < 0) {
            alert("Price cannot be negative");
            return;
        }
        setLoading(true);
        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append('description', description);
        formdata.append('price', price);
        formdata.append('category', category);
        if (image)
            formdata.append('image', image);
        try {
            await api.post("/api/products/create", formdata);
            navigate("/");
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        setimage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-4xl text-center font-bold text-gray-900 mb-2">Create New Product</h1>
                    <p className="text-gray-500 text-center">Fill in the details to list your product</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
                    <form onSubmit={createProduct} className="space-y-6">

                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-1.5">Product Title</label>
                            <input
                                type="text"
                                required
                                onChange={(e) => settitle(e.target.value)}
                                value={title}
                                placeholder="Enter product title"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-1.5">Description</label>
                            <textarea
                                required
                                onChange={(e) => setdescription(e.target.value)}
                                value={description}
                                placeholder="Describe your product"
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-5">
                            <div className="flex-1">
                                <label className="block text-xl font-medium text-gray-700 mb-1.5">Price</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                                    <input
                                        type="number"
                                        required
                                        onChange={(e) => setprice(e.target.value)}
                                        value={price}
                                        placeholder="0.00"
                                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="block text-xl font-medium text-gray-700 mb-1.5">Category</label>
                                <input
                                    type="text"
                                    required
                                    onChange={(e) => setcategory(e.target.value)}
                                    value={category}
                                    placeholder="e.g. Electronics, Clothing"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xl font-medium text-gray-700 mb-1.5">Product Image</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    required
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 transition-all cursor-pointer"
                                />
                            </div>

                            {imagePreview && (
                                <div className="mt-4 rounded-xl overflow-hidden border border-gray-200">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="flex-1 py-3.5 text-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-3.5 text-lg bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-teal-600/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {loading ? "Creating..." : "Create Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct