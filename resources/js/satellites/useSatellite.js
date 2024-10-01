import { useEffect, useState } from "react";

export default function useSatellite () {
    const [data, setData] = useState([]);
    
    async function fetchData() {
      const result = await fetch(`/api/satellites`);
      const body = await result.json();
      setData(body);
    }
    
    const fields = [
        'name',
        'model',
        'cost',
        'capacity',
        'class',
    ];

    const [values, setValues] = useState({
        name: '',
        model: '',
        cost: '',
        capacity: '',
        class: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/store/satellites', values);
            fetchData();
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`/delete/satellite`, {id: id});
        } catch (error) {
            console.error('There was an error!', error);
        }
        fetchData();
    }
    return {fields, data, fetchData, handleChange, handleSubmit, handleDelete}
}