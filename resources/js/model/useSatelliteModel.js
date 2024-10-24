export default function useSatelliteModel() {
    const fetchAllSatellite = async () => {
        const result = await fetch("/api/satellites");
        return await result.json();
    };

    const fetchSingleSatellite = async (id) => {
        const result = await fetch(`/api/satellites/${id}`);
        return await result.json();
    };

    const deleteSatellite = async (id) => {
        console.log("id = ", id);
        console.log("send to ", "/delete/satellite");
        return await axios.post("/delete/satellite", { id: id });
    };

    const updateSatellite = async (data) => {
        console.log("link = ", "/modify/satellite");
        console.log("final data = ", data);
        return await axios.post('/modify/satellite', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    };

    const createSatellite = async (data) => {
        console.log("link = ", "/store/satellite");
        console.log("final data = ", data);
        return await axios.post('/store/satellite', data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
    };

    return {
        fetchAllSatellite,
        fetchSingleSatellite,
        deleteSatellite,
        updateSatellite,
        createSatellite,
    };
}
