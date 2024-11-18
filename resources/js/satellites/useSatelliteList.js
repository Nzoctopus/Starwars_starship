import { useAtom } from "jotai";
import {
    filterFieldAtom,
    filterSatelliteListAtom,
    filterValueAtom,
    SatelliteListAtom,
} from "../atoms";
import { useEffect, useState } from "react";

export default function useSatelliteList() {
    const [filterField, setFilterField] = useAtom(filterFieldAtom);
    const [filterValue, setFilterValue] = useAtom(filterValueAtom);
    const [filteredList] = useAtom(filterSatelliteListAtom);
    const [options, setOptions] = useState([]);
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
    const select_tab = {
        model: model,
        class: classes,
        cost: cost,
    };
    const handleTagChange = (e) => {
        const { value } = e.target;
        setFilterField(value);
        setOptions(select_tab[value] || []);
    };
    const handleFilterInput = (e) => {
        const { value } = e.target;
        setFilterValue(value);
    };

    useEffect(() => {
        setFilterValue(null);
        setFilterField(null);
    }, []);

    const fields = ["model", "cost", "class"];

    return {
        FetchedData: filteredList,
        handleFilterInput,
        handleTagChange,
        fields,
        options,
    };
}
