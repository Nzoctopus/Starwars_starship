import { useNavigate, useParams } from "react-router-dom";
import useCustomshipViewModel from "../model/useCustomshipViewModel";
import { useEffect, useState } from "react";

export default function useDetailCustomship () {

    const {fetchSingleCustomship, createCustomship, updateCustomship, deleteCustomship} = useCustomshipViewModel();

    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? 'ADD STARSHIP' : 'MODIFY STARSHIP'
    const navigate = useNavigate();

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

    const [ship, setShip] = useState({
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShip({ ...ship, [name]: value });
    }
    console.log(params);

    useEffect(() => {
        if (!isCreating) {
            console.log("modifying");
            fetchSingleCustomship(params.id).then(result => {
                console.log("result", result);
                setShip(result);
            setFetchError(result.error ? true : false);
            }).catch(error => {
                console.error("error", error);
            })
        }
        console.log(ship)
    }, []);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        if (isCreating) {
            createCustomship(data).then(() => {
                console.log("Created successfully");
                navigate('/starships/list_custom_ship');
            }).catch(error => {
                console.log("error", error);
            })
        } else {
            updateCustomship(data).then(() => {
                console.log("shipUpdatedSuccessfully");
                navigate('/starships/list_custom_ship');
            }).catch(error => {
                console.error("error", error);
            })
        }
    }
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("id = ", id);
        console.log("cliked");
        deleteCustomship(id).then(() => {
            console.log("Deleted successfully");
            navigate('/starships/list_custom_ship');
        }).catch(error => {
            console.log("error", error);
        })
    }
    return {ship, handleChange, Title, fields, handleSubmit, handleDelete, FetchError, isCreating};
}