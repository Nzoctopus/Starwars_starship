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
    const NumberFields = [
        "cost",
        "length",
        "max_atmo_speed",
        "crew",
        "passengers",
        "cargo_capacity",
        "mglt",
    ];

    const models = [
        "Imperial I-Class Star Destroyer",
        "TIE Fighter",
        "X-Wing (T-65)",
        "Y-Wing (BTL-A4)",
        "A-Wing",
        "Mon Calamari Star Cruiser (MC80)",
        "Lucrehulk-Class Battleship",
        "Providence-Class Dreadnought",
        "Venator-Class Star Destroyer",
        "ARC-170 Starfighter",
    ];
    const manufacturers = [
        "Kuat Drive Yards",
        "Sienar Fleet Systems",
        "Incom Corporation",
        "Corellian Engineering Corporation",
        "Mon Calamari Shipyards",
        "Hoersch-Kessel Drive",
        "Rothana Heavy Engineering",
        "Baktoid Armor Workshop",
        "Slayn & Korpil",
        "FreiTek Inc",
    ];
    const mglt = ["10", "20", "30", "40", "50", "60", "70", "80", "90"];
    const starship_classes = [
        "Star Destroyer",
        "Corvette",
        "Frigate",
        "Fighter",
        "Bomber",
        "Transport",
        "Battleship",
        "Dreadnought",
        "Interceptor",
        "Cruiser",
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
        console.log("changed", ship);
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
        handleSubmit,
        handleDelete,
        FetchError,
        isCreating,
        satellites,
        resetImage,
        handleFileChange,
        models,
        manufacturers,
        starship_classes,
        mglt,
    };
}
