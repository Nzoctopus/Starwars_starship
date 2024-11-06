import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

export default function useSatelliteList() {
    const [isLogged, setIsLogged] = useState(false);
    const [FetchedData, setFetchedData] = useState([]);
    const { Shared } = useContext(MyContext);
    useEffect(() => {
        setFetchedData(Shared.satellites);
        setIsLogged(Shared.isLogged);
        console.log("shared this to satlist", Shared);
    }, [Shared]);

    return { FetchedData, isLogged };
}
