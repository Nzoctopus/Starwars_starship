import { useState } from "react";
import useAuthViewModel from "./model/useAuthViewModel";
import useCustomshipViewModel from "./model/useCustomshipViewModel";
import useSatelliteViewModel from "./model/useSatelliteViewModel";

export default function useGlobalDataProvider() {
    const { fetchAllSatellite } = useSatelliteViewModel();
    const { fetchAllCustomship } = useCustomshipViewModel();
    const { getUser, isLoggedIn } = useAuthViewModel();

    const [Shared, setShared] = useState({
        starships: [],
        satellites: [],
        user: {},
        isLogged:{}
    });

    const fetchdata = () => {
        console.log("someone wanted to fetchdata")
        fetchAllSatellite()
            .then((result) => {
                setShared((prev) => ({
                    ...prev,
                    satellites: result,
                }));
            })
            .catch((error) => {
                console.error("error while fetching Satellite", error);
            });
        fetchAllCustomship()
            .then((result) => {
                setShared((prev) => ({
                    ...prev,
                    starships: result,
                }));
            })
            .catch((error) => {
                console.error("error while fetching customship", error);
            });
        isLoggedIn().then((result) => {
            setShared((prev) => ({
                ...prev,
                isLogged: result.isLoggedIn,
            }));
            if (result.isLoggedIn) {
                getUser()
                    .then((FetchedUser) => {
                        setShared((prev) => ({
                            ...prev,
                            user: FetchedUser,
                        }));
                        console.log("user fetched goood");
                    })
                    .catch((error) => {
                        console.error("error while fetching user", error);
                    });
            }
        });
    };
    return { fetchdata, Shared, setShared };
}
