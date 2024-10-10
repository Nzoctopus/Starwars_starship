import useSatelliteModel from "./useSatelliteModel";

export default function useSatelliteViewModel() {
    const {
        fetchAllSatellite,
        fetchSingleSatellite,
        deleteSatellite,
        updateSatellite,
        createSatellite,
    } = useSatelliteModel();

    return {
        fetchAllSatellite,
        fetchSingleSatellite,
        deleteSatellite,
        updateSatellite,
        createSatellite,
    };
}
