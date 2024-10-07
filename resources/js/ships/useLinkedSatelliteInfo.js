import { useEffect, useState } from "react";
import useSatelliteViewModel from "../model/useSatelliteViewModel";

export default function useLinkedSatelliteInfo ({id}) {
    const [satellite, setSatellite] = useState([]);
    const {fetchSingleSatellite} = useSatelliteViewModel();
    const [FetchError, setFetchError] = useState(false);

    useEffect(() => {
        fetchSingleSatellite(id).then(result => {
            console.log("linked satellite", result);
            setSatellite(result);
            if (result.error) {
                console.log("oopsie");
                setFetchError(true);
            }
        })
    }, []);
    return {satellite, FetchError}
}