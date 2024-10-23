import useTimeModel from "./useTimeModel";

export default function useTimeViewModel() {
    const { getDate, getTime } = useTimeModel();

    return { getDate, getTime };
}
