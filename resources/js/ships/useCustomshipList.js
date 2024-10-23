import { useEffect, useState } from "react";
import useCustomshipViewModel from "../model/useCustomshipViewModel";
import useAuthViewModel from "../model/useAuthViewModel";

export default function useCustomshipList() {
    const { fetchAllCustomship } = useCustomshipViewModel();
    const [FetchedData, setFetchedData] = useState([]);
    const [isLogged, setIsLogged] = useState(false);
    const { isLoggedIn } = useAuthViewModel();

    useEffect(() => {
        fetchAllCustomship().then((result) => {
            setFetchedData(result);
            console.log(result);
            console.log(FetchedData);
        });
        isLoggedIn().then((result) => {
            console.log(result);
            setIsLogged(result.isLoggedIn);
        })
    }, []);

    return { FetchedData, isLogged };
}
