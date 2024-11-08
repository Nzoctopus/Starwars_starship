import { useAtom } from "jotai";
import { SatelliteListAtom } from "../atoms";

export default function useSatelliteList() {
    const [SatelliteList] = useAtom(SatelliteListAtom);

    return { FetchedData: SatelliteList};
}
