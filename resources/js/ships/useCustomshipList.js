import { useAtom } from "jotai";
import {
    filterFieldAtom,
    filterStarshipListAtom,
    filterValueAtom,
    StarshipListAtom,
} from "../atoms";
import { useEffect } from "react";

export default function useCustomshipList() {
    const [StarshipList] = useAtom(StarshipListAtom);
    const [filterField, setFilterField] = useAtom(filterFieldAtom);
    const [filterValue, setFilterValue] = useAtom(filterValueAtom);
    const [filteredList] = useAtom(filterStarshipListAtom);
    const handleTagChange = (e) => {
        const { value } = e.target;
        setFilterField(value);
    };
    const handleFilterInput = (e) => {
        const { value } = e.target;
        setFilterValue(value);
    };

    const fields = [
        "name",
        "model",
        "manufacturer",
        "cost",
        "length",
        "max_atmo_speed",
        "crew",
        "passengers",
        "cargo_capacity",
        "consumables",
        "hyperdrive_rating",
        "mglt",
        "starship_class",
    ];

    useEffect(() => {
        setFilterValue(null);
        setFilterField(null);
    }, []);

    return {
        FetchedData: filterField && filterValue ? filteredList : StarshipList,
        handleFilterInput,
        handleTagChange,
        fields,
    };
}
