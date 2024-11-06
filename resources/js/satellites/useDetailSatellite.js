import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSatelliteViewModel from "../model/useSatelliteViewModel";
import useAuthViewModel from "../model/useAuthViewModel";
import { MyContext } from "../MyContext";
import useGlobalDataProvider from "../useGlobalDataProvider";

export default function useDetailSatellite() {
    const { createSatellite, updateSatellite, deleteSatellite } =
        useSatelliteViewModel();
    const { Shared } = useContext(MyContext);
    const { fetchdata } = useGlobalDataProvider();

    const { getUser } = useAuthViewModel();
    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? "ADD SATELLITE" : "MODIFY SATELLITE";
    const navigate = useNavigate();
    const fields = ["name", "model", "cost", "capacity", "class"];

    const resetImage = () => {
        setSatellite((prev) => ({
            ...prev,
            file: null,
        }));
    };

    const handleFileChange = (event) => {
        setSatellite((prev) => ({
            ...prev,
            file: event.target.files[0],
        }));
    };

    const [satellite, setSatellite] = useState({
        name: "",
        model: "",
        cost: "",
        capacity: "",
        class: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSatellite({ ...satellite, [name]: value });
    };

    useEffect(() => {
        console.log("Shared is this", Shared)
        if (!isCreating) {
            console.log("modifying");
            const target = Shared.satellites.find((obj) => obj.id == params.id);
            if (!target) {
                setFetchError(true);
            }
            setSatellite(target);
        }
        setSatellite(prev => ({
            ...prev,
            file:null,
        }))
        setSatellite(prev => ({
            ...prev,
            linked_user_id:Shared.user.id,
        }))
    }, [Shared]);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        console.log("tried to submit this data", data);
        if (isCreating) {
            createSatellite(data)
                .then(() => {
                    console.log("Created successfully");
                    navigate("/starships/list_custom_satellites");
                })
                .catch((error) => {
                    console.log("error", error);
                });
        } else {
            updateSatellite(data)
                .then(() => {
                    console.log("satellite Updated Successfully");
                    navigate("/starships/list_custom_satellites");
                })
                .catch((error) => {
                    console.error("error", error);
                });
        }
        fetchdata();
    };
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("id = ", id);
        console.log("cliked");
        deleteSatellite(id)
            .then(() => {
                console.log("Deleted successfully");
                navigate("/starships/list_custom_satellites");
            })
            .catch((error) => {
                console.log("error", error);
            });
    };
    return {
        satellite,
        handleChange,
        Title,
        fields,
        handleSubmit,
        handleDelete,
        FetchError,
        isCreating,
        resetImage,
        handleFileChange,
    };
}
