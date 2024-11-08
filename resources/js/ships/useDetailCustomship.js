import { useNavigate, useParams } from "react-router-dom";
import useCustomshipViewModel from "../model/useCustomshipViewModel";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { SatelliteListAtom, StarshipListAtom, UserDataAtom } from "../atoms";
import useConnection from "../useConnetion";

export default function useDetailCustomship() {
    const { createCustomship, updateCustomship, deleteCustomship } =
        useCustomshipViewModel();
    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? "ADD STARSHIP" : "MODIFY STARSHIP";
    const navigate = useNavigate();
    const [satellites] = useAtom(SatelliteListAtom);
    const [User] = useAtom(UserDataAtom);
    const [StarshipList] = useAtom(StarshipListAtom);
    const { loadStarships } = useConnection();
    const fields = [
        ["name", "text"],
        ["model", "text"],
        ["manufacturer", "text"],
        ["cost", "number"],
        ["length", "number"],
        ["max_atmo_speed", "number"],
        ["crew", "number"],
        ["passengers", "number"],
        ["cargo_capacity", "number"],
        ["consumables", "text"],
        ["hyperdrive_rating", "text"],
        ["mglt", "number"],
        ["starship_class", "text"],
    ];

    const NumberFields = [
        "cost",
        "length",
        "max_atmo_speed",
        "crew",
        "passengers",
        "cargo_capacity",
        "mglt",
    ];
    const [ship, setShip] = useState({
        name: "",
        model: "",
        manufacturer: "",
        cost: "",
        length: "",
        max_atmo_speed: "",
        crew: "",
        passengers: "",
        cargo_capacity: "",
        consumables: "",
        hyperdrive_rating: "",
        mglt: "",
        starship_class: "",
        linked_satellite_id: "",
        linked_user_id: "",
        file: null,
    });

    const resetImage = () => {
        setShip((prev) => ({
            ...prev,
            file: null,
        }));
    };

    const handleFileChange = (event) => {
        setShip((prev) => ({
            ...prev,
            file: event.target.files[0],
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (NumberFields.includes(name))
            setShip({ ...ship, [name]: Number(value) });
        else setShip({ ...ship, [name]: value });
    };

    useEffect(() => {
        if (!isCreating) {
            const target = StarshipList.find((obj) => obj.id == params.id);
            if (!target) {
                setFetchError(true);
            } else {
                setFetchError(false);
            }
            setShip(target);
            setShip((prev) => ({
                ...prev,
                file: null,
            }));
        }
        setShip((prev) => ({
            ...prev,
            linked_user_id: User.id,
        }));
    }, []);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        if (isCreating) {
            createCustomship(data)
                .then(() => {
                    console.log("Created successfully");
                    navigate("/starships/list_custom_ship");
                })
                .catch((error) => {
                    console.log("error", error);
                });
        } else {
            updateCustomship(data)
                .then(() => {
                    console.log("ship Updated Successfully");
                    navigate("/starships/list_custom_ship");
                })
                .catch((error) => {
                    console.error("error", error);
                });
        }
        loadStarships();
    };
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("cliked to delete with id", id);
        deleteCustomship(id)
            .then(() => {
                console.log("Deleted successfully");
                navigate("/starships/list_custom_ship");
            })
            .catch((error) => {
                console.log("error", error);
            });
        loadStarships();
    };
    return {
        ship,
        handleChange,
        Title,
        fields,
        handleSubmit,
        handleDelete,
        FetchError,
        isCreating,
        satellites,
        resetImage,
        handleFileChange,
    };
}
