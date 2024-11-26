import { useAtom } from "jotai";
import {
    SatelliteListAtom,
    StarshipListAtom,
    UserDataAtom,
} from "./atoms";
import { useEffect } from "react";
import useConnection from "./useConnetion";

export default function EntitiesLoader({ children }) {
    const [User, setUser] = useAtom(UserDataAtom);
    const [SatelliteList, setSatelliteList] = useAtom(SatelliteListAtom);
    const [StarshipList, setStarshipList] = useAtom(StarshipListAtom);
    const {loadStarships, loadSatellites, loadUser} = useConnection();

    useEffect(() => {
        if (!User)
            loadUser();
        if (!StarshipList)
            loadStarships();
        if (!SatelliteList)
            loadSatellites();
    }, [User, StarshipList, SatelliteList]);

    return (User && SatelliteList && StarshipList) ? (
        <div>{ children }</div>
    ) : (
        <div className="text-white">loading ong</div>
    );
}