import { useEffect, useState } from "react";
import useSatelliteViewModel from "../model/useSatelliteViewModel";
import useAuthViewModel from "../model/useAuthViewModel";

export default function useSatelliteList() {
    const { fetchAllSatellite } = useSatelliteViewModel();
    const [isLogged, setIsLogged] = useState(false);
    const { isLoggedIn } = useAuthViewModel();
    const [FetchedData, setFetchedData] = useState([]);

    useEffect(() => {
        fetchAllSatellite().then((result) => {
            setFetchedData(result);
            console.log(result);
            console.log(FetchedData);
        });
        isLoggedIn().then((result) => {
            setIsLogged(result.isLoggedIn);
            console.log(result);
        });
    }, []);

    return { FetchedData, isLogged };
}
