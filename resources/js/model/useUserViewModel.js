import useUserModel from "./useUserModel";

export default function useUserViewModel() {
    const { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser } =
        useUserModel();
    return { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser };
}
