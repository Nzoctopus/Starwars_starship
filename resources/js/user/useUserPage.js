import { useEffect, useState } from "react";
import useAuthViewModel from "../model/useAuthViewModel";
import useUserViewModel from "../model/useUserViewModel";
import { useNavigate } from "react-router-dom";

export default function useUserPage() {
    const { getUser, isLoggedIn } = useAuthViewModel();
    const { fetchCreatedSatellitesFromUser, fetchCreatedStarshipsFromUser } =
        useUserViewModel();
    const [User, setUser] = useState([]);
    const [CreatedStarships, setCreatedStarships] = useState([]);
    const [CreatedSatellites, setCreatedSatellites] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn()
            .then((result) => {
                console.log("result", result);
                if (result.isLoggedIn) {
                    console.log("connected");
                    getUser()
                        .then((result) => {
                            setUser(result);
                            fetchCreatedSatellitesFromUser(result.id)
                                .then((result) => {
                                    console.log("fetched created sat", result);
                                    setCreatedSatellites(result);
                                })
                                .catch((error) => {
                                    console.error("fetch error", error);
                                });
                            fetchCreatedStarshipsFromUser(result.id)
                                .then((result) => {
                                    console.log("fetched created sat", result);
                                    setCreatedStarships(result);
                                })
                                .catch((error) => {
                                    console.error("fetch error", error);
                                });
                        })
                        .catch((error) => {
                            console.error("user fetch error", error);
                        });
                } else {
                    console.log("not connected");
                    navigate("/starships/register");
                }
            })
            .catch((error) => {
                console.error("error", error);
            });
    }, []);
    return { User, CreatedSatellites, CreatedStarships };
}
