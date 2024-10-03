import { useState } from "react";

export default function useCustomship () {

    const [data, setData] = useState({
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
    });
    
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

    
    return {fields, data, setData, handleChange}
}