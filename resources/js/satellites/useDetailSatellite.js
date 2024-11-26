import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSatelliteViewModel from "../model/useSatelliteViewModel";
import { useAtom } from "jotai";
import { SatelliteListAtom, UserDataAtom } from "../atoms";
import useConnection from "../useConnetion";

export default function useDetailSatellite() {
    const { createSatellite, updateSatellite, deleteSatellite } =
        useSatelliteViewModel();
    const [User] = useAtom(UserDataAtom);
    const [SatelliteList] = useAtom(SatelliteListAtom);
    const { loadSatellites } = useConnection();
    const params = useParams();
    const [FetchError, setFetchError] = useState(false);
    const isCreating = params.id == "create";
    const Title = isCreating ? "ADD SATELLITE" : "MODIFY SATELLITE";
    const navigate = useNavigate();
    let preset_obj = {};

    const preset = [
        { model: "Death_Star", speed: 5, size: 50 },
        { model: "Executor_Station", speed: 9, size: 45 },
        { model: "Starkiller_Base", speed: 4, size: 50 },
        { model: "Tantive_IV_Satellite", speed: 8, size: 30 },
        { model: "Yavin_Sentinel", speed: 6, size: 25 },
        { model: "Endor_Station", speed: 2, size: 20 },
        { model: "Coruscant_Observer", speed: 3, size: 25 },
        { model: "Kessel_Miner", speed: 1, size: 22 },
        { model: "Mustafar_Probe", speed: 7, size: 20 },
        { model: "Alderaan_Scanner", speed: 2, size: 23 },
    ];
    
    const model = [
        "Death_Star",
        "Executor_Station",
        "Starkiller_Base",
        "Tantive_IV_Satellite",
        "Yavin_Sentinel",
        "Endor_Station",
        "Coruscant_Observer",
        "Kessel_Miner",
        "Mustafar_Probe",
        "Alderaan_Scanner",
    ];

    const classes = [
        "Battle_Station",
        "Spy_Network",
        "Mining_Satellite",
        "Communication_Hub",
        "Astrocartographic_Scanner",
        "Military_Orbital",
        "Scientific_Researcher",
        "Galactic_Surveillance",
        "Trade_Beacon",
        "Planet_Destroyer",
    ];
    const cost = [
        "500000",
        "750000",
        "900000",
        "1000000",
        "1250000",
        "1500000",
        "2000000",
        "2500000",
        "3000000",
        "4000000",
    ];

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
        posX: "",
        posY: "",
        targetX: "",
        targetY: "",
        size:0,
        speed:0,
        faction:0,
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSatellite({ ...satellite, [name]: value });
        if (name == "model") {
            preset_obj = preset.find(item => item.model == value);
            setSatellite({ ...satellite, ["size"]: preset_obj.size, ["speed"]: preset_obj.speed, ["model"]: preset_obj.model});
        }
        console.log("modif", satellite);
    };

    useEffect(() => {
        if (!isCreating) {
            const target = SatelliteList.find((obj) => obj.id == params.id);
            if (!target) {
                setFetchError(true);
            }
            setSatellite(target);
        }
        setSatellite((prev) => ({
            ...prev,
            file: null,
        }));
        setSatellite((prev) => ({
            ...prev,
            linked_user_id: User.id,
        }));
    }, []);

    const handleSubmit = async (e, data) => {
        e.preventDefault();
        console.log("tried to submit this data", data);
        if (isCreating) {
            createSatellite(data)
                .then(() => {
                    navigate("/starships/list_custom_satellites");
                })
                .catch((error) => {
                    console.log("error", error);
                });
        } else {
            updateSatellite(data)
                .then(() => {
                    navigate("/starships/list_custom_satellites");
                })
                .catch((error) => {
                    console.error("error", error);
                });
        }
        loadSatellites();
    };
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("id = ", id);
        deleteSatellite(id)
            .then(() => {
                navigate("/starships/list_custom_satellites");
            })
            .catch((error) => {
                console.log("error", error);
            });
        loadSatellites();
    };
    return {
        satellite,
        handleChange,
        Title,
        handleSubmit,
        handleDelete,
        FetchError,
        isCreating,
        resetImage,
        handleFileChange,
        model,
        classes,
        cost,
    };
}
