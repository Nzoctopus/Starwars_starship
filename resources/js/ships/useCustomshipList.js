import { useAtom } from "jotai";
import { StarshipListAtom } from "../atoms";

export default function useCustomshipList() {
    const [StarshipList] = useAtom(StarshipListAtom);

    return { FetchedData: StarshipList };
}
