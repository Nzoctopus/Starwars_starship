import { useState } from "react";

export default function useCustomship () {
    const [data, setData] = useState([]);
    
    async function fetchData() {
      const result = await fetch(`/api/custom`);
      const body = await result.json();
      setData(body);
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

    const [values, setValues] = useState({
        name: '',
        model: '',
        manufacturer: '',
        cost: '',
        length: '',
        max_atmo_speed: '',
        crew: '',
        passengers: '',
        cargo_capacity: '',
        consumables: '',
        hyperdrive_rating: '',
        mglt: '',
        starship_class: '',
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/store/ship', values);
            fetchData();
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(`/delete/customship`, {id: id});
        } catch (error) {
            console.error('There was an error!', error);
        }
        fetchData();
    }
    return {fields, data, fetchData, handleChange, handleSubmit, handleDelete}
}