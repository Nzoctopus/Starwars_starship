export default function useUserModel() {
    const fetchCreatedStarshipsFromUser = async (id) => {
        const result = await fetch(`/users/created_ship/${id}`);
        return await result.json();
    };

    const fetchCreatedSatellitesFromUser = async (id) => {
        const result = await fetch(`/users/created_satellite/${id}`);
        return await result.json();
    };

    return { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser };
}
