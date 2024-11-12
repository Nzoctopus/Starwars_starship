import { useAtom } from "jotai";
import {
    filterFieldAtom,
    filterSatelliteListAtom,
    filterValueAtom,
    SatelliteListAtom,
} from "../atoms";
import { useEffect } from "react";

export default function useSatelliteList() {
    const [SatelliteList] = useAtom(SatelliteListAtom);
    const [filterField, setFilterField] = useAtom(filterFieldAtom);
    const [filterValue, setFilterValue] = useAtom(filterValueAtom);
    const [filteredList] = useAtom(filterSatelliteListAtom);
    const handleTagChange = (e) => {
        const { value } = e.target;
        setFilterField(value);
    };
    const handleFilterInput = (e) => {
        const { value } = e.target;
        setFilterValue(value);
    };

    useEffect(() => {
        setFilterValue(null);
        setFilterField(null);
    }, []);

    const fields = ["name", "model", "cost", "capacity", "class"];

    return {
        FetchedData: filterField && filterValue ? filteredList : SatelliteList,
        handleFilterInput,
        handleTagChange,
        fields,
    };
}
