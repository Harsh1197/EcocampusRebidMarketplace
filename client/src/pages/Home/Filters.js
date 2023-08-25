import React, { useState } from "react";

function Filters({ filters, setFilters, displayFilters, setDisplayFilters }) {
    const [showCategories, setShowCategories] = useState(true);
    const [showAges, setShowAges] = useState(true);
    const [showPrice, setShowPrice] = useState(true);
    const resetFilters = () => {
        setFilters({
            category: [],
            price: [],
            age: [],
        });
    };
    const productCategories = [
        {
            name: "Electronics",
            value: "Electronics",
        },
        {
            name: "Sports and Fitness",
            value: "Sports",
        },
        {
            name: "Fashion and Accessories",
            value: "Fashion",
        },
        {
            name: "Books and Media",
            value: "TextBooks",
        },
    ];

    const ages = [
        {
            name: "0-2 years old",
            value: "0-2",
        },
        {
            name: "3-5 years old",
            value: "3-5",
        },
        {
            name: "6-8 years old",
            value: "6-8",
        },
        {
            name: "9-12 years old",
            value: "9-12",
        },
    ];

    const prices = [
        {
            name: " £ 100 - 200",
            value: "100-200",
        },
        {
            name: " £ 200 - 300",
            value: "200-300",
        },
        {
            name: "£ 300 - 400",
            value: "300-400",
        },
        {
            name: "£ 400 - 500",
            value: "400-500",
        },
    ];

    return (
        <div className="w-96 p-4 rounded-lg shadow bg-white">
     <div className="flex justify-between items-center text-xl text-white font-bold mb-2 px-4 py-2 rounded-lg" style={{ backgroundColor: "#191e29" }}>
                <h4>Filters</h4>
        
            </div>

            <div className="mt-4" >
                <h3
                    className={`font-semibold mb-2 cursor-pointer flex items-center justify-between ${showCategories ? "text-black" : "text-white"
                  
                }`}
              
               
                    onClick={() => setShowCategories(!showCategories)}
                    style={{
                        backgroundColor: showCategories ? "#191e29" : "transparent",
                        height: showCategories ? "auto" : "60px",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "10px",
                        background: showCategories ? "#ffffff" : "#191e29",
                        color: showCategories ? "#191e29" : "#ffffff",
                    }}
                >
                    Product Categories
                    {showCategories ? (
                        <i className="ri-arrow-up-line text-black mr-2" style={{ fontSize: "24px" }}></i>
                    ) : (
                        <i className="ri-arrow-down-line text-white mr-2" style={{ fontSize: "24px" }}></i>
                    )}
                </h3>

                {showCategories && (
                    <div className="flex flex-col gap-2">
                        {productCategories.map((category) => (
                            <label className="flex items-center gap-2 text-black" key={category.value}>
                                <input
                                    type="checkbox"
                                    name="category"
                                    checked={filters.category.includes(category.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                category: [...filters.category, category.value],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                category: filters.category.filter((item) => item !== category.value),
                                            });
                                        }
                                    }}
                                />
                                <span>{category.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <h3
                    className={`font-semibold mb-2 cursor-pointer bg-gradient-to-r from-black via-black to-black flex items-center justify-between ${showPrice ? "text-black" : "text-white"
                        }`}
                    onClick={() => setShowPrice(!showPrice)}
                    style={{
                        height: showPrice ? "auto" : "60px",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "10px",
                        background: showPrice ? "#ffffff" : "#191e29",
                        color: showPrice ? "#191e29" : "#ffffff",
                    }}
                >
                    Price
                    {showPrice ? (
                        <i className="ri-arrow-up-line text-black mr-2" style={{ fontSize: "24px" }}></i>
                    ) : (
                        <i className="ri-arrow-down-line text-white mr-2" style={{ fontSize: "24px" }}></i>
                    )}
                </h3>

                {showPrice && (
                    <div className="flex flex-col gap-2">
                        {prices.map((price) => (
                            <label className="flex items-center gap-2 text-black" key={price.value}>
                                <input
                                    type="checkbox"
                                    name="price"
                                    checked={filters.price.includes(price.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                price: [...filters.price, price.value],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                price: filters.price.filter((item) => item !== price.value),
                                            });
                                        }
                                    }}
                                />
                                <span>{price.name}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h3
                    className={`font-semibold mb-2 cursor-pointer bg-gradient-to-r from-black via-black to-black flex items-center justify-between ${showAges ? "text-black" : "text-white"
                        }`}
                    onClick={() => setShowAges(!showAges)}
                    style={{
                        height: showAges ? "auto" : "60px",
                        width: "100%",
                        padding: "10px",
                        borderRadius: "10px",
                        background: showAges ? "#ffffff" : "#191e29",
                        color: showAges ? "#191e29" : "#ffffff",
                    }}
                >
                    Product Age
                    {showAges ? (
                        <i className="ri-arrow-up-line text-black mr-2" style={{ fontSize: "24px" }}></i>
                    ) : (
                        <i className="ri-arrow-down-line text-white mr-2" style={{ fontSize: "24px" }}></i>
                    )}
                </h3>

                {showAges && (
                    <div className="flex flex-col gap-2">
                        {ages.map((age) => (
                            <label className="flex items-center gap-2 text-black" key={age.value}>
                                <input
                                    type="checkbox"
                                    name="age"
                                    checked={filters.age.includes(age.value)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setFilters({
                                                ...filters,
                                                age: [...filters.age, age.value],
                                            });
                                        } else {
                                            setFilters({
                                                ...filters,
                                                age: filters.age.filter((item) => item !== age.value),
                                            });
                                        }
                                    }}
                                />
                                <span>{age.name}</span>
                            </label>
                        ))}
                    </div>
                )}

            </div>

            <div className="mt-4">
                <button
                    style={{
                        backgroundColor: "maroon",
                        color: "white",
                        fontWeight: "bold",
                        padding: "12px 24px",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        width: "100%", 
                    }}
                    onClick={resetFilters}
                >
                    Reset Filters
                </button>
            </div>
        </div>
    )
}


export default Filters;
