import { useEffect, useState } from "react";
import useSatelliteViewModel from "../model/useSatelliteViewModel";

export default function useSatelliteList () {
    const {fetchAllSatellite} = useSatelliteViewModel();

    const [FetchedData, setFetchedData] = useState([]);

    useEffect(() => {
      fetchAllSatellite().then(result => {
        setFetchedData(result);
        console.log(result);
        console.log(FetchedData);
      });
    }, []);

    return {FetchedData}
}