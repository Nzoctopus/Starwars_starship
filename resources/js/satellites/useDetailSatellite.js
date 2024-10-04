import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSatelliteViewModel from "../model/useSatelliteViewModel";

export default function useDetailSatellite () {

    const {fetchSingleSatellite, createSatellite, updateSatellite, deleteSatellite} = useSatelliteViewModel();

    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? 'ADD SATELLITE' : 'MODIFY SATELLITE'
    const navigate = useNavigate();

    const fields = [
        'name',
        'model',
        'cost',
        'capacity',
        'class',
    ];

    const [satellite, setSatellite] = useState({
        name: '',
        model: '',
        cost: '',
        capacity: '',
        class: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSatellite({ ...satellite, [name]: value });
    }
    console.log(params);

    useEffect(() => {
        if (!isCreating) {
            console.log("modifying");
            fetchSingleSatellite(params.id).then(result => {
                console.log("result", result);
                setSatellite(result);
            setFetchError(result.error ? true : false);
            }).catch(error => {
                console.error("error", error);
            })
        }
        console.log(satellite);
    }, []);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        if (isCreating) {
            createSatellite(data).then(() => {
                console.log("Created successfully");
                navigate('/starships/list_custom_satellites');
            }).catch(error => {
                console.log("error", error);
            })
        } else {
            updateSatellite(data).then(() => {
                console.log("satellite Updated Successfully");
                navigate('/starships/list_custom_satellites');
            }).catch(error => {
                console.error("error", error);
            })
        }
    }
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("id = ", id);
        console.log("cliked");
        deleteSatellite(id).then(() => {
            console.log("Deleted successfully");
            navigate('/starships/list_custom_satellites');
        }).catch(error => {
            console.log("error", error);
        })
    }
    return {satellite, handleChange, Title, fields, handleSubmit, handleDelete, FetchError, isCreating};
}