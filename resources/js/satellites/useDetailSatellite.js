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
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSatellite({ ...satellite, [name]: value });
        console.log("change", satellite);
    };

    useEffect(() => {
        if (!isCreating) {
            console.log("modifying");
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
        loadSatellites();
    };
    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log("id = ", id);
        deleteSatellite(id)
            .then(() => {
                console.log("Deleted successfully");
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
