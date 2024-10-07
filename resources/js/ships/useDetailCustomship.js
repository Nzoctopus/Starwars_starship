import { useNavigate, useParams } from "react-router-dom";
import useCustomshipViewModel from "../model/useCustomshipViewModel";
import { useEffect, useState } from "react";
import useSatelliteViewModel from "../model/useSatelliteViewModel";

export default function useDetailCustomship () {

    const {fetchSingleCustomship, createCustomship, updateCustomship, deleteCustomship} = useCustomshipViewModel();
    const {fetchAllSatellite} = useSatelliteViewModel()

    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? 'ADD STARSHIP' : 'MODIFY STARSHIP'
    const navigate = useNavigate();
    const [satellites, setSatellites] = useState([]);
    const fields = [
        ['name', 'text'],
        ['model', 'text'],
        ['manufacturer', 'text'],
        ['cost', 'number'],
        ['length', 'number'],
        ['max_atmo_speed', 'number'],
        ['crew', 'number'],
        ['passengers', 'number'],
        ['cargo_capacity', 'number'],
        ['consumables', 'text'],
        ['hyperdrive_rating', 'text'],
        ['mglt', 'number'],
        ['starship_class', 'text']
    ];

    const NumberFields = ['cost', 'length', 'max_atmo_speed', 'crew', 'passengers', 'cargo_capacity', 'mglt'];
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
        linked_satellite_id: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (NumberFields.includes(name))
            setShip({...ship, [name]: Number(value)})
        else
            setShip({ ...ship, [name]: value });
        console.log('ship', ship);
    }
    console.log(params);

    useEffect(() => {
        fetchAllSatellite().then(result => {
            console.log("result", result);
            setSatellites(result);
        }).catch(error => {
            console.error("error", error);
        }
        )
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
        console.log("ship", ship);
    }, []);
    console.log("satellites", satellites);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        if (isCreating) {
            console.log("sending data ...", data);
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
    return {ship, handleChange, Title, fields, handleSubmit, handleDelete, FetchError, isCreating, satellites};
}