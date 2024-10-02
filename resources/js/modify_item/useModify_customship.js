import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function useModify_customship () {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);    
    const queryValue = queryParams.get('id');
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    async function fetchData() {
        const result = await fetch(`/api/custom`);
        const body = await result.json();
        setData(body.find(key => key.id == queryValue));
    }

    const fields = [
        'name',
        'model',
        'manufacturer',
        'cost',
        'length',
        'max_atmo_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'hyperdrive_rating',
        'mglt',
        'starship_class',
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
            await axios.post('/modify/customship', data);
        } catch (error) {
            console.error('There was an error!', error);
        }
        fetchData();
        navigate('/starships/list_custom_ship');
    }
    return {fetchData, queryValue, handleChange, handleSubmit, fields, data}
}