import { useAtom } from "jotai";
import {
    filterFieldAtom,
    filterStarshipListAtom,
    filterValueAtom,
    StarshipListAtom,
} from "../atoms";
import { useEffect, useState } from "react";

export default function useCustomshipList() {
    const [filterField, setFilterField] = useAtom(filterFieldAtom);
    const [filterValue, setFilterValue] = useAtom(filterValueAtom);
    const [filteredList] = useAtom(filterStarshipListAtom);
    const [options, setOptions] = useState([]);
    const handleTagChange = (e) => {
        const { value } = e.target;
        setFilterField(value);
        setOptions(select_tab[value] || []);
    };
    const handleFilterInput = (e) => {
        const { value } = e.target;
        setFilterValue(value);
    };
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

    const fields = [
        "model",
        "manufacturer",
        "mglt",
        "starship_class",
    ];

    const select_tab = {
        model: models,
        manufacturer: manufacturers,
        mglt: mglt,
        starship_class: starship_classes,
    };

    useEffect(() => {
        setFilterValue(null);
        setFilterField(null);
    }, []);

    return {
        FetchedData: filteredList,
        handleFilterInput,
        handleTagChange,
        fields,
        options,
    };
}
