import { useState } from "react";

export default function useSatellite () {

    const [data, setData] = useState({
        name: '',
        model: '',
        cost: '',
        capacity: '',
        class: '',
    });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const fields = [
        'name',
        'model',
        'cost',
        'capacity',
        'class',
    ];

    return {fields, data, setData, handleChange}

}