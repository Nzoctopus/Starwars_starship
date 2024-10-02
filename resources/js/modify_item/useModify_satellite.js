import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useModify_satellite ()
{
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);    
    const queryValue = queryParams.get('id');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    
    async function fetchData() {
        const result = await fetch(`/api/satellites`);
        const body = await result.json();
        setData(body.find(key => key.id == queryValue));
        console.log(body);
    }
    const fields = [
        'name',
        'model',
        'cost',
        'capacity',
        'class',
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('final data:');
        console.log(data);
        try {
            await axios.post('/modify/satellite', data);
        } catch (error) {
            console.error('There was an error!', error);
        }
        fetchData();
        navigate('/starships/list_custom_satellites');
    }
    return {fetchData, queryValue, handleChange, handleSubmit, fields, data}
}