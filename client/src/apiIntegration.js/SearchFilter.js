import React from "react";
import { useSearch } from "../Context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../CSS/SearchInput.css"

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/catalogue/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="custom-search-form" onSubmit={handleSubmit}>
            <input
                className="custom-search-input"
                type="search"
                placeholder="Search for Products"
                value={values.keyword}
                onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            />
            <button className="custom-search-button" type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchInput;
