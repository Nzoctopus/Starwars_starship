import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";

export default function useCustomshipList() {
    const [FetchedData, setFetchedData] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const { Shared } = useContext(MyContext);
    useEffect(() => {
        setFetchedData(Shared.starships);
        setIsLogged(Shared.isLogged);
    }, [Shared]);

    return { FetchedData, isLogged };
}
