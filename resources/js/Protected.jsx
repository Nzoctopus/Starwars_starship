import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AuthPage from "./auth/AuthPage";
import { MyContext } from "./MyContext";

export default function Protected() {
    const [Logged, setLogged] = useState(false);
    const { Shared } = useContext(MyContext);
    useEffect(() => {
        setLogged(Shared.isLogged);
    }, [Shared]);

    return Logged ? <Outlet /> : <AuthPage />;
}
