export default function useTimeModel() {
    const getDate = (NonFormattedDate) => {
        const items = NonFormattedDate.split("T");
        const date = items[0].split("-");
        return `${date[2]}/${date[1]}/${date[0]}`;
    };

    const getTime = (NonFormattedTime) => {
        const items = NonFormattedTime.split("T");
        const time = items[1].split(":");
        return `${time[0]} hr ${time[1]} s`;
    };

    return { getDate, getTime };
}
