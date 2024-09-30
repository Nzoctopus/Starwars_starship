import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function useStarship () {

    
    const [data, setData] = useState([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);    
    const queryValue = queryParams.get('page') || 1;  // Default to 1 if not found
    const [page, setPage] = useState(Number(queryValue));    
    
    const fetchData = async () => {
        const apiUrl = `https://swapi.dev/api/starships/?page=${page}`;
        try {
            const response = await fetch(apiUrl); // Fetch the data
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json(); // Parse JSON data
            setData(jsonData); // Set data to state
        } catch (err) {
            setError(err.message); // Set error message
        } finally {
            setLoading(false); // Set loading to false
        }
    };
    const last_page = Math.ceil(data.count / 10);
    
    return {data, fetchData, loading, error, page, setPage, setLoading, last_page}
}