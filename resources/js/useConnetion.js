import { useAtom } from "jotai";
import {
    isLoggedAtom,
    SatelliteListAtom,
    StarshipListAtom,
    UserDataAtom,
} from "./atoms";
import useAuthViewModel from "./model/useAuthViewModel";
import useSatelliteViewModel from "./model/useSatelliteViewModel";
import useCustomshipViewModel from "./model/useCustomshipViewModel";

export default function useConnection() {
    const [isLogged, setIsLogged] = useAtom(isLoggedAtom);
    const [User, setUser] = useAtom(UserDataAtom);
    const [SatelliteList, setSatelliteList] = useAtom(SatelliteListAtom);
    const [StarshipList, setStarshipList] = useAtom(StarshipListAtom);
    const { isLoggedIn, getUser } = useAuthViewModel();
    const { fetchAllSatellite } = useSatelliteViewModel();
    const { fetchAllCustomship } = useCustomshipViewModel();

    const loadAuthStatus = () => {
        isLoggedIn().then((result) => {
            console.log("result du login = ", result);
            setIsLogged(result.isLoggedIn);
        });
    };
    const loadUser = () => {
        getUser()
            .then((FetchedUser) => {
                setUser(FetchedUser);
                console.log("user fetched goood");
            })
            .catch((error) => {
                console.error("error while fetching user", error);
            });
    };

    const loadSatellites = () => {
        fetchAllSatellite()
            .then((result) => {
                console.log("sat list fetched goood");
                setSatelliteList(result);
            })
            .catch((error) => {
                console.error("error while fetching Satellite", error);
            });
    };
    const loadStarships = () => {
        fetchAllCustomship()
            .then((result) => {
                console.log("star list fetched goood");
                setStarshipList(result);
            })
            .catch((error) => {
                console.error("error while fetching customship", error);
            });
    };
    return { loadAuthStatus, loadSatellites, loadStarships, loadUser};
}
