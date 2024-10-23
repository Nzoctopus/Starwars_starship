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

    const fetchData = async () => {
        try {
            const loginStatus = await isLoggedIn();
            console.log("Login status:", loginStatus);

            if (loginStatus.isLoggedIn) {
                console.log("User is connected");

                const user = await getUser();
                setUser(user);

                // Fetch created satellites and starships simultaneously
                const [satellites, starships] = await Promise.all([
                    fetchCreatedSatellitesFromUser(user.id),
                    fetchCreatedStarshipsFromUser(user.id),
                ]);

                console.log("Fetched created satellites:", satellites);
                console.log("Fetched created starships:", starships);

                setCreatedSatellites(satellites);
                setCreatedStarships(starships);
            } else {
                console.log("User is not connected");
                navigate("/starships/register");
            }
        } catch (error) {
            console.error("Error during fetching process:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [navigate]);
    return { User, CreatedSatellites, CreatedStarships };
}
