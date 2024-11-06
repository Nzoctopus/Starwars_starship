import { useEffect } from "react";
import { MyContext } from "./MyContext";
import useGlobalDataProvider from "./useGlobalDataProvider";

export default function GlobalDataProvider({ children }) {
    const { fetchdata, Shared, setShared } = useGlobalDataProvider();
    useEffect(() => {
        fetchdata();
    }, []);
    return (
        <MyContext.Provider value={{ Shared, setShared }}>
            {children}
        </MyContext.Provider>
    );
}
