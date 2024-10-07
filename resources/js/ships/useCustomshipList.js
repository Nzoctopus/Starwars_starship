import { useEffect, useState } from "react";
import useCustomshipViewModel from "../model/useCustomshipViewModel";

export default function useCustomshipList () {
    const {fetchAllCustomship} = useCustomshipViewModel();
    const [FetchedData, setFetchedData] = useState([]);
    useEffect(() => {
      fetchAllCustomship().then(result => {
        setFetchedData(result);
        console.log(result);
        console.log(FetchedData);
      });
    }, []);

    return {FetchedData}
}