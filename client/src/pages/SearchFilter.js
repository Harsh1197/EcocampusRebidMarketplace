import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSearch } from "../Context/Search";

const Search = () => {
    const navigate = useNavigate();
    const [values, setValues] = useSearch();

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="container">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Search Results</h1>
                <h6 className={`mb-4 ${values?.results.length === 1 ? "text-2xl" : "text-lg"}`}>
                    {values?.results.length === 1
                        ? `Found 1 Product`
                        : values?.results.length >= 1
                            ? `Found ${values?.results.length} Products`
                            : "No Products Found"
                    }
                </h6>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {values?.results.map((product) => (
                        <div
                            className="border rounded bg-white border-gray-600 border-solid flex flex-col pb-4 hover:shadow-lg darken cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                            key={product._id}
                            onClick={() => handleProductClick(product._id)}
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    className="w-full h-52 object-cover rounded-t"
                                    src={product.productImages[0]}
                                    alt={product.name}
                                />
                            </div>
                            <div className="p-2 mt-2 space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold text-black">{product.name}</h3>
                                    <div className="bg-white-200 py-1 px-2 text-sm rounded">
                                        <span className="text-green-600 font-bold text-2xl">£ {product.price}</span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mt-2 text-sm">{product.productDescription}</p>
                                <div className="flex justify-between">
                                    <button className="bg-custom-color hover:bg-custom-color text-black font-bold py-2 px-4 rounded border border-gray-300">
                                        More Details
                                    </button>
                                    <button className="bg-black hover:bg-black-600 text-white font-bold py-2 px-4 rounded border border-gray-300">
                                        ADD TO CART
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Search;
