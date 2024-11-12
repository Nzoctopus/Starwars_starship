import { atom } from "jotai";

export const UserDataAtom = atom(null);
export const isLoggedAtom = atom(null);
export const SatelliteListAtom = atom(null);
export const StarshipListAtom = atom(null);
export const filterValueAtom = atom(null);
export const filterFieldAtom = atom(null);
export const filterStarshipListAtom = atom((get) => {
    const starshipList = get(StarshipListAtom);
    const filterField = get(filterFieldAtom);
    const filterValue = get(filterValueAtom);

    return !starshipList || !filterField || !filterValue
        ? []
        : starshipList.filter(
              (obj) =>
                  obj[filterField] &&
                  String(obj[filterField]).includes(filterValue)
          );
});
export const filterSatelliteListAtom = atom((get) => {
    const satellites = get(SatelliteListAtom);
    const filterField = get(filterFieldAtom);
    const filterValue = get(filterValueAtom);

    return !satellites || !filterField || !filterValue
        ? []
        : satellites.filter(
              (obj) =>
                  obj[filterField] &&
                  String(obj[filterField]).includes(filterValue)
          );
});
